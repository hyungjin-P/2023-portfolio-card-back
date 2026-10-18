# 목업 모드 실행 안내 (`portfolio/mock`)

크래킷 포트폴리오 카드 백엔드(NestJS 10 + TypeORM 0.3 + PostgreSQL)를 **AWS S3·운영 DB·외부 네트워크 없이** 로컬에서 띄우는 목업 층입니다.
원본 소스(`src/`)는 고치지 않았습니다. 목업 코드는 모두 repo 루트 `_mock/`에 있고 `MOCK=1`로 켭니다.
목업은 원본 빌드 산출물 `dist/main.js`를 그대로 실행하고, `node --require ./_mock/preload.js`로 경계 세 곳(S3 업로드·외부 연결·목업 전용 경로)만 바꿉니다.
`MOCK=1`이 없으면 preload는 아무것도 하지 않으며, 원본 빌드 산출물은 목업 층 추가 전과 SHA256이 같습니다.

## 1. 요구 환경

| 항목 | 버전 | 비고 |
|---|---|---|
| Node.js | **18.20.8** (`.nvmrc`) | `Dockerfile:1` `FROM node:18` |
| npm | 10.8.2 | Node 18.20.8에 포함. lockfile v3 |
| PostgreSQL | 17 (17.9에서 확인) | 로컬 서버. 목업 DB를 만들 때 한 번 superuser(`postgres`) 비밀번호가 필요하다 |

```powershell
nvm install 18.20.8; nvm use 18.20.8                       # nvm-windows
# 또는 https://nodejs.org/dist/v18.20.8/ 포터블 zip 을 풀고 PATH 앞에 둔다
$env:Path = 'D:\path\to\node-v18.20.8-win-x64;' + $env:Path
```

## 2. 설치·기동

PowerShell 기준입니다. bash는 주석의 명령을 씁니다.

```powershell
npm ci                                                       # lockfile 그대로 설치

# 설정: 더미 값 예시를 앱이 읽는 위치로 복사한다. 이미 파일이 있으면 덮어쓰지 않는다.
if (-not (Test-Path config\.env.development)) { Copy-Item config\.env.example config\.env.development }
#   bash: cp -n config/.env.example config/.env.development

npm run build                                                # 원본 production 빌드 그대로 → dist/

$env:PGPASSWORD = '<postgres 비밀번호>'                       # bash: export PGPASSWORD=...  (superuser 가 postgres 가 아니면 PGUSER 도)
npm run mock:db        # 목업 전용 role·DB portfolio_card_back_mock 생성 + uuid-ossp 설치 (다시 실행해도 된다)
npm run mock:seed      # 원본 TypeORM synchronize 로 스키마 생성 → 전 테이블 비우고 fixture 입력 (언제든 다시 실행)
npm run mock:start     # = cross-env MOCK=1 NODE_ENV=development node --require ./_mock/preload.js dist/main.js
```

포트 3000이 이미 쓰이고 있으면 `mock:seed`·`mock:start` 전에 `$env:SERVER_PORT = '3100'`(bash: `export SERVER_PORT=3100`)처럼 바꿉니다.
셸 환경변수가 env 파일 값보다 우선합니다(`@nestjs/config` 규칙). seed가 이미지 URL에 포트를 넣으므로 두 명령에 같은 값을 씁니다.

| 주소 | 내용 |
|---|---|
| `http://127.0.0.1:3000/api-docs` | Swagger UI (오퍼레이션 66개) · JSON은 `/api-docs-json` |
| `http://127.0.0.1:3000/` | 원본 안내 페이지(hbs) |
| `http://127.0.0.1:3000/_mock/egress` | 목업이 막은 외부 연결 기록. 정상이면 `{"blocked":[],"allowedLoopback":N}` |
| `http://127.0.0.1:3000/_mock/assets/img/*.svg` | fixture 이미지 |
| `http://127.0.0.1:3000/_mock/uploads/<버킷>/<키>` | 업로드 API로 저장된 파일(`.mock/uploads/`) |

