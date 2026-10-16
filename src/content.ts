/*
 * 业务文案和所有占位信息（联系方式、案例、备案号、标志说明）都在这里，换成真实内容时只改这一个文件。
 * 版块导语、按钮和表单提示这类界面文字写在各自的 sections/*.tsx 里。
 */

export const brand = {
  latin: "AI SOLUTIONS FOR REAL WORK",
};

export type SectionId =
  | "home"
  | "solutions"
  | "approach"
  | "cases"
  | "process"
  | "faq"
  | "contact";

/* 导航与页面上的版块一一对应，顺序也一样 */
export const sections: { id: SectionId; label: string }[] = [
  { id: "home", label: "首页" },
  { id: "solutions", label: "解决方案" },
  { id: "approach", label: "方法" },
  { id: "cases", label: "应用场景" },
  { id: "process", label: "合作流程" },
  { id: "faq", label: "常见问题" },
  { id: "contact", label: "联系我们" },
];

export const hero = {
  meta: "// ARKAI　AI 解决方案",
  /* 标题分两行排 */
  titleLines: ["把 AI", "做成生产力"],
  lead: "ArkAI 为企业提供端到端的 AI 解决方案。从大模型服务、AI Agent 设计到 AI 视觉方案，我们陪你把一个想法做成每天都在运转的系统。",
};

export type SolutionKey = "llm" | "agent" | "vision";

export type Solution = {
  key: SolutionKey;
  code: string;
  title: string;
  /** 窄屏页签和表单选项里用的短名 */
  short: string;
  latin: string;
  summary: string;
  capabilities: string[];
  delivery: string;
  scenarios: string;
};

export const solutions: Solution[] = [
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
];

export const moreSolutions =
  "三条业务线之外的 AI 需求，或者还不确定该从哪一步开始，都可以先聊聊。";

export const principles = [
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
];

/* 应用场景：真实案例还没有，这里是示意，页面上会标"示例" */
export const cases: {
  industry: string;
  title: string;
  solutions: SolutionKey[];
  text: string;
}[] = [
  {
    industry: "制造",
    title: "产线外观质检",
    solutions: ["vision"],
    text: "用视觉模型替代人工目检，在产线末端实时拦下划痕、缺料与错装。",
  },
  {
    industry: "金融",
    title: "合规文档审阅助手",
    solutions: ["llm", "agent"],
    text: "自动比对合同与制度条款，标出风险点，并附上原文出处供人工复核。",
  },
  {
    industry: "零售",
    title: "智能客服与知识库",
    solutions: ["llm"],
    text: "基于商品与售后知识库回答顾客问题，答不了的转人工并带上上下文。",
  },
  {
    industry: "企业内部",
    title: "经营数据分析 Agent",
    solutions: ["agent"],
    text: "用自然语言提问，Agent 查询数据、生成图表，并解释数字背后的变化。",
  },
];

export const steps = [
  { title: "需求诊断", text: "了解业务与数据现状，找出值得先做的场景。" },
  { title: "方案设计", text: "确定技术路线、交付范围和评估指标。" },
  { title: "原型验证", text: "用小范围的原型验证效果与成本，再决定是否推广。" },
  { title: "交付部署", text: "工程化开发、对接现有系统，并完成上线。" },
  { title: "运维迭代", text: "监控线上效果，持续优化，按需升级模型。" },
];

/* FAQ 的回答涉及数据与合规上的承诺，上线前需要公司确认 */
export const faqs = [
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
      "主流的开源与商用大模型大多可以接入。具体用哪个，我们会按效果、成本和合规要求（包括模型备案情况）帮你评估，也可以多个模型搭配使用。",
  },
];

/*
 * 联系方式还没有，先放占位。ready 为 false 时页面在每一项旁边标"待补充"，
 * 表单的提示也不会把人指到这个邮箱；换成真实信息后把它改成 true。
 */
export const contact = {
  ready: false,
  email: "contact@arkai.example",
  phone: "400-000-0000",
  address: "公司地址待补充",
  hours: "工作日 9:00 – 18:00",
};

export type Need = SolutionKey | "other";

/* 表单里的咨询方向：三条业务线的短名，加一个"其他" */
export const needs: { value: Need; label: string }[] = [
  ...solutions.map((item) => ({ value: item.key, label: item.short })),
  { value: "other", label: "其他" },
];

export const footer = {
  copyright: "© 2026 ArkAI",
  icp: "ICP 备案号待补充",
  privacy: "隐私政策（待补充）",
  logoNote: "标志为临时占位",
};
