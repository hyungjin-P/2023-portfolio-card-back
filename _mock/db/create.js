'use strict';
// npm run mock:db [-- --drop]
// superuser(PGUSER, 기본 postgres + PGPASSWORD)로 목업 전용 role·DB 를 만들고 그 DB 에 uuid-ossp 를 설치한다.
// 앱은 이 role(config/.env.development 의 더미 비밀번호)로 접속한다. 이미 있으면 그대로 두고 비밀번호만 맞춘다.
const { Client } = require('pg');
const { loadMockEnv } = require('../env');

async function withAdmin(env, database, fn) {
  const client = new Client({
    host: env.DATABASE_HOST,
    port: Number(env.DATABASE_PORT),
    user: process.env.PGUSER || 'postgres',
    database,
  });
  await client.connect();
  try {
    return await fn(client);
  } finally {
    await client.end();
  }
}

async function main() {
  const env = loadMockEnv();
  if (!process.env.PGPASSWORD) throw new Error('PGPASSWORD(superuser 비밀번호)를 환경변수로 준다(MOCK.md 2절).');
  const dbName = env.DATABASE_SCHEMA;
  const roleName = env.DATABASE_USERNAME;

  if (process.argv.includes('--drop')) {
    await withAdmin(env, 'postgres', async (c) => {
      await c.query(`DROP DATABASE IF EXISTS ${c.escapeIdentifier(dbName)} WITH (FORCE)`);
      await c.query(`DROP ROLE IF EXISTS ${c.escapeIdentifier(roleName)}`);
    });
    console.log(`[mock:db] 삭제: database ${dbName}, role ${roleName}`);
    return;
  }

  await withAdmin(env, 'postgres', async (c) => {
    const role = c.escapeIdentifier(roleName);
    const password = c.escapeLiteral(env.DATABASE_PASSWORD);
    const hasRole = (await c.query('SELECT 1 FROM pg_roles WHERE rolname = $1', [roleName])).rowCount > 0;
    await c.query(hasRole ? `ALTER ROLE ${role} LOGIN PASSWORD ${password}` : `CREATE ROLE ${role} LOGIN PASSWORD ${password}`);
    const hasDb = (await c.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName])).rowCount > 0;
    if (!hasDb) await c.query(`CREATE DATABASE ${c.escapeIdentifier(dbName)} OWNER ${role} ENCODING 'UTF8'`);
    console.log(`[mock:db] role ${roleName}: ${hasRole ? '있음(비밀번호 갱신)' : '생성'} / database ${dbName}: ${hasDb ? '있음' : '생성'}`);
  });

  await withAdmin(env, dbName, async (c) => {
    await c.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    const { rows } = await c.query(
      `SELECT current_database() AS db, pg_get_userbyid(d.datdba) AS owner, pg_encoding_to_char(d.encoding) AS encoding,
              (SELECT extversion FROM pg_extension WHERE extname = 'uuid-ossp') AS uuid_ossp
         FROM pg_database d WHERE d.datname = current_database()`,
    );
    console.log('[mock:db] 확인', rows[0]);
  });
}

main().catch((err) => {
  console.error(`[mock:db] 실패: ${err.message}`);
  process.exit(1);
});
