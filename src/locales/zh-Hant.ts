/*
 * 繁體中文（台灣）。形狀見 src/content.ts 的 Copy。
 */
import { supportEmail, type Copy } from "../content.ts";

const zhHant: Copy = {
  meta: {
    title: "ArkAI｜企業大型語言模型服務、AI Agent 智慧代理與 AI 視覺解決方案",
    description:
      "ArkAI 為企業提供大型語言模型（LLM）服務、AI Agent（智慧代理）設計與 AI 視覺解決方案，支援私有化部署，涵蓋從需求診斷、原型驗證、導入部署到維運優化的完整流程。",
  },

  nav: {
    home: "首頁",
    solutions: "解決方案",
    approach: "做法",
    cases: "應用場景",
    process: "合作流程",
    faq: "常見問題",
    contact: "聯絡我們",
  },

  ui: {
    skip: "跳到主要內容",
    mainNav: "主要導覽",
    homeLink: "ArkAI 首頁",
    menuTitle: "ArkAI 導覽",
    openMenu: "開啟選單",
    closeMenu: "關閉選單",
    toDark: "切換為深色模式",
    toLight: "切換為淺色模式",
    backToTop: "回到頂端",
    consult: "預約諮詢",
    consultShort: "預約諮詢",
    language: "語言",
    colon: "：",
    carousel: {
      label: "輪播",
      slide: "投影片",
      previous: "上一張",
      next: "下一張",
      place: (index: number, count: number) => `第 ${index} 張，共 ${count} 張`,
    },
  },

  hero: {
    meta: "// ARKAI　AI 解決方案",
    titleLines: ["把 AI", "變成生產力"],
    lead: "ArkAI 為企業提供端對端的 AI 解決方案。從大型語言模型服務、AI Agent 設計到 AI 視覺方案，我們與您的團隊一起，把一個想法做成每天都在運作的系統。",
    actionsLabel: "開始了解",
    explore: "了解解決方案",
    contact: "預約諮詢",
    dockLabel: "服務項目",
  },

  solutions: {
    title: "解決方案",
    meta: (count: number) => `// 解決方案　共 ${count} 項服務`,
    intro: "為企業打造的 AI 解決方案，目前涵蓋以下三個方向。",
    tabsLabel: "服務項目",
    deliveryName: "交付方式",
    scenariosName: "典型應用",
    capabilitiesHeading: "服務內容",
    consult: "諮詢這項服務",
    more: "這三項服務之外的 AI 需求，或是還不確定該從哪一步開始，都歡迎先聊聊。",
    moreAction: "聊聊您的需求",
    items: [
      {
        key: "llm",
        code: "01",
        title: "大型語言模型服務",
        short: "LLM",
        latin: "LLM Services",
        summary:
          "協助企業選對、用好、管好大型語言模型。無論是呼叫雲端模型，還是在自家機房私有化部署，我們都會依照業務場景，規劃可以實際導入的方案。",
        capabilities: [
          "模型選擇與成效評估",
          "私有化部署與推論加速",
          "領域微調與對齊",
          "RAG 知識庫與企業搜尋",
          "API 閘道與用量成本控管",
        ],
        delivery: "私有化部署 / 混合雲 / API",
        scenarios: "智慧客服、知識問答、內容生成",
      },
      {
        key: "agent",
        code: "02",
        title: "AI Agent 設計",
        short: "Agent",
        latin: "Agent Design",
        summary:
          "把重複、跨系統的工作交給 AI Agent。我們以您的業務流程為出發點設計每個代理：它該看哪些資訊、能呼叫哪些工具，以及什麼時候必須交還給人。",
        capabilities: [
          "業務流程盤點與任務拆解",
          "工具呼叫與系統整合",
          "多代理協作編排",
          "評估、監控與可觀測性",
          "人機協作與權限邊界",
        ],
        delivery: "客製開發 / 平台建置",
        scenarios: "營運自動化、資料分析助理、研發效率提升",
      },
      {
        key: "vision",
        code: "03",
        title: "AI 視覺解決方案",
        short: "視覺",
        latin: "Vision Solutions",
        summary:
          "讓機器看懂影像與影片。不論是產線品檢還是文件辨識，從資料、模型到邊緣部署，每個環節都由我們負責。",
        capabilities: [
          "工業瑕疵檢測",
          "OCR 與文件理解",
          "影片結構化分析",
          "圖文多模態檢索",
          "邊緣端部署與加速",
        ],
        delivery: "邊緣部署 / 雲端服務",
        scenarios: "品質檢測、現場巡檢、發票與合約處理",
      },
    ],
  },

  approach: {
    title: "我們怎麼做 AI 專案",
    meta: (count: number) => `// 做法　${count} 項原則`,
    intro:
      "AI 專案做不起來，多半不是模型不夠強，而是沒想清楚要解決什麼、怎麼衡量、上線後由誰負責。以下四項原則，是我們每個專案都堅持的做法。",
    principles: [
      {
        latin: "Value First",
        title: "先算清楚價值",
        text: "先找出值得投入的場景和衡量它的指標，再決定用哪個模型、編列多少預算。",
      },
      {
        latin: "Data Stays",
        title: "資料留在您手中",
        text: "支援私有化部署與權限隔離，敏感資料不必離開您的環境。",
      },
      {
        latin: "Measurable",
        title: "成效可以衡量",
        text: "每次交付都附上評估資料集與上線指標，成效好不好，讓資料說話。",
      },
      {
        latin: "Long Run",
        title: "上線只是開始",
        text: "上線後持續監控成效，隨著業務變化迭代改進並升級模型。",
      },
    ],
  },

  cases: {
    title: "應用場景",
    meta: (count: number) => `// 應用場景　${count} 類常見場景`,
    intro: "幾類常見的導入場景，以及每項服務能在其中做些什麼。",
    listLabel: "應用場景",
    galleryLabel: "應用場景示意圖",
    slideTitle: (tag: string, title: string) => `${tag}　${title}`,
    items: [
      {
        tag: "製造",
        title: "產線外觀檢測",
        solutions: ["vision"],
        text: "以視覺模型取代人工目檢，在產線上即時發現刮傷、缺件、組裝錯誤等瑕疵，並將結果回傳至現有的品管系統。",
      },
      {
        tag: "文件",
        title: "合約與規章審閱",
        solutions: ["llm", "agent"],
        text: "自動比對合約與內部規章，標出有風險的條款並附上原文出處，再交由人工複核。",
      },
      {
        tag: "服務",
        title: "智慧客服與知識庫",
        solutions: ["llm"],
        text: "根據產品資料與服務紀錄回答客戶問題，無法回答時轉由真人處理，並附上完整的前後脈絡。",
      },
      {
        tag: "資料",
        title: "營運分析助理",
        solutions: ["agent"],
        text: "用自然語言提問，Agent 會查詢資料、產生圖表，並說明數字背後的變化。",
      },
    ],
  },

  process: {
    title: "合作流程",
    meta: (count: number) => `// 合作流程　共 ${count} 個步驟`,
    intro:
      "每個步驟結束時都有可檢視的產出，您看過成果，再決定下一步要不要做、怎麼做。",
    steps: [
      {
        title: "需求診斷",
        text: "了解業務與資料現況，找出值得優先投入的場景。",
      },
      {
        title: "方案設計",
        text: "確定技術路線、交付範圍與評估指標。",
      },
      {
        title: "原型驗證",
        text: "先以小範圍的原型驗證成效與成本，再決定是否擴大導入。",
      },
      {
        title: "導入部署",
        text: "完成開發、串接現有系統，並正式上線。",
      },
      {
        title: "維運優化",
        text: "監控上線後的成效，持續優化，並視需要升級模型。",
      },
    ],
  },

  faq: {
    title: "常見問題",
    meta: (count: number) => `// 常見問題　${count} 題`,
    intro: "沒找到您想問的？直接告訴我們您的情況。",
    action: "聯絡我們",
    items: [
      {
        question: "我們的資料會被拿去訓練其他模型嗎？",
        answer:
          "資料如何使用、存放在哪裡、保留多久，都會在合約與資料協議中寫清楚。涉及敏感資料的場景可以採用私有化部署，資料不會離開您的環境。",
      },
      {
        question: "一個專案大概需要多久？",
        answer:
          "視範圍而定。原型驗證通常以週計，完整交付通常以月計；需求診斷之後，我們會提供明確的時程。",
      },
      {
        question: "公司內部沒有 AI 團隊，也能做嗎？",
        answer:
          "可以。從方案設計、開發到上線後的維運，都可以由我們負責，同時將必要的使用與維護方式交接給您的團隊。",
      },
      {
        question: "支援哪些模型？",
        answer:
          "主流的開源與商用大型語言模型，大多都可以串接。實際要用哪一個，我們會依成效、成本與法規遵循要求協助您評估，也可以搭配多個模型使用。",
      },
    ],
  },

  contact: {
    title: "預約諮詢",
    meta: "// 聯絡我們",
    intro:
      "跟我們聊聊您的業務，以及想用 AI 解決的問題，就算還只是一個想法也沒關係。我們會先協助您判斷值不值得做、該從哪一步開始。",
    emailLabel: "諮詢信箱",
    formLabel: "諮詢表單",
    note: `送出後會開啟您的郵件程式，內容已自動填好，確認後寄到 ${supportEmail} 即可。`,
    requiredBefore: "標有",
    requiredAfter: "的欄位為必填。",
    name: "稱呼",
    namePlaceholder: "例如 陳先生",
    company: "公司或組織",
    need: "諮詢項目",
    other: "其他",
    message: "需求說明",
    messageHelp: "業務場景、現有資料、預計何時上線，寫多寫少都可以。",
    submit: "寄出郵件",
    errors: {
      name: "請填寫您的稱呼，方便我們聯絡您。",
      need: "請選擇一個諮詢項目，不確定的話就選「其他」。",
    },
    ready: {
      title: "郵件已準備好",
      body: `如果郵件程式沒有開啟，也可以直接來信至 ${supportEmail}。`,
    },
    mail: {
      subject: (need: string, name: string) => `ArkAI 諮詢：${need}（${name}）`,
      name: "稱呼",
      company: "公司或組織",
      need: "諮詢項目",
      message: "需求說明",
    },
  },

  footer: {
    tagline: "AI SOLUTIONS FOR REAL WORK",
    copyright: "© 2026 ArkAI",
  },
};

export default zhHant;
