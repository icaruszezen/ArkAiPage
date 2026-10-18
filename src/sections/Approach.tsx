/*
 * 方法：先一条信号黄的色带，然后进入深色的版块（官网"世界观"的排法）——
 * 点云球套在刻度圆环里当主角，四条做事的原则停靠在旁边。
 */
import { SectionTitle, TickRing } from "@endfield-ui/react";
import { IsoArt } from "../art/iso.tsx";
import { PointCloud } from "../art/PointCloud.tsx";
import { bandArt } from "../art/scenes.ts";
import { useCopy } from "../i18n.ts";

export function Approach() {
  const { approach } = useCopy();
  return (
    <section
      id="approach"
      data-theme="dark"
      className="bg-surface-sunken text-ink"
    >
      {/* 色带是装饰：读屏和标题大纲里只留下面的版块标题 */}
      <SectionTitle
        variant="band"
        aria-hidden="true"
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
          <div className="flex flex-col gap-6">
            <SectionTitle
              latin="Approach"
              meta={approach.meta(approach.principles.length)}
            >
              {approach.title}
            </SectionTitle>
            <p className="max-w-prose text-ink-secondary">{approach.intro}</p>
          </div>
          <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {approach.principles.map((item, index) => (
              <li
                key={item.title}
                className="flex gap-4 border-t border-line pt-5"
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
            ))}
          </ol>
        </div>

        {/* 主角：点云球，偏在左边 */}
        <div className="@container mx-auto w-full max-w-[30rem] min-w-0 lg:max-w-[34rem] 2xl:max-w-[40rem]">
          <TickRing size="100%" aria-hidden="true">
            <PointCloud className="w-[64cqw] text-ink" />
          </TickRing>
        </div>
      </div>
    </section>
  );
}
