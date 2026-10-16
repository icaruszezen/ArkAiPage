/*
 * ArkAI 的标志（占位）：墨色方块里挖出一个"A"形的拱，拱心一点信号黄。
 * 正式的标志定下来之后换掉这一个文件就行。
 */
import { cn } from "@endfield-ui/react";

export function BrandSymbol({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      aria-hidden="true"
      focusable="false"
      className={cn("size-7 shrink-0", className)}
    >
      <rect width="28" height="28" className="fill-ink" />
      {/* 挖空的部分用页面底色画：放在 bg-surface 上才对 */}
      <path
        d="M5 23 14 5l9 18h-5.5L14 15.5 10.5 23z"
        className="fill-surface"
      />
      <path d="M14 15.5 17.5 23h-7z" className="fill-action" />
    </svg>
  );
}

type BrandMarkProps = {
  /** 只要方块，不要字标（收起的侧轨里） */
  compact?: boolean;
  className?: string;
};

/** 标志 + 字标。整体当作一个名字读："ArkAI" */
export function BrandMark({ compact = false, className }: BrandMarkProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-2.5 text-ink", className)}
    >
      <BrandSymbol />
      {!compact && (
        <span
          aria-hidden="true"
          className="font-display text-base font-extrabold tracking-label uppercase"
        >
          ArkAI
        </span>
      )}
      <span className="sr-only">ArkAI</span>
    </span>
  );
}
