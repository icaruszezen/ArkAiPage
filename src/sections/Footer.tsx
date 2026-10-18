/*
 * 页脚：官网没有页脚导航，最底下只有一条注册色条和一行小字。
 */
import { RegistrationStrip } from "@endfield-ui/react";
import { BrandMark } from "../Brand.tsx";
import { useCopy } from "../i18n.ts";

export function Footer() {
  const { footer } = useCopy();
  return (
    <footer className="bg-surface">
      {/* 底部多留一截：右下角浮着"回到顶部"，滚到底时不压住最后一行小字 */}
      <div className="mx-auto w-full max-w-page px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] sm:px-6 lg:px-10">
        <RegistrationStrip rule />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <div className="flex items-center gap-4">
            <BrandMark />
            <span className="font-latin text-xs tracking-label text-ink-secondary uppercase">
              {footer.tagline}
            </span>
          </div>
          <p className="text-xs text-ink-secondary">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
