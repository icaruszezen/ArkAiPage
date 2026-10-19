/*
 * 한국어. 형태는 src/content.ts의 Copy를 따릅니다.
 */
import { supportEmail, type Copy } from "../content.ts";

const ko: Copy = {
  meta: {
    title: "ArkAI | 기업용 LLM 서비스, AI 에이전트, AI 비전 솔루션",
    description:
      "ArkAI는 기업을 위한 LLM 서비스, AI 에이전트 설계, AI 비전 솔루션을 제공합니다. 온프레미스 구축을 지원하며, 현황 진단과 프로토타입 검증부터 배포와 운영까지 전 과정을 함께합니다.",
  },

  nav: {
    home: "홈",
    solutions: "솔루션",
    approach: "접근 방식",
    cases: "활용 시나리오",
    process: "협업 절차",
    faq: "자주 묻는 질문",
    contact: "문의하기",
  },

  ui: {
    skip: "본문 바로가기",
    mainNav: "주 메뉴",
    homeLink: "ArkAI 홈",
    menuTitle: "ArkAI 메뉴",
    openMenu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
    toDark: "어두운 테마로 전환",
    toLight: "밝은 테마로 전환",
    backToTop: "맨 위로",
    consult: "상담 신청",
    consultShort: "상담 신청",
    language: "언어",
    colon: ": ",
    carousel: {
      label: "캐러셀",
      slide: "슬라이드",
      previous: "이전 슬라이드",
      next: "다음 슬라이드",
      place: (index: number, count: number) =>
        `총 ${count}개 중 ${index}번째 슬라이드`,
    },
  },

  hero: {
    meta: "// ARKAI · AI 솔루션",
    titleLines: ["AI를", "생산성으로"],
    lead: "ArkAI는 기업을 위한 엔드투엔드 AI 솔루션을 제공합니다. LLM 서비스, AI 에이전트 설계, AI 비전 솔루션을 아우르며, 아이디어가 매일 운영되는 시스템으로 자리 잡을 때까지 고객 팀과 함께합니다.",
    actionsLabel: "시작하기",
    explore: "솔루션 살펴보기",
    contact: "상담 신청",
    dockLabel: "서비스 분야",
  },

  solutions: {
    title: "솔루션",
    meta: (count: number) => `// 솔루션 · ${count}개 서비스 분야`,
    intro: "기업을 위한 AI 솔루션을 현재 세 분야에서 제공합니다.",
    tabsLabel: "서비스 분야",
    deliveryName: "제공 방식",
    scenariosName: "대표 시나리오",
    capabilitiesHeading: "주요 역량",
    consult: "이 분야 상담하기",
    more: "세 분야 외의 AI 과제가 있거나 어디서부터 시작해야 할지 아직 정하지 못하셨더라도 먼저 상담하실 수 있습니다.",
    moreAction: "AI 과제 상담하기",
    items: [
      {
        key: "llm",
        code: "01",
        title: "LLM 서비스",
        short: "LLM",
        latin: "LLM Services",
        summary:
          "기업이 대규모 언어 모델(LLM)을 잘 고르고, 잘 쓰고, 잘 관리할 수 있도록 돕습니다. 클라우드에서 모델을 호출하든 자체 데이터센터에 온프레미스로 구축하든, 업무에 맞춰 실제로 적용할 수 있는 방안을 설계합니다.",
        capabilities: [
          "모델 선정 및 성능 평가",
          "온프레미스 구축 및 추론 가속",
          "도메인 특화 파인튜닝 및 정렬",
          "RAG 지식 베이스 및 엔터프라이즈 검색",
          "API 게이트웨이 및 사용량·비용 관리",
        ],
        delivery: "온프레미스 / 하이브리드 클라우드 / API",
        scenarios: "고객 상담, 지식 질의응답, 콘텐츠 생성",
      },
      {
        key: "agent",
        code: "02",
        title: "AI 에이전트 설계",
        short: "Agent",
        latin: "Agent Design",
        summary:
          "반복적이고 여러 시스템을 오가는 업무를 에이전트에게 맡길 수 있습니다. 업무 프로세스를 기준으로 에이전트가 무엇을 확인해야 하는지, 무엇을 호출할 수 있는지, 언제 반드시 사람에게 넘겨야 하는지를 설계합니다.",
        capabilities: [
          "업무 프로세스 매핑 및 작업 분해",
          "도구 호출 및 시스템 연동",
          "멀티 에이전트 오케스트레이션",
          "평가, 모니터링 및 관측성",
          "휴먼 인 더 루프 및 권한 범위 설정",
        ],
        delivery: "맞춤 개발 / 플랫폼 구축",
        scenarios: "운영 자동화, 데이터 분석, 개발 생산성 향상",
      },
      {
        key: "vision",
        code: "03",
        title: "AI 비전 솔루션",
        short: "비전",
        latin: "Vision Solutions",
        summary:
          "기계가 이미지와 영상을 이해하도록 만듭니다. 생산 라인의 품질 검사부터 문서 인식까지, 데이터와 모델에서 엣지 배포에 이르는 전 과정을 책임집니다.",
        capabilities: [
          "산업용 결함 검출",
          "OCR 및 문서 이해",
          "영상 구조화 분석",
          "이미지·텍스트 멀티모달 검색",
          "엣지 배포 및 가속",
        ],
        delivery: "엣지 배포 / 클라우드 서비스",
        scenarios: "품질 검사, 현장 점검, 청구서·계약서 처리",
      },
    ],
  },

  approach: {
    title: "AI 프로젝트를 진행하는 방식",
    meta: (count: number) => `// 접근 방식 · ${count}가지 원칙`,
    intro:
      "AI 프로젝트가 실패하는 이유는 대개 모델 성능이 부족해서가 아닙니다. 무엇을 해결할지, 어떻게 측정할지, 운영에 들어간 뒤 누가 관리할지를 명확히 정하지 않았기 때문입니다. 아래 네 가지 원칙은 저희가 맡는 모든 프로젝트에 적용됩니다.",
    principles: [
      {
        latin: "Value First",
        title: "가치부터 따집니다",
        text: "추진할 가치가 있는 과제와 그 성과를 측정할 지표를 먼저 정한 다음, 어떤 모델을 쓰고 비용을 얼마나 들일지 결정합니다.",
      },
      {
        latin: "Data Stays",
        title: "데이터는 고객의 것입니다",
        text: "온프레미스 구축과 접근 권한 격리를 지원하므로, 민감한 데이터를 고객 환경 밖으로 내보내지 않아도 됩니다.",
      },
      {
        latin: "Measurable",
        title: "성과는 측정할 수 있습니다",
        text: "모든 결과물에 평가 데이터셋과 운영 지표를 함께 제공합니다. 효과가 있는지는 데이터로 판단합니다.",
      },
      {
        latin: "Long Run",
        title: "도입은 시작일 뿐입니다",
        text: "도입 후에도 품질을 계속 모니터링하고, 비즈니스 변화에 맞춰 시스템을 개선하며 모델을 업그레이드합니다.",
      },
    ],
  },

  cases: {
    title: "AI 활용 시나리오",
    meta: (count: number) => `// 활용 시나리오 · ${count}가지 대표 유형`,
    intro: "대표적인 적용 시나리오와 각 시나리오에 맞는 서비스를 정리했습니다.",
    listLabel: "활용 시나리오",
    galleryLabel: "활용 시나리오 일러스트",
    slideTitle: (tag: string, title: string) => `${tag} · ${title}`,
    items: [
      {
        tag: "제조",
        title: "생산 라인 외관 검사",
        solutions: ["vision"],
        text: "비전 모델이 작업자의 육안 검사를 대신해 생산 라인에서 스크래치, 부품 누락, 오조립 같은 결함을 실시간으로 찾아내고, 검사 결과를 기존 품질 관리 시스템에 반영합니다.",
      },
      {
        tag: "문서",
        title: "계약서 및 사내 규정 검토",
        solutions: ["llm", "agent"],
        text: "계약서를 사내 규정과 자동으로 대조해 위험 조항을 표시하고 근거 원문을 함께 붙인 뒤, 담당자에게 넘겨 최종 검토를 받습니다.",
      },
      {
        tag: "서비스",
        title: "고객 상담 및 지식 베이스",
        solutions: ["llm"],
        text: "제품 자료와 상담 이력을 바탕으로 고객 문의에 답하고, 답하기 어려운 문의는 전체 맥락과 함께 상담원에게 넘깁니다.",
      },
      {
        tag: "데이터",
        title: "경영 데이터 분석 어시스턴트",
        solutions: ["agent"],
        text: "자연어로 질문하면 에이전트가 데이터를 조회하고 차트를 만든 뒤, 숫자 이면의 변화를 설명합니다.",
      },
    ],
  },

  process: {
    title: "협업 절차",
    meta: (count: number) => `// 협업 절차 · 총 ${count}단계`,
    intro:
      "단계마다 검토할 수 있는 결과물이 나옵니다. 결과를 확인한 뒤 다음 단계의 진행 여부와 방법을 결정하시면 됩니다.",
    steps: [
      {
        title: "현황 진단",
        text: "비즈니스와 데이터 현황을 파악하고, 먼저 추진할 가치가 있는 과제를 찾습니다.",
      },
      {
        title: "솔루션 설계",
        text: "기술 접근 방식, 구축 범위, 평가 지표를 확정합니다.",
      },
      {
        title: "프로토타입 검증(PoC)",
        text: "작은 규모의 프로토타입으로 품질과 비용을 검증한 뒤 확대 적용 여부를 결정합니다.",
      },
      {
        title: "구축 및 배포",
        text: "시스템을 프로덕션 수준으로 개발하고 기존 시스템과 연동해 실제 운영을 시작합니다.",
      },
      {
        title: "운영 및 개선",
        text: "운영 중인 시스템의 품질을 모니터링하며 지속적으로 최적화하고, 필요에 따라 모델을 업그레이드합니다.",
      },
    ],
  },

  faq: {
    title: "자주 묻는 질문",
    meta: (count: number) => `// 자주 묻는 질문 · ${count}개 항목`,
    intro: "원하시는 답변을 찾지 못하셨다면 현재 상황을 직접 말씀해 주십시오.",
    action: "문의하기",
    items: [
      {
        question: "저희 회사 데이터가 다른 모델 학습에 사용되나요?",
        answer:
          "데이터의 사용 방식, 저장 위치, 보관 기간은 모두 계약서와 데이터 약정에 명시합니다. 민감한 데이터를 다루는 경우에는 온프레미스로 구축해 데이터가 고객 환경을 벗어나지 않도록 할 수 있습니다.",
      },
      {
        question: "프로젝트 하나에 보통 얼마나 걸리나요?",
        answer:
          "범위에 따라 다릅니다. 프로토타입 검증은 보통 몇 주, 전체 구축은 몇 개월이 걸리며, 현황 진단을 마친 뒤 구체적인 일정을 제시합니다.",
      },
      {
        question: "사내에 AI 팀이 없어도 진행할 수 있나요?",
        answer:
          "가능합니다. 설계와 개발부터 도입 후 운영까지 저희가 맡을 수 있으며, 고객 팀이 시스템을 사용하고 유지 관리하는 데 필요한 내용도 인계합니다.",
      },
      {
        question: "어떤 모델을 지원하나요?",
        answer:
          "주요 오픈소스·상용 LLM은 대부분 연동할 수 있습니다. 품질, 비용, 규정 준수 요건을 기준으로 적합한 모델을 고를 수 있도록 도와드리며, 여러 모델을 조합해 사용할 수도 있습니다.",
      },
    ],
  },

  contact: {
    title: "상담 신청",
    meta: "// 문의하기",
    intro:
      "비즈니스 현황과 AI로 해결하고 싶은 문제를 알려 주십시오. 아직 아이디어 단계여도 괜찮습니다. 추진할 가치가 있는지, 어디서부터 시작하면 좋을지 먼저 판단하실 수 있도록 도와드립니다.",
    emailLabel: "문의 이메일",
    formLabel: "상담 신청 양식",
    note: `제출하시면 내용이 모두 채워진 상태로 이메일 앱이 열립니다. 확인 후 ${supportEmail}로 보내시면 됩니다.`,
    requiredBefore: "필수 항목에는",
    requiredAfter: "표시가 있습니다.",
    name: "이름",
    namePlaceholder: "예: 김민준",
    company: "회사 또는 기관",
    need: "상담 분야",
    other: "기타",
    message: "문의 내용",
    messageHelp:
      "적용하려는 업무, 보유한 데이터, 희망 도입 시점 등을 분량에 상관없이 자유롭게 적어 주십시오.",
    submit: "이메일로 보내기",
    errors: {
      name: "연락드릴 수 있도록 이름을 입력해 주십시오.",
      need: "상담 분야를 선택해 주십시오. 잘 모르시겠다면 ‘기타’를 고르시면 됩니다.",
    },
    ready: {
      title: "이메일이 준비되었습니다",
      body: `이메일 앱이 열리지 않았다면 ${supportEmail}로 직접 메일을 보내 주십시오.`,
    },
    mail: {
      subject: (need: string, name: string) =>
        `ArkAI 상담 신청: ${need} (${name})`,
      name: "이름",
      company: "회사 또는 기관",
      need: "상담 분야",
      message: "문의 내용",
    },
  },

  footer: {
    tagline: "AI SOLUTIONS FOR REAL WORK",
    copyright: "© 2026 ArkAI",
  },
};

export default ko;
