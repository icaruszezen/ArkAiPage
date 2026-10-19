/*
 * 每种语言的全部文案。有哪几种语言见 languages.ts；每一份译文的形状都是 src/content.ts 的 Copy。
 * 五份都打进同一个包：每份只有几 KB，换语言时不用再等下载。
 */
import type { Copy } from "../content.ts";
import en from "./en.ts";
import ja from "./ja.ts";
import ko from "./ko.ts";
import type { Lang } from "./languages.ts";
import zhHans from "./zh-Hans.ts";
import zhHant from "./zh-Hant.ts";

export const copy: Record<Lang, Copy> = {
  en,
  "zh-Hans": zhHans,
  "zh-Hant": zhHant,
  ja,
  ko,
};
