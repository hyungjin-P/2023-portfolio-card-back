'use strict';
// 손으로 만든 가짜 데이터. 실제 사람·기관·연락처가 아니다(이메일은 예약 도메인 example.com, 기관명은 "가상…").
// id: 종류별 접두 8자리 + 일련번호인 고정 UUID(v4 형식). 시각: 2023-12-01 10:00 부터 행마다 1분씩(정렬이 결정된다).
// 이력 필드의 의미는 front 입력 라벨을 따른다: title = 종류, subtitle = 연도, value = 내용
// (학력은 원본대로 1행: subtitles[0] = 연도, values[0] = 학교·전공).

const P = {
  author: '10000000',
  portfolio: '20000000',
  mainVisual: '30000000',
  tag: '31000000',
  theme: '32000000',
  artWork: '40000000',
  block: '41000000',
  picture: '42000000',
  history: '50000000',
  general: '51000000',
  contact: '52000000',
  section: '53000000', // 이력 4영역 제목
  subtitle: '54000000',
  value: '55000000',
};
const id = (kind, n) => `${P[kind]}-0000-4000-8000-${String(n).padStart(12, '0')}`;

function buildFixtures(assetBase) {
  let minute = 0;
  const at = () => new Date(Date.UTC(2023, 11, 1, 10, minute++)).toISOString().replace('T', ' ').slice(0, 19);
  const seq = {};
  const row = (kind, fields) => {
    seq[kind] = (seq[kind] || 0) + 1;
    const t = at();
    return { id: id(kind, seq[kind]), createdAt: t, updatedAt: t, ...fields };
  };
  const img = (name) => `${assetBase}/${name}.svg`;

  const authors = [
    row('author', { provider: 'example.com', name: '하늘결', authorLink: 'sample-artist', email: 'sample-artist@example.com', password: 'sample1234', isTemporaryAuthor: false, serviceTerm: true }),
    row('author', { provider: 'example.com', name: '달빛 스튜디오', authorLink: 'moonlit-studio', email: 'moonlit-studio@example.com', password: 'sample1234', isTemporaryAuthor: false, serviceTerm: true }),
    // 가입 전 주소만 선점한 임시 작가(POST /author/createTempAuthor 의 결과와 같은 모양)
    row('author', { provider: 'example.com', authorLink: 'reserved-link' }),
  ];
  const [sample, moonlit] = authors;

  const portfolios = [row('portfolio', { authorId: sample.id }), row('portfolio', { authorId: moonlit.id })];
  const [pSample, pMoonlit] = portfolios;

  const mainVisuals = [
    row('mainVisual', { portfolioId: pSample.id, name: '하늘결', nickName: 'Haneulgyeol', subTitle: '빛과 면으로 기록하는 일상의 풍경', mainVisualUrl: img('cover-01') }),
    row('mainVisual', { portfolioId: pMoonlit.id, name: '달빛 스튜디오', nickName: 'Moonlit Studio', subTitle: '밤의 색을 모으는 그래픽 스튜디오', mainVisualUrl: img('cover-02') }),
  ];
  const tags = [
    ...['회화', '드로잉', '설치'].map((content) => row('tag', { portfolioMainVisualId: mainVisuals[0].id, content })),
    ...['그래픽', '포스터'].map((content) => row('tag', { portfolioMainVisualId: mainVisuals[1].id, content })),
  ];
  // 클래스명은 원본 DTO 기본값(portfolio-main-visual-theme.entity.dto.ts)
  const themeClasses = { controllerClass: 'angulate', shareButtonClass: 'angulate', titleClass: 'angulate', subTitleClass: 'angulate', tagClass: 'angulate' };
  const themes = mainVisuals.map((mv) => row('theme', { portfolioMainVisualId: mv.id, ...themeClasses }));

  const artWorks = [row('artWork', { portfolioId: pSample.id }), row('artWork', { portfolioId: pMoonlit.id })];
  const blockSpecs = [
    [artWorks[0], '물결 연작', '여름 바다의 반사광을 겹친 면으로 옮긴 연작', true, ['artwork-01', 'artwork-02', 'artwork-03']],
    [artWorks[0], '창가의 정물', '오전의 창가에 놓인 그릇과 과일', true, ['artwork-04', 'artwork-05']],
    [artWorks[0], '도시의 오후', '건물 그림자가 길어지는 시간의 색', true, ['artwork-06']],
    [artWorks[0], '작업 노트', '비공개로 둔 습작 블록', false, ['artwork-07']],
    [artWorks[1], '야간 포스터 시리즈', '심야 상영회를 위한 포스터', true, ['artwork-08', 'artwork-09']],
    [artWorks[1], '별자리 패턴', '반복 패턴으로 만든 포장지 디자인', true, ['artwork-10']],
  ];
  const blocks = [];
  const pictures = [];
  const sortByWork = new Map();
  for (const [work, title, description, visibility, images] of blockSpecs) {
    const sortNumber = sortByWork.get(work.id) || 0;
    sortByWork.set(work.id, sortNumber + 1);
    const block = row('block', { portfolioArtWorkId: work.id, blockType: 'image', sortNumber, title, description, visibility });
    blocks.push(block);
    images.forEach((name, i) => pictures.push(row('picture', { portfolioArtWorkBlockId: block.id, url: img(name), sortNumber: i })));
  }

  const histories = [row('history', { portfolioId: pSample.id }), row('history', { portfolioId: pMoonlit.id })];
  const [hSample, hMoonlit] = histories;
  const generals = [
    row('general', { portfolioHistoryId: hSample.id, nickname: '하늘결', generalImageUrl: img('profile-01') }),
    row('general', { portfolioHistoryId: hMoonlit.id, nickname: '달빛 스튜디오', generalImageUrl: img('profile-02') }),
  ];
  const contacts = [
    row('contact', { portfolioHistoryId: hSample.id, prefix: '+82', tel: '010-0000-0000', email: 'sample-artist@example.com' }),
    row('contact', { portfolioHistoryId: hMoonlit.id, prefix: '+82', tel: '010-0000-0000', email: 'moonlit-studio@example.com' }),
  ];

  // 4영역 공통 3계층: [영역 테이블 접두, 외래키 이름 접두, 이력, [[제목, [[연도, [내용…]]…]]…]]
  const areas = [
    ['education', 'Education', hSample, [['학력', [['2020', ['가상예술대학교 회화과 학사 졸업']]]]]],
    ['education', 'Education', hMoonlit, [['학력', [['2019', ['가상디자인대학교 시각디자인과 학사 졸업']]]]]],
    ['exhibition', 'Exhibition', hSample, [
      ['개인전', [['2023', ['「물결의 시간」, 가상갤러리(서울)']]]],
      ['단체전', [['2022', ['「여름의 면」 3인전, 가상아트스페이스']], ['2021', ['신진작가 기획전 「첫 장면」, 가상미술관', '아트북 페어 참여, 가상문화센터']]]],
    ]],
    ['exhibition', 'Exhibition', hMoonlit, [['그룹전', [['2023', ['「밤의 인쇄소」 포스터전, 가상디자인홀']]]]]],
    ['award', 'Award', hSample, [['수상', [['2022', ['가상문화재단 신진작가 공모 우수상']], ['2020', ['가상예술대학교 졸업전시 최우수상']]]]]],
    ['etc', 'Etc', hSample, [
      ['레지던시', [['2021', ['가상창작스튜디오 6기 입주작가']]]],
      ['출판', [['2023', ['드로잉집 「창가」 독립출판']]]],
    ]],
  ];
  const areaRows = {};
  const push = (table, r) => (areaRows[table] ||= []).push(r);
  for (const [area, Name, history, sections] of areas) {
    for (const [title, subtitles] of sections) {
      const section = row('section', { portfolioHistoryId: history.id, title });
      push(`portfolio_history_${area}`, section);
      for (const [subtitleText, values] of subtitles) {
        const subtitle = row('subtitle', { [`portfolioHistory${Name}Id`]: section.id, subtitle: subtitleText });
        push(`portfolio_history_${area}_subtitle`, subtitle);
        for (const value of values) {
          push(`portfolio_history_${area}_subtitle_value`, row('value', { [`portfolioHistory${Name}SubtitleId`]: subtitle.id, value }));
        }
      }
    }
  }

  return [
    ['author', authors],
    ['portfolio', portfolios],
    ['portfolio_main_visual', mainVisuals],
    ['portfolio_main_visual_tag', tags],
    ['portfolio_main_visual_theme', themes],
    ['portfolio_art_work', artWorks],
    ['portfolio_art_work_block', blocks],
    ['portfolio_art_work_picture', pictures],
    ['portfolio_history', histories],
    ['portfolio_history_general', generals],
    ['portfolio_history_contact', contacts],
    ...Object.entries(areaRows),
  ];
}

module.exports = { buildFixtures, id };
