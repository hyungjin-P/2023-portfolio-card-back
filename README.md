# 포트폴리오 카드 — 백엔드 (NestJS 10)

포트폴리오 공유 서비스의 API 서버다. 작가가 대표화면·작품·이력을 입력하면 URL 하나로 카드형 포트폴리오를 공유할 수 있고, 이 서버는 작가 계정, 대표화면, 작품(블록·사진), 작가 이력(기본정보·연락처·학력·전시·수상·기타), 이미지 업로드(S3)를 맡는다.

| 항목 | 내용 |
|---|---|
| 구분 | flexible 회사 프로젝트 |
| 역할 | 백엔드 개발. 2023-08부터 이어받아 확장했다 — MySQL → PostgreSQL·AWS → fly.io 전환(`fa4d822`), 작가 이력 도메인 재설계, 계층 단위 소프트 삭제 API, 저장 후 재조회 응답 (코드) |
| 기간 | 2023-01 – 2023-12 (이 저장소 커밋 기간). 내 계정 커밋은 2023-08-11 – 2023-12-27 |
| 커밋 | 66커밋 중 내 계정 9 — 커밋자 기준 (코드). 당시(2023)에는 작업물을 압축해 주고받고 커밋은 한 사람이 맡는 경우가 많아, 내가 만든 기반이 동료 계정으로 커밋되기도 했다. 커밋 수는 작성 비중을 그대로 나타내지 않는다 (진술) |
| 현재 코드 | `src/**/*.ts` 생존 라인 중 내 계정 비중 50.8 – 54.5% (blame 3방식, HEAD 기준, 커밋자 기준 근사치) (코드) |
| 스택 | NestJS 10 · TypeORM 0.3 · PostgreSQL · Swagger(OpenAPI 3) · AWS SDK v2(S3) · TypeScript 5 · Docker · fly.io · pm2 |
| 규모 | 손코드 `src/**/*.ts` 89파일 / 3,879줄 (HEAD), 엔드포인트 66개 (JSON API 65 + 안내 페이지 1), 엔티티 25, 도메인 모듈 17 (앱에 등록된 것 16) |
| 구성 | 작가(`author`) · 포트폴리오 · 대표화면(+테마·태그) · 작품(+블록·사진) · 작가 이력(기본·연락처·학력·전시·수상·기타) · 파일 업로드 |
| 클라이언트 | 짝 저장소 `hyungjin-P/2023-portfolio-card-front` (예정) |

- **초기 구현(2023-01 – 03)** 은 전임 계정으로 커밋됐다 (코드). 위 커밋 수 설명의 사정(진술)과 함께 읽는다.
- 이어받은 뒤 `user` 모듈을 `author`로 바꾸고(`fa4d822`), 이력 영역을 `*-year` 스캐폴드에서 `*-subtitle`/`*-subtitle-value` 3계층으로 다시 만들었다 (코드).

## 기능

엔드포인트 66개. 인증 가드가 없고 `authorId`·`portfolioId`를 파라미터로 받는다(알려진 한계 참고).

| 영역 | 경로 | 하는 일 |
|---|---|---|
| 작가 | `/author/*` (10) | 임시 주소 선점 → 가입 → 로그인, 중복 확인, 조회·수정·삭제 |
| 포트폴리오 | `/portfolio/*` (2) | 작가당 포트폴리오 생성(없으면 만든다) |
| 대표화면 | `/portfolio-main-visual/*` (4) · `-theme` (5) · `-tag` (2) | 커버·제목·태그·테마 저장 |
| 작품 | `/portfolio-art-work/*` (2) · `-block` (5) · `-picture` (3) | 작품 블록·사진 정렬·삭제 |
| 작가 이력 | `/portfolio-history/*` (2) · `-general` (4) · `-contact` (3) | 이력 진입(있으면 반환·없으면 생성), 기본정보·연락처 |
| 이력 4영역 | `/portfolio-history-{education,exhibition,award,etc}/*` (6·5·5·5) | 제목 → 연도 → 내용 3계층 일괄 조회·저장·계층 단위 소프트 삭제 |
| 파일 | `/file/*` (2) | 이미지 업로드(S3) + `file` 행 저장 |

