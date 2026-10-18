'use strict';
// node --require ./_mock/preload.js <스크립트>
// MOCK=1 일 때만 목업 경계를 설치한다. 아니면 아무것도 하지 않는다(원본 경로 그대로).
if (process.env.MOCK === '1') {
  require('./env').loadMockEnv();
  const { installEgressGuard, egressState } = require('./egress-guard');
  installEgressGuard();
  require('./s3-stub').installS3Stub();
  require('./routes').installMockRoutes(egressState);
  console.log('[mock] MOCK=1 — egress 가드·S3 스텁·목업 경로 설치');
}
