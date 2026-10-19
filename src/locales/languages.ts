/*
 * 页面提供的语言。顺序就是语言菜单里的顺序，第一种是默认语言（链接和上次的选择都没说时用它）。
 *
 * 加一种语言：
 * 1. 在这张表里加一行：code 是 BCP 47 语言标签（html 的 lang、链接上的 ?lang= 都用它），
 *    name 用这种语言自己写，also 是另外几种写法（地区标签、旧链接里的简写）；
 * 2. 在 src/locales/ 下加一份译文，形状照 src/content.ts 的 Copy，再在 index.ts 里接上（漏了会报类型错误）；
 * 3. 文字是新的书写系统时，在 styles.css 里给它配一组字体。
 * 页面头部的 hreflang 和 og:locale:alternate 由 vite.config.ts 照这张表生成。
 */

type Language = {
  readonly code: string;
  readonly name: string;
  readonly ogLocale: string;
  readonly also?: readonly string[];
};

export const languages = [
  { code: "en", name: "English", ogLocale: "en_US" },
  {
    code: "zh-Hans",
    name: "简体中文",
    ogLocale: "zh_CN",
    // 上一版只有中英两种，存下来的和链接上的中文写的是 zh
    also: ["zh", "zh-CN", "zh-SG", "zh-MY"],
  },
  {
    code: "zh-Hant",
    name: "繁體中文",
    ogLocale: "zh_TW",
    also: ["zh-TW", "zh-HK", "zh-MO"],
  },
  { code: "ja", name: "日本語", ogLocale: "ja_JP" },
  { code: "ko", name: "한국어", ogLocale: "ko_KR" },
] as const satisfies readonly Language[];

export type Lang = (typeof languages)[number]["code"];

export const defaultLang: Lang = languages[0].code;

/* 站点的正式地址：规范链接和 hreflang 都指向它，不跟着预览环境的域名走 */
export const siteUrl = "https://arkai.vip/";

/** 某种语言的页面地址：默认语言就是首页本身，其他语言带 ?lang= */
export const pageUrl = (lang: Lang) =>
  lang === defaultLang ? siteUrl : `${siteUrl}?lang=${lang}`;

const list: readonly (Language & { code: Lang })[] = languages;

/**
 * 把链接上、存储里的语言标签认成页面提供的某一种，认不出来就是 null。
 * 不分大小写；认不出整个标签时一段一段往回截（zh-Hant-HK → zh-Hant，en-GB → en）
 */
export function matchLang(value: string | null | undefined): Lang | null {
  let tag = value?.trim().toLowerCase().replaceAll("_", "-") ?? "";
  while (tag) {
    for (const language of list) {
      if (
        language.code.toLowerCase() === tag ||
        language.also?.some((alias) => alias.toLowerCase() === tag)
      ) {
        return language.code;
      }
    }
    const cut = tag.lastIndexOf("-");
    tag = cut > 0 ? tag.slice(0, cut) : "";
  }
  return null;
}
