'use strict';
// 목업 기동 전 점검. 앱(app.module.ts:33-36)과 같은 규칙으로 env 파일을 고르고, 같은 dotenv 로 읽는다.
// 값은 출력하지 않는다.
const fs = require('fs');
const path = require('path');
const dotenv = require(require.resolve('dotenv', { paths: [require.resolve('@nestjs/config')] }));

const LOOPBACK = new Set(['localhost', '127.0.0.1', '::1']);

function fail(message) {
  console.error(`[mock] ${message}`);
  process.exit(1);
}

function loadMockEnv() {
  if (process.env.NODE_ENV === 'production') {
    fail('NODE_ENV=production 이면 앱이 config/.env.production 을 읽는다. 목업은 development 로만 띄운다.');
  }
  const file = path.join(process.cwd(), 'config', '.env.development');
  if (!fs.existsSync(file)) {
    fail('config/.env.development 가 없다. config/.env.example 을 복사한다(MOCK.md 2절).');
  }
  const fromFile = dotenv.parse(fs.readFileSync(file));
  if (fromFile.MOCK_ENV_EXAMPLE !== '1') {
    fail('config/.env.development 가 config/.env.example 사본이 아니다(MOCK_ENV_EXAMPLE=1 없음). 실제 값 파일일 수 있어 멈춘다.');
  }
  // @nestjs/config 와 같이 셸 환경변수가 파일보다 우선한다
  const env = { ...fromFile, ...process.env };
  if (!LOOPBACK.has(env.DATABASE_HOST)) fail('DATABASE_HOST 가 loopback 이 아니다.');
  if (!/^[a-z_][a-z0-9_]*_mock$/.test(env.DATABASE_SCHEMA || '') || !/^[a-z_][a-z0-9_]*$/.test(env.DATABASE_USERNAME || '')) {
    fail('DATABASE_SCHEMA 는 _mock 으로 끝나는 소문자 이름, DATABASE_USERNAME 은 소문자 이름이어야 한다.');
  }
  return env;
}

module.exports = { loadMockEnv };
