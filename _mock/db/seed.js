'use strict';
// npm run mock:seed
// 원본 빌드(dist)의 AppModule 을 그대로 띄워 원본 TypeORM 설정(synchronize)으로 스키마를 만들고,
// 앱이 등록한 전 엔티티 테이블을 비운 뒤 fixture 를 넣는다. 몇 번이고 다시 실행할 수 있다.
const fs = require('fs');
const path = require('path');
const { loadMockEnv } = require('../env');
const { buildFixtures } = require('./fixtures');

async function main() {
  const env = loadMockEnv();
  const appModuleFile = path.join(process.cwd(), 'dist', 'app.module.js');
  if (!fs.existsSync(appModuleFile)) throw new Error('dist/app.module.js 가 없다. 먼저 npm run build');

  const { NestFactory } = require('@nestjs/core');
  const { DataSource } = require('typeorm');
  const { AppModule } = require(appModuleFile);

  const app = await NestFactory.createApplicationContext(AppModule, { logger: ['error', 'warn'] });
  try {
    const ds = app.get(DataSource);
    const tables = ds.entityMetadatas.map((m) => m.tableName).sort();
    await ds.query(`TRUNCATE TABLE ${tables.map((t) => ds.driver.escape(t)).join(', ')} CASCADE`);
    console.log(`[mock:seed] TRUNCATE ${tables.length}개 테이블: ${tables.join(', ')}`);

    const assetBase = `http://localhost:${env.SERVER_PORT || 3000}/_mock/assets/img`;
    for (const [table, rows] of buildFixtures(assetBase)) {
      await ds.createQueryBuilder().insert().into(table).values(rows).execute();
      console.log(`[mock:seed] ${table}: ${rows.length}`);
    }
    // 원본 로거는 문자열 logging 값에서 꺼져 있어 synchronize 결과가 안 보인다 → 엔티티와 DB 의 남은 차이를 직접 센다
    const { upQueries } = await ds.driver.createSchemaBuilder().log();
    console.log(`[mock:seed] 스키마 차이(synchronize 가 더 실행할 쿼리): ${upQueries.length}`);
  } finally {
    await app.close();
  }
}

main().catch((err) => {
  console.error(`[mock:seed] 실패: ${err.stack || err.message}`);
  process.exit(1);
});