원본은 `0.0.0.0`(IPv4)에만 바인딩합니다(`main.ts:53`). `localhost`가 `::1`로 먼저 풀리는 클라이언트(Node 18 `fetch` 등)는 `127.0.0.1`로 부릅니다.

로그인 없이도 모든 API를 부를 수 있습니다. 원본에 인증 가드가 없고 `authorId`·`portfolioId`를 파라미터로 받기 때문입니다.

| 데모 입력 | 값 |
|---|---|
| `POST /author/loginAuthor` | `{"authorLink":"sample-artist","password":"sample1234"}` (원본이 평문 비교·응답에 비밀번호 포함 — 그대로) |
| 작가 링크 | `sample-artist`(전부 채움) · `moonlit-studio`(대표화면·작품 2블록·학력·전시) · `reserved-link`(가입 전 임시 작가) |
| 고정 id | `sample-artist` 작가 `10000000-0000-4000-8000-000000000001`, 포트폴리오 `20000000-…-000000000001`, 이력 `50000000-…-000000000001`. 규칙은 `_mock/db/fixtures.js` 맨 위 |

## 3. 원본 대비 변경 목록

`git diff e91c76b..portfolio/mock` (`e91c76b` = 원본 `master` HEAD)

| 파일 | 변경 |
|---|---|
| `_mock/**` | **추가** — 목업 층 전부(아래 4절) |
| `package.json` | 스크립트 `mock:db`·`mock:seed`·`mock:start` **추가**(의존성 무변경) |
| `package-lock.json` | **추적 시작** — 원본 로컬 lock(v3, 2023-12-26, 마지막 커밋 이전 → 당시 생성 추정)을 그대로 넣었다. git이 CRLF→LF로만 정규화 |
| `.nvmrc` | **추가** — `18.20.8` |
| `config/.env.example` | **추가** — 더미 값(코드가 읽는 키 11개 + 목업 표지 `MOCK_ENV_EXAMPLE=1`) |
| `config/.env.development`, `config/.env.production`, `src/serviceAccountKey.json`, `crackit-portfolio` | git **추적 해제**(비밀 파일. 원본 히스토리에는 남아 있다) |
| `.gitignore` | 위 비밀 파일 4종(`/config/.env.*` + `!/config/.env.example`)·`/.mock/` 추가, `package-lock.json` 줄 제거 |
| `.dockerignore` | `config/.env.*`·`src/serviceAccountKey.json`·`crackit-portfolio`·`_mock`·`.mock` 추가 — 원본 `Dockerfile`의 `COPY . .`가 더는 env 파일을 이미지에 넣지 않는다 |
| `MOCK.md` | 이 문서 |
| 원본 소스(`src/**`, `views/`, `public/`, 설정 파일) | **변경 없음** |

버전 업그레이드와 의존성 교체는 **없습니다**.

## 4. 목업으로 대체한 기능

