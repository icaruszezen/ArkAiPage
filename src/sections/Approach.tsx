/*
 * 方法：先一条信号黄的色带，然后进入深色的版块（官网"世界观"的排法）——
 * 点云球套在刻度圆环里当主角，四条做事的原则停靠在旁边。
 */
import { cn, SectionTitle, TickRing } from "@endfield-ui/react";
import { IsoArt } from "../art/iso.tsx";
import { PointCloud } from "../art/PointCloud.tsx";
import { bandArt } from "../art/scenes.ts";
import type { Copy } from "../content.ts";
import { useCopy } from "../i18n.ts";
import {
  fadeIn,
  hidden,
  shiftIn,
  shiftInColumn,
  stage,
  useReveal,
} from "../reveal.ts";

type PrincipleItem = Copy["approach"]["principles"][number];

/*
 * 一条原则一个触发：手机上四条摞起来有一屏多高，滚到哪条播哪条。
 * 同一排的两条一起触发，第二列晚 75ms（--i）
 */
function Principle({ item, index }: { item: PrincipleItem; index: number }) {
  const [ref, phase] = useReveal<HTMLLIElement>();
  return (
    <li
      ref={ref}
      className={cn(
        "flex gap-4 border-t border-line pt-5",
        "[--i:0] sm:even:[--i:1] lg:even:[--i:0] xl:even:[--i:1]",
        stage(phase, hidden, shiftInColumn),
      )}
    >
      <span
        aria-hidden="true"
        className="font-display text-xl leading-7 font-extrabold text-ink-tertiary"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex min-w-0 flex-col gap-1.5">
        <p
          aria-hidden="true"
          className="font-latin text-xs tracking-label text-ink-secondary uppercase"
        >
          {item.latin}
        </p>
        <h3 className="text-lg font-bold">{item.title}</h3>
        <p className="text-sm text-ink-secondary">{item.text}</p>
      </div>
    </li>
  );
}

/* 色带的入场照完成横幅：整条从左擦入，字晚 200ms 从左 8px 归位；线稿跟着色带露出来 */
const bandText =
  "[&>div>div:last-child]:animate-shift-in [&>div>div:last-child]:[--shift-x:calc(var(--motion-shift-lg)*-1)] [&>div>div:last-child]:[animation-delay:200ms]";

export function Approach() {
  const { approach } = useCopy();
  const [bandRef, band] = useReveal<HTMLElement>();
  const [headRef, head] = useReveal();
  const [ringRef, ring] = useReveal();
  return (
    <section
      id="approach"
      data-theme="dark"
      className="bg-surface-sunken text-ink"
    >
      {/* 色带是装饰：读屏和标题大纲里只留下面的版块标题 */}
      <SectionTitle
        ref={bandRef}
        variant="band"
        aria-hidden="true"
        className={stage(band, hidden, `animate-wipe-in ${bandText}`)}
        subtitle="ArkAI"
        illustration={
          // 色带在亮暗两个主题下都是黄底墨字：上面的线稿固定按亮色画
          <div data-theme="light" className="text-ink">
            <IsoArt shapes={bandArt} padding={3} className="h-12 @md:h-14" />
          </div>
        }
      >
        In Practice
      </SectionTitle>

      <div className="mx-auto grid w-full max-w-page items-center gap-x-16 gap-y-12 px-4 py-24 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:px-10">
        <div className="flex min-w-0 flex-col gap-10 lg:order-last">
          <div ref={headRef} className="flex flex-col gap-6">
            <SectionTitle
              latin="Approach"
              meta={approach.meta(approach.principles.length)}
            >
              {approach.title}
            </SectionTitle>
            <p
              className={cn(
                "max-w-prose text-ink-secondary",
                stage(head, hidden, shiftIn[300]),
              )}
            >
              {approach.intro}
            </p>
          </div>
          <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {approach.principles.map((item, index) => (
              // 用位置当 key：换语言时不重挂，入场不重播
              <Principle key={index} item={item} index={index} />
            ))}
          </ol>
        </div>

        {/* 主角：点云球，偏在左边 */}
        {/*
         * 刻度圆环像分节标题的箭头一样从 −45° 转正（300ms），点云晚 100ms 淡入；闪烁留给下面的影像。
         * 转着的方框比自己大：外层裁掉（圆环画在圆里，裁不到），不然手机上会撑出横向滚动
         */}
        <div
          ref={ringRef}
          className="@container mx-auto w-full max-w-[30rem] min-w-0 overflow-clip lg:max-w-[34rem] 2xl:max-w-[40rem]"
        >
          <TickRing
            size="100%"
            aria-hidden="true"
            className={stage(
              ring,
              "staged:[&>svg]:-rotate-45",
              "[&>svg]:animate-turn-in",
            )}
          >
            <PointCloud
              className={cn(
                "w-[64cqw] text-ink",
                stage(ring, hidden, fadeIn[100]),
              )}
            />
          </TickRing>
        </div>
      </div>
    </section>
  );
}
