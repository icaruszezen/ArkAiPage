import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { languages, pageUrl, siteUrl } from "./src/locales/languages.ts";

/*
 * 页面头部的多语言标记，照 src/locales/languages.ts 的语言表生成：
 * 每种语言一条 hreflang（加上 x-default 指向首页），分享卡片上列出其他几种语言
 */
function languageLinks(): Plugin {
  return {
    name: "arkai-language-links",
    transformIndexHtml: () => [
      ...languages.map((language) => ({
        tag: "link",
        attrs: {
          rel: "alternate",
          hreflang: language.code,
          href: pageUrl(language.code),
        },
        injectTo: "head" as const,
      })),
      {
        tag: "link",
        attrs: { rel: "alternate", hreflang: "x-default", href: siteUrl },
        injectTo: "head",
      },
      ...languages.slice(1).map((language) => ({
        tag: "meta",
        attrs: { property: "og:locale:alternate", content: language.ogLocale },
        injectTo: "head" as const,
      })),
    ],
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), languageLinks()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rolldownOptions: {
      // Base UI 每个文件开头的 "use client" 打包后用不着，一条条报出来只是刷屏
      onLog(level, log, handler) {
        if (log.code !== "MODULE_LEVEL_DIRECTIVE") handler(level, log);
      },
    },
  },
});