## 구조

```
src/
├─ main.ts · app.module.ts          # 부트스트랩(정적 파일·hbs·CORS·Swagger), 모듈 조립, env 파일 선택
├─ configs/type-orm-config.service.ts   # TypeORM 옵션(postgres, snake_case)
├─ enums/
└─ repositories/                    # 도메인 모듈 (module · controller · service · entity · dto)
   ├─ common/ · author/ · portfolio/ · file/
   ├─ portfolio-main-visual/ (+ -theme, -tag)
   ├─ portfolio-art-work/ (+ -block, -picture)
   └─ portfolio-history/ (+ -general, -contact, -education, -exhibition, -award, -etc, -sns)
ddl/ · 클래스 다이어그램 UML Data.txt   # 구버전 설계 문서 (현재 코드의 정답은 엔티티)
Dockerfile · fly.toml · ecosystem.config.js   # 배포 설정
_mock/                              # 2026년 추가: 외부 의존성 없이 실행하는 목업 층
```

## 실행 (목업 모드)

운영 DB·AWS S3·외부 네트워크 없이 로컬에서 실행한다. 원본 소스(`src/`)는 그대로 두고 `MOCK=1` 일 때만 켜지는 `_mock/` 층이 S3 업로드·외부 연결·목업 경로 세 곳만 바꾼다. 자세한 내용은 [MOCK.md](MOCK.md)에 있다.

```bash
# Node 18.20.8 (.nvmrc), 로컬 PostgreSQL 17
npm ci
cp -n config/.env.example config/.env.development
npm run build
npm run mock:db      # 전용 role·DB(portfolio_card_back_mock) 생성
npm run mock:seed    # 스키마 생성 + 가짜 데이터 입력
npm run mock:start   # http://127.0.0.1:3000/api-docs
```

- 시드 계정 `sample-artist` / `sample1234` (원본이 평문 비교라 로그인 API가 그대로 받는다)
- MOCK.md 가 말하는 `portfolio/mock` 브랜치는 이 공개본의 `main` 이다.

## 알려진 한계 (원본 그대로 두었다)

- **인증·권한·입력 검증이 없다.** 전 엔드포인트에 가드가 없고 비밀번호를 평문으로 저장·비교하며 로그인 응답에 그대로 담는다. 전임 코드에서 이어받아 유지했다 (코드).
- **이력 저장이 `delay(200)` 뒤 재조회로 응답한다.** 비동기 쓰기를 기다리지 않고 200ms 뒤 다시 읽으므로 그 안에 쓰기가 끝나지 않으면 옛 데이터가 돌아온다. 내가 도입한 방식이다 (코드).

## 히스토리

| 커밋 | 내용 |
|---|---|
| `8491c2d` Project init (2023-01-25) | 원본 첫 커밋 — 전임 계정 |
| `fa4d822` (2023-08-11) | 내 계정 첫 커밋 — DB `mysql → postgreSql`, 배포 `AWS → fly.io`, 담당자 교체 |
| `673790e` 작품 삭제로직 추가 (2023-12-27) | 원본 마지막 커밋 |
| chore(mock) 4개 (`de68123` – `d56d0f3`) | 비밀 파일 추적 해제·더미 env, Node 고정·lockfile 추적, 목업 층, MOCK.md (2026년 추가) |
| docs 3개 | MOCK.md 공개본 정정 · 이 README · `docs/` (2026년 추가) |

원본 66커밋은 해시가 모두 바뀌었다(작성자 이메일 정리, 값 치환). 커밋 순서·날짜·메시지는 그대로다.

## 공개본에서 바꾼 것

