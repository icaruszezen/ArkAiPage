/*
 * 页面的结构和文案的形状。文字本身在 src/locales/ 里，每种语言一份，形状都是这里的 Copy；
 * 有哪几种语言、叫什么名字，见 src/locales/index.ts。
 * 加字段时每一份译文都要加（漏了会报类型错误）；条目的个数也是定的（版面按这个个数排）。
 */

export type SectionId =
  | "home"
  | "solutions"
  | "approach"
  | "cases"
  | "process"
  | "faq"
  | "contact";

/* 导航与页面上的版块一一对应，顺序也一样 */
export const sectionIds: SectionId[] = [
  "home",
  "solutions",
  "approach",
  "cases",
  "process",
  "faq",
  "contact",
];

export type SolutionKey = "llm" | "agent" | "vision";
export type Need = SolutionKey | "other";

/* 咨询邮箱：联系区和表单发出的邮件都用它 */
export const supportEmail = "support@arkai.vip";

export type Solution = {
  key: SolutionKey;
  code: string;
  title: string;
  /** 窄屏页签、表单选项和案例标签里用的短名 */
  short: string;
  /** 标题下面的一行英文小字；英文版标题本身就是英文，不要这一行 */
  latin?: string;
  summary: string;
  capabilities: string[];
  delivery: string;
  scenarios: string;
};

export type UseCase = {
  /** 场景的类别，列表里那个小标签 */
  tag: string;
  title: string;
  solutions: SolutionKey[];
  text: string;
};

/** "共几条"一类的微文字：传进来的是个数 */
type Counted = (count: number) => string;

export type Copy = {
  /** 标签页标题和搜索摘要 */
  meta: { title: string; description: string };

  nav: Record<SectionId, string>;

  ui: {
    skip: string;
    mainNav: string;
    homeLink: string;
    menuTitle: string;
    openMenu: string;
    closeMenu: string;
    toDark: string;
    toLight: string;
    backToTop: string;
    consult: string;
    /** 手机顶栏和收窄的导航轨上的同一个按钮：地方小，要用短一点的说法 */
    consultShort: string;
    /** 语言菜单的名字：读屏念的按钮名，也是菜单里那一组的小标题 */
    language: string;
    /** "名称：内容"中间的冒号，连同它后面该有的空格 */
    colon: string;
    carousel: {
      label: string;
      slide: string;
      previous: string;
      next: string;
      place: (index: number, count: number) => string;
    };
  };

  hero: {
    meta: string;
    /** 标题分两行排，第二行在窄屏上也排在一行里 */
    titleLines: [string, string];
    lead: string;
    actionsLabel: string;
    explore: string;
    contact: string;
    dockLabel: string;
  };

  solutions: {
    title: string;
    meta: Counted;
    intro: string;
    tabsLabel: string;
    deliveryName: string;
    scenariosName: string;
    capabilitiesHeading: string;
    consult: string;
    more: string;
    moreAction: string;
    /** 顺序固定：大模型、Agent、视觉 */
    items: [Solution, Solution, Solution];
  };

  approach: {
    title: string;
    meta: Counted;
    intro: string;
    principles: [Principle, Principle, Principle, Principle];
  };

  cases: {
    title: string;
    meta: Counted;
    intro: string;
    listLabel: string;
    galleryLabel: string;
    /** 轮播下面的标题：类别和场景名 */
    slideTitle: (tag: string, title: string) => string;
    /** 每一条配一张线稿，顺序和线稿对应 */
    items: [UseCase, UseCase, UseCase, UseCase];
  };

  process: {
    title: string;
    meta: Counted;
    intro: string;
    steps: [Step, Step, Step, Step, Step];
  };

  faq: {
    title: string;
    meta: Counted;
    intro: string;
    action: string;
    items: { question: string; answer: string }[];
  };

  contact: {
    title: string;
    meta: string;
    intro: string;
    emailLabel: string;
    formLabel: string;
    note: string;
    /** "带◆的是必填项"：菱形是画出来的，夹在前后两段字中间 */
    requiredBefore: string;
    requiredAfter: string;
    name: string;
    namePlaceholder: string;
    company: string;
    need: string;
    other: string;
    message: string;
    messageHelp: string;
    submit: string;
    errors: { name: string; need: string };
    ready: { title: string; body: string };
    /** 发出去的邮件：正文每一行是"名称 + 冒号（ui.colon）+ 内容" */
    mail: {
      subject: (need: string, name: string) => string;
      name: string;
      company: string;
      need: string;
      message: string;
    };
  };

  footer: { tagline: string; copyright: string };
};

type Principle = {
  /** 标题上面的英文小字，各语言都一样 */
  latin: string;
  title: string;
  text: string;
};

type Step = { title: string; text: string };