| 원본 의존 | 목업 처리 | 위치 |
|---|---|---|
| 설정 `config/.env.development` (실제 값) | 더미 `config/.env.example`의 사본을 원본 경로 그대로 읽는다. 목업 스크립트는 기동 전에 표지(`MOCK_ENV_EXAMPLE=1`)·`NODE_ENV≠production`·DB host loopback·DB 이름 `*_mock`을 확인하고, 아니면 멈춘다 | `env.js` |
| PostgreSQL(운영, fly) | 로컬 PG의 전용 DB `portfolio_card_back_mock` + 전용 role(더미 비밀번호). 스키마는 원본 설정 `synchronize`가 만든다(`DATABASE_SYNCHRONIZE=true` 명시. 원본은 env 문자열을 그대로 넘겨 `'false'`도 참으로 처리된다). PK 기본값 `uuid_generate_v4()`에 필요한 `uuid-ossp`는 `mock:db`가 superuser로 미리 설치 | `db/create.js`, `db/seed.js` |
| AWS S3 (`file.service.ts`가 메서드 안에서 `new AWS.S3()`) | `AWS.S3.prototype.upload`를 교체해 `.mock/uploads/<버킷>/<키>`에 저장. 응답은 실제 S3 형식(`Location: https://<버킷>.s3.<리전>.amazonaws.com/<키>`, `ETag`, `Bucket`, `Key`). 원본의 uuid 키 생성·DB 저장은 그대로 돈다 | `s3-stub.js` |
| 그 밖의 외부 연결 | `net.Socket.prototype.connect`에서 loopback 외 연결을 막고 `.mock/egress.jsonl`·`/_mock/egress`에 기록(DNS 조회 전에 막는다). 서버·`mock:db`·`mock:seed` 모두 적용 | `egress-guard.js` |
| 목업 전용 경로 | 원본 `main.ts:16`의 `useStaticAssets` 호출 때 `/_mock/assets`·`/_mock/uploads`·`/_mock/egress`를 덧붙인다(Nest 컨트롤러가 아니라 Swagger에 나오지 않음) | `routes.js` |
| fly.io·Docker·pm2 배포 | 해당 없음. 로컬 프로세스로 기동 | — |

### fixture

전부 지어낸 가짜 데이터입니다. 이메일은 예약 도메인 `example.com`, 전화는 `010-0000-0000`, 기관명은 "가상…"으로 씁니다.
- 작가 3(정회원 2 + 임시 1), 포트폴리오 2, 대표화면 2(태그 5·테마 2), 작품 2(블록 6·사진 10), 이력 2(기본·연락처 각 2, 학력 2·전시 3·수상 1·기타 2 블록과 하위 항목)
- 시각은 2023-12-01 10:00부터 행마다 1분씩 증가하는 고정값입니다(정렬 결과가 매번 같다)
- 이미지: 도형으로 그린 SVG 14장(`_mock/assets/img/`, `node _mock/assets/gen-images.js`로 다시 그림)

## 5. 원본 경로(플래그 off)

```powershell
npm run build          # 원본 그대로의 nest build → dist/ (목업 층은 tsconfig.build.json 의 include 밖)
npm run start:prod     # = node dist/main — 실제 DB 접속 정보가 필요하다. 운영 자격증명은 폐기됐다
```

## 6. 알려진 제약

- 업로드 API 응답과 DB의 `url`은 원본 코드가 만든 **실제 S3 주소**(`https://REDACTED_S3_BUCKET.s3.ap-northeast-2.amazonaws.com/…`, `file.service.ts:53,120`)입니다. 서버는 그 주소로 연결하지 않지만, 브라우저가 이 URL을 열면 외부로 나갑니다. 파일은 `/_mock/uploads/<버킷>/<키>`로 봅니다.
- 안내 페이지 `GET /`의 HTML은 Bootstrap을 jsDelivr CDN에서 불러옵니다(`views/index.hbs`, 원본 그대로). 서버 요청이 아니라 브라우저 요청이라 목업 범위 밖입니다. Swagger UI(`/api-docs`)는 외부 요청이 없습니다.
- 원본 결함은 고치지 않았습니다. 예: `POST /portfolio-main-visual/saveAndInItem`에 `portfolioMainVisualTags`가 없으면 500(`savedPortfolioMainVisualTags is not iterable`), `GET /portfolio-art-work-block/getBlocksByArtWorkId`는 쿼리 객체 전체를 uuid 자리에 넣어 500.
- 쓰기 API의 결과는 DB에 남습니다. `npm run mock:seed`로 초기 상태로 돌립니다. DB·role을 지우려면 `npm run mock:db -- --drop`.
- 실행 로그의 `AWS SDK for JavaScript (v2) … maintenance mode` NOTE는 aws-sdk가 로드될 때 찍는 경고입니다(원본에서도 같다).