- 전 히스토리에서 **파일째 제거**: `config/.env.development`·`config/.env.production`(DB·AWS·JWT·SES·로그인 연동 설정), `src/serviceAccountKey.json`(서비스 계정 키), 루트 `crackit-portfolio`(fly.io WireGuard 접속 설정). 목업이 읽는 더미 `config/.env.example` 은 남겼다.
- 전 히스토리에서 **제3자 이미지 제거**: `public/assets/images/index_background.webp`(상업 스톡 이미지라 재배포할 수 없다, 2026-11-09). 안내 페이지 `GET /` 의 배경 그림이 비어 보인다.
- **값 치환**(`REDACTED_*` 자리표시자): S3 버킷 이름과 업로드 키 경로, fly 앱 이름, Swagger 예시의 외부 이미지 URL·이메일·비밀번호 형태 문자열. 그래서 이 저장소의 업로드·배포 설정은 원래 대상에 닿지 않는다. 목업 모드는 이 변경과 무관하게 동작한다.
- **작성자**: 내 이름 변형(`JinGureum`·`Hyungjin`)은 `JinGureum` 하나로 합치고, 동료 커밋은 이름만 남기고 이메일을 지웠다.
- 남긴 것: 서비스 이름(Swagger 제목, 업로드 키 경로의 서비스명), DB 스키마 이름이 든 구버전 설계 문서(`ddl/`, UML 텍스트).

## 화면·API (목업 모드 캡처)

`docs/` 에 Swagger UI 캡처 11장(1440 폭), OpenAPI 명세 [`docs/openapi.json`](docs/openapi.json)(operation 66), 대표 요청·응답 3건이 있다. 캡처의 "(가림: …)" 는 Swagger 예시값에 있던 식별자·계정 정보를 촬영할 때 화면에서 가린 것이다. 빨간 점선 배지는 원본의 알려진 결함·한계 표기이고, 파란 점선은 캡처 주석이다(둘 다 촬영 스크립트가 붙였다).

| 화면 | 보여 주는 것 |
|---|---|
| [01](docs/screens/01-swagger-overview-1440.png) | 전체 개요 — 태그 17개 |
| [02](docs/screens/02-tag-history-core-1440.png) | 이력 진입 API — get-or-create 묶음 |
| [03](docs/screens/03-tag-history-areas-1440.png) | 학력·수상·전시·기타 4영역의 동일한 구조 (`delay(200)` 한계 배지) |
| [04](docs/screens/04-tag-author-1440.png) | 작가 API 10개 (평문 비밀번호 반환 결함 배지) |
| [05](docs/screens/05-tag-artwork-1440.png) | 작품·블록·사진 API 10개 |
| [06](docs/screens/06-tag-portfolio-mainvisual-1440.png) | 포트폴리오·대표화면·태그·테마 API 13개 |
| [07](docs/screens/07-tag-file-default-1440.png) | 파일 업로드 API 2개 |
| [08](docs/screens/08-try-history-getall-1440.png) | Try it out — 이력 3계층 일괄 조회 (200) |
| [09](docs/screens/09-try-history-create-1440.png) | Try it out — 이력 get-or-create ×2, 같은 id |
| [10](docs/screens/10-try-award-savedata-1440.png) | Try it out — 수상 저장: 임시 id → UUID, 저장 후 재조회 응답 |
| [11](docs/screens/11-try-award-deletevalue-1440.png) | Try it out — 계층 단위 소프트 삭제 (`affected: 1`) |

| 대표 요청·응답 | 내용 |
|---|---|
| [01-history-getall](docs/api-examples/01-history-getall.txt) | 이력 6영역 + 3계층 일괄 조회, 층별 `createdAt` 오름차순 |
| [02-history-get-or-create](docs/api-examples/02-history-get-or-create.txt) | 있을 때·없을 때 두 번 불러도 같은 이력 |
| [03-award-savedata-softdelete](docs/api-examples/03-award-savedata-softdelete.txt) | 임시 id → UUID 재조회, 소프트 삭제 후 DB 행 확인 |

## 라이선스

All rights reserved — 포트폴리오 열람용
