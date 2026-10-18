'use strict';
// file.service.ts 는 메서드 안에서 new AWS.S3() 를 만들어 DI 로 바꿀 수 없다. 그 인스턴스의 prototype 체인에 있는
// AWS.S3.prototype.upload 를 바꾸면 원본 로직(uuid 키·DB 저장)은 그대로 돌고 저장만 로컬 디스크로 간다.
// 저장 위치: .mock/uploads/<Bucket>/<Key> (GET /_mock/uploads/<Bucket>/<Key> 로 볼 수 있다)
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

const UPLOADS_DIR = path.join(process.cwd(), '.mock', 'uploads');

function store(params, region) {
  const segments = String(params.Key).split('/');
  if (segments.some((s) => s === '..')) throw new Error(`[mock-s3] 허용하지 않는 Key: ${params.Key}`);
  const body = Buffer.isBuffer(params.Body) ? params.Body : Buffer.from(params.Body ?? '');
  const file = path.join(UPLOADS_DIR, params.Bucket, ...segments);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, body);
  console.log(`[mock-s3] upload ${params.Bucket}/${params.Key} (${body.length} B)`);
  // 실제 ManagedUpload 응답과 같은 필드·형식
  return {
    Location: `https://${params.Bucket}.s3.${region}.amazonaws.com/${params.Key}`,
    ETag: `"${crypto.createHash('md5').update(body).digest('hex')}"`,
    Bucket: params.Bucket,
    Key: params.Key,
  };
}

function installS3Stub() {
  AWS.S3.prototype.upload = function upload(params, options, callback) {
    if (typeof options === 'function' && callback === undefined) callback = options;
    const region = this.config.region;
    let pending;
    const uploader = {
      promise: () => (pending ??= Promise.resolve().then(() => store(params, region))),
      send(cb) {
        uploader.promise().then((data) => cb(null, data), (err) => cb(err));
      },
      on: () => uploader,
      abort() {},
    };
    if (typeof callback === 'function') uploader.send(callback);
    return uploader;
  };
}

module.exports = { installS3Stub, UPLOADS_DIR };
