/*
 * 页面语言：默认英文，可以切到中文。记在 localStorage 里，下次打开还是这种；
 * 链接上带 ?lang=zh 或 ?lang=en 时以链接为准（方便把某种语言的页面发给别人）。
 * 和组件库的 useTheme 一样是一个模块级的小仓库，不需要 Provider。
 */
import { useSyncExternalStore } from "react";
import { copy, type Lang } from "./content.ts";

const KEY = "arkai-lang";
const isLang = (value: unknown): value is Lang =>
  value === "zh" || value === "en";

function initial(): Lang {
  try {
    const param = new URLSearchParams(window.location.search).get("lang");
    if (isLang(param)) return param;
    const saved = window.localStorage.getItem(KEY);
    if (isLang(saved)) return saved;
  } catch {
    // 隐私模式等情况下读不到存储：用默认
  }
  return "en";
}

let current = initial();
const listeners = new Set<() => void>();

/* 页面外面的几处跟着语言走：html 的 lang、标签页标题、搜索摘要 */
function applyToDocument() {
  const text = copy[current];
  document.documentElement.lang = current === "zh" ? "zh-CN" : "en";
  document.title = text.meta.title;
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", text.meta.description);
}
applyToDocument();

export function setLang(next: Lang) {
  if (next === current) return;
  current = next;
  try {
    window.localStorage.setItem(KEY, next);
    // 链接上带着旧的 ?lang 时一起改掉，刷新后不会又切回去
    const url = new URL(window.location.href);
    if (url.searchParams.has("lang")) {
      url.searchParams.set("lang", next);
      window.history.replaceState(window.history.state, "", url);
    }
  } catch {
    // 存不下就只在这次打开里生效
  }
  applyToDocument();
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useLang(): Lang {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => "en",
  );
}

/** 当前语言的全部文案 */
export function useCopy() {
  return copy[useLang()];
}
