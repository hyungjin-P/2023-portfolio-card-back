'use strict';
// loopback 밖으로 나가는 TCP 연결을 연결 전에 끊고 기록한다(.mock/egress.jsonl, GET /_mock/egress).
// http·https·tls·pg 모두 net.Socket.prototype.connect 를 거친다. 호스트 이름은 이 단계에서 아직 DNS 조회 전이라,
// 막으면 조회 요청도 나가지 않는다.
const fs = require('fs');
const net = require('net');
const path = require('path');

const LOG_FILE = path.join(process.cwd(), '.mock', 'egress.jsonl');
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1', '::ffff:127.0.0.1']);

const egressState = { blocked: [], allowedLoopback: 0 };

function targetOf(args) {
  // net.connect 는 정규화한 [options, cb] 배열을 첫 인자로 넘긴다
  const first = Array.isArray(args[0]) ? args[0][0] : args[0];
  if (first && typeof first === 'object') {
    if (first.path) return {}; // IPC(named pipe)
    return { host: first.host || 'localhost', port: first.port };
  }
  if (typeof first === 'number' || (typeof first === 'string' && /^\d+$/.test(first))) {
    return { host: typeof args[1] === 'string' ? args[1] : 'localhost', port: first };
  }
  return {}; // IPC 경로 문자열
}

function installEgressGuard() {
  const proto = net.Socket.prototype;
  const original = proto.connect;
  proto.connect = function connect(...args) {
    const { host, port } = targetOf(args);
    if (host === undefined) return original.apply(this, args);
    if (LOCAL_HOSTS.has(host)) {
      egressState.allowedLoopback++;
      return original.apply(this, args);
    }
    const entry = { at: new Date().toISOString(), pid: process.pid, target: `${host}:${port}` };
    egressState.blocked.push(entry);
    fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
    fs.appendFileSync(LOG_FILE, `${JSON.stringify(entry)}\n`);
    console.warn(`[mock-egress] 외부 연결 차단: ${entry.target}`);
    const err = Object.assign(new Error(`[mock] 외부 연결 차단: ${entry.target}`), { code: 'EMOCKEGRESS' });
    process.nextTick(() => this.destroy(err));
    return this;
  };
}

module.exports = { installEgressGuard, egressState, LOG_FILE };
