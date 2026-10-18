'use strict';
// 원본 main.ts:16 의 app.useStaticAssets(public) 호출에 목업 경로를 덧붙인다.
// NestApplication.init() 이 라우터를 붙이기 전이라 Nest 라우트보다 먼저 등록되고, 컨트롤러가 아니라 Swagger 에도 안 나온다.
const path = require('path');
const { ExpressAdapter } = require('@nestjs/platform-express');
const { UPLOADS_DIR } = require('./s3-stub');

function installMockRoutes(egressState) {
  const proto = ExpressAdapter.prototype;
  const original = proto.useStaticAssets;
  let added = false;
  proto.useStaticAssets = function useStaticAssets(...args) {
    const result = original.apply(this, args);
    if (!added) {
      added = true;
      original.call(this, path.join(__dirname, 'assets'), { prefix: '/_mock/assets' });
      original.call(this, UPLOADS_DIR, { prefix: '/_mock/uploads' });
      this.use('/_mock/egress', (req, res) => res.json(egressState));
    }
    return result;
  };
}

module.exports = { installMockRoutes };
