/*
 * 简体中文。形状见 src/content.ts 的 Copy。
 */
import { supportEmail, type Copy } from "../content.ts";

const zhHans: Copy = {
  meta: {
    title: "ArkAI｜企业大模型服务、AI Agent 智能体与 AI 视觉解决方案",
    description:
      "ArkAI 为企业提供 AI 大模型服务、AI Agent（智能体）设计与 AI 视觉解决方案，支持私有化部署，覆盖需求诊断、原型验证、交付部署到运维迭代的全流程。",
  },

  nav: {
    home: "首页",
    solutions: "解决方案",
    approach: "方法",
    cases: "应用场景",
    process: "合作流程",
    faq: "常见问题",
    contact: "联系我们",
  },

  ui: {
    skip: "跳到正文",
    mainNav: "主导航",
    homeLink: "ArkAI 首页",
    menuTitle: "ArkAI 导航",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    toDark: "切换到暗色",
    toLight: "切换到亮色",
    backToTop: "回到顶部",
    consult: "预约咨询",
    consultShort: "预约咨询",
    language: "语言",
    colon: "：",
    carousel: {
      label: "轮播",
      slide: "幻灯片",
      previous: "上一张",
      next: "下一张",
      place: (index: number, count: number) => `第 ${index} 张，共 ${count} 张`,
    },
  },

  hero: {
    meta: "// ARKAI　AI 解决方案",
    titleLines: ["把 AI", "做成生产力"],
    lead: "ArkAI 为企业提供端到端的 AI 解决方案。从大模型服务、AI Agent 设计到 AI 视觉方案，我们陪你把一个想法做成每天都在运转的系统。",
    actionsLabel: "开始了解",
    explore: "了解解决方案",
    contact: "预约咨询",
    dockLabel: "业务方向",
  },

  solutions: {
    title: "解决方案",
    meta: (count: number) => `// 解决方案　共 ${count} 条业务线`,
    intro: "面向企业的 AI 解决方案，目前覆盖下面三个方向。",
    tabsLabel: "业务方向",
    deliveryName: "交付形式",
    scenariosName: "典型场景",
    capabilitiesHeading: "能做什么",
    consult: "咨询这个方向",
    more: "三条业务线之外的 AI 需求，或者还不确定该从哪一步开始，都可以先聊聊。",
    moreAction: "聊聊你的需求",
    items: [
      {
        key: "llm",
        code: "01",
        title: "AI 大模型服务",
        short: "大模型",
        latin: "LLM Services",
        summary:
          "帮企业选好、用好、管好大模型。无论是调用云端模型，还是在自己的机房里私有化部署，都按业务场景给出能落地的方案。",
        capabilities: [
          "模型选型与效果评测",
          "私有化部署与推理加速",
          "领域微调与对齐",
          "RAG 知识库与企业搜索",
          "API 网关与用量成本管控",
        ],
        delivery: "私有化 / 混合云 / API",
        scenarios: "智能客服、知识问答、内容生成",
      },
      {
        key: "agent",
        code: "02",
        title: "AI Agent 设计",
        short: "Agent",
        latin: "Agent Design",
        summary:
          "把重复、跨系统的工作交给 Agent。从业务流程出发设计智能体：它该看什么、能调用什么、什么时候必须交回给人。",
        capabilities: [
          "业务流程梳理与任务拆解",
          "工具调用与系统集成",
          "多智能体协作编排",
          "评测、监控与可观测性",
          "人机协同与权限边界",
        ],
        delivery: "定制开发 / 平台搭建",
        scenarios: "运营自动化、数据分析助手、研发提效",
      },
      {
        key: "vision",
        code: "03",
        title: "AI 视觉解决方案",
        short: "视觉",
        latin: "Vision Solutions",
        summary:
          "让机器看懂图像与视频。从产线质检到文档识别，负责从数据、模型到边缘部署的整条链路。",
        capabilities: [
          "工业缺陷检测",
          "OCR 与文档理解",
          "视频结构化分析",
          "图文多模态检索",
          "边缘端部署与加速",
        ],
        delivery: "边缘部署 / 云端服务",
        scenarios: "质检、巡检、票据与合同处理",
      },
    ],
  },

  approach: {
    title: "我们怎么做 AI 项目",
    meta: (count: number) => `// 方法　${count} 条原则`,
    intro:
      "AI 项目做不成，多半不是模型不够强，而是没想清楚要解决什么、怎么衡量、上线之后谁来管。这四条是我们每个项目都守着的做法。",
    principles: [
      {
        latin: "Value First",
        title: "先算清楚价值",
        text: "先找到值得做的场景和衡量它的指标，再决定用什么模型、花多少钱。",
      },
      {
        latin: "Data Stays",
        title: "数据留在你手里",
        text: "支持私有化部署与权限隔离，敏感数据可以不离开你的环境。",
      },
      {
        latin: "Measurable",
        title: "效果可以衡量",
        text: "每个交付都带评测集和上线指标，好不好，用数据说话。",
      },
      {
        latin: "Long Run",
        title: "上线只是开始",
        text: "上线后持续监控效果，跟着业务变化迭代和升级模型。",
      },
    ],
  },

  cases: {
    title: "应用场景",
    meta: (count: number) => `// 应用场景　${count} 类常见场景`,
    intro: "几类常见的落地场景，以及每条业务线在其中能做的事。",
    listLabel: "应用场景",
    galleryLabel: "应用场景图示",
    slideTitle: (tag: string, title: string) => `${tag}　${title}`,
    items: [
      {
        tag: "生产",
        title: "产线外观质检",
        solutions: ["vision"],
        text: "用视觉模型替代人工目检，在产线上实时发现划痕、缺料、错装等缺陷，并把结果接回现有的质量系统。",
      },
      {
        tag: "文档",
        title: "合同与制度审阅",
        solutions: ["llm", "agent"],
        text: "自动比对合同与制度条款，标出风险点并附上原文出处，交给人工复核。",
      },
      {
        tag: "服务",
        title: "智能客服与知识库",
        solutions: ["llm"],
        text: "基于产品资料和服务记录回答客户问题，答不了的转人工，并带上完整的上下文。",
      },
      {
        tag: "数据",
        title: "经营数据分析助手",
        solutions: ["agent"],
        text: "用自然语言提问，Agent 查询数据、生成图表，并解释数字背后的变化。",
      },
    ],
  },

  process: {
    title: "合作流程",
    meta: (count: number) => `// 合作流程　共 ${count} 步`,
    intro: "每一步结束都有能检查的产出，看过结果再决定下一步要不要做、怎么做。",
    steps: [
      { title: "需求诊断", text: "了解业务与数据现状，找出值得先做的场景。" },
      { title: "方案设计", text: "确定技术路线、交付范围和评估指标。" },
      {
        title: "原型验证",
        text: "用小范围的原型验证效果与成本，再决定是否推广。",
      },
      { title: "交付部署", text: "工程化开发、对接现有系统，并完成上线。" },
      { title: "运维迭代", text: "监控线上效果，持续优化，按需升级模型。" },
    ],
  },

  /* FAQ 的回答涉及数据与合规上的承诺，上线前需要公司确认 */
  faq: {
    title: "常见问题",
    meta: (count: number) => `// 常见问题　${count} 条`,
    intro: "没找到你想问的？直接告诉我们你的情况。",
    action: "联系我们",
    items: [
      {
        question: "我们的数据会被拿去训练别的模型吗？",
        answer:
          "数据怎么用、存放在哪里、保留多久，都会在合同和数据协议里写清楚。对数据敏感的场景可以私有化部署，数据不离开你的环境。",
      },
      {
        question: "一个项目大概要多久？",
        answer:
          "看范围。原型验证一般以周计，完整交付一般以月计；需求诊断之后会给出明确的排期。",
      },
      {
        question: "公司里没有 AI 团队，也能做吗？",
        answer:
          "可以。从方案、开发到上线后的运维都可以由我们负责，同时把必要的使用和维护方法交接给你的团队。",
      },
      {
        question: "支持哪些模型？",
        answer:
          "主流的开源与商用大模型大多可以接入。具体用哪个，我们会按效果、成本和合规要求帮你评估，也可以多个模型搭配使用。",
      },
    ],
  },

  contact: {
    title: "预约咨询",
    meta: "// 联系我们",
    intro:
      "说说你的业务和想用 AI 解决的问题，哪怕还只是一个想法。我们会先帮你判断值不值得做、从哪一步开始。",
    emailLabel: "咨询邮箱",
    formLabel: "咨询表单",
    note: `提交后会打开你的邮件应用，内容已经填好，确认后发到 ${supportEmail} 即可。`,
    requiredBefore: "带",
    requiredAfter: "的是必填项。",
    name: "称呼",
    namePlaceholder: "例如 王先生",
    company: "公司或组织",
    need: "咨询方向",
    other: "其他",
    message: "需求描述",
    messageHelp: "业务场景、现有数据、希望什么时候上线，写多少都可以。",
    submit: "发送邮件",
    errors: {
      name: "请填写称呼，方便我们联系你。",
      need: "请选一个咨询方向，不确定就选“其他”。",
    },
    ready: {
      title: "邮件已经准备好",
      body: `如果邮件应用没有打开，可以直接写信到 ${supportEmail}。`,
    },
    mail: {
      subject: (need: string, name: string) => `ArkAI 咨询：${need}（${name}）`,
      name: "称呼",
      company: "公司或组织",
      need: "咨询方向",
      message: "需求描述",
    },
  },

  footer: {
    tagline: "AI SOLUTIONS FOR REAL WORK",
    copyright: "© 2026 ArkAI",
  },
};

export default zhHans;
