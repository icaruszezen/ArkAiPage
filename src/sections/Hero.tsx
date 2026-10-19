/*
 * 首屏：标题偏左，主角（三层台子的线稿）偏右并占最大的一块，宽屏上右缘被版面切掉；
 * 右下角一条深色的停靠坞，三条业务线的入口。
 */
import { Button, ButtonGroup, cn, GhostText } from "@endfield-ui/react";
import { IsoArt } from "../art/iso.tsx";
import { heroStack, heroStackBare } from "../art/scenes.ts";
import type { SolutionKey } from "../content.ts";
import { useCopy } from "../i18n.ts";
import { fadeIn, hidden, stage, useLightUp, useReveal } from "../reveal.ts";

/* 首屏的几行字用纯 CSS 的入场，不等脚本量位置；按钮只淡入，不位移 */
const enter = "animate-shift-in [--shift-x:calc(var(--motion-shift-lg)*-1)]";

export function Hero({
  onPickSolution,
}: {
  onPickSolution: (key: SolutionKey) => void;
}) {
  const { hero, solutions } = useCopy();
  /*
   * 主图和停靠坞看见了才播：宽屏上挂上就在眼前，和上面几行字同一拍；
   * 手机上停靠坞在首屏下面，滚到了才播，不在屏幕外面播完
   */
  const [artRef, art] = useReveal();
  const artLight = useLightUp(art);
  const [dockRef, dock] = useReveal<HTMLElement>();
  return (
    <section
      id="home"
      aria-labelledby="home-title"
      // 横向裁切只裁宽屏上越出右缘的主图；纵向不裁，焦点环不会被切掉
      className="relative flex min-h-[calc(100dvh-3.5rem)] flex-col bg-surface xl:overflow-x-clip rail:min-h-dvh"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-clip"
      >
        <GhostText className="absolute -top-3 -right-4 hidden xl:block">
          ArkAI
        </GhostText>
      </div>

      {/*
       * 窄屏一列：标题、主图、按钮；宽屏两列，主图占右边两行。
       * 1280px 起只有主图离开居中的内容区：左边的字仍和其他版块对齐在同一条线上
       */}
      <div className="relative mx-auto grid w-full max-w-page flex-1 content-center items-center gap-x-10 gap-y-10 px-4 pt-12 pb-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-y-8 lg:px-10 lg:pt-20 xl:max-w-none xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] xl:pr-0 xl:pl-[max(2.5rem,calc((100%-var(--container-page))/2+2.5rem))]">
        <div className="@container flex min-w-0 flex-col gap-7 lg:col-start-1 lg:row-start-1 lg:self-end">
          <p className={`font-tech text-xs text-ink-secondary ${enter}`}>
            {hero.meta}
          </p>
          {/* 字号跟着这一栏的宽度走：第二行（"做成生产力"）始终排在一行里 */}
          <h1
            id="home-title"
            className={`text-4xl leading-[1.1] font-bold @sm:text-5xl xl:@lg:text-6xl ${enter} [animation-delay:100ms]`}
          >
            {hero.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p
            className={`max-w-xl text-lg leading-relaxed ${enter} [animation-delay:200ms]`}
          >
            {hero.lead}
          </p>
        </div>

        {/* 主角：手机上不带标注；宽屏上按视口高度定大小，往右越出版面 */}
        {/* 只动不透明度：宽屏上这一层自己带着 translate */}
        <div
          ref={artRef}
          className={cn(
            "mx-auto w-full max-w-[16rem] min-w-0 sm:max-w-[30rem] lg:col-start-2 lg:row-span-2 lg:row-start-1 xl:mx-0 xl:w-[min(48vw,calc(100dvh-13rem))] xl:max-w-none xl:translate-x-[8%] xl:justify-self-end",
            artLight,
          )}
        >
          <IsoArt
            shapes={heroStackBare}
            className="w-full text-ink sm:hidden"
          />
          <IsoArt
            shapes={heroStack}
            labelSize={7}
            className="hidden w-full text-ink sm:block xl:hidden"
          />
          <IsoArt
            shapes={heroStack}
            labelSize={4.5}
            className="hidden w-full text-ink xl:block"
          />
        </div>

        <ButtonGroup
          align="start"
          aria-label={hero.actionsLabel}
          className="animate-fade-in [animation-delay:300ms] max-sm:flex-col max-sm:items-stretch lg:col-start-1 lg:row-start-2 lg:self-start"
        >
          <Button size="lg" href="#solutions">
            {hero.explore}
          </Button>
          <Button variant="action" size="lg" href="#contact">
            {hero.contact}
          </Button>
        </ButtonGroup>
      </div>

      {/* 停靠坞：三条业务线的入口，宽屏时贴在首屏右下角 */}
      {/* 入场照完成横幅：色带从左擦入，里面的链接晚 200ms 淡入，不位移 */}
      <nav
        ref={dockRef}
        aria-label={hero.dockLabel}
        // 和页面相反的一条：亮色主题下是深色带，暗色主题下是浅色带
        data-theme="inverse"
        className={cn(
          "relative bg-surface text-ink lg:ml-auto lg:w-[min(56rem,max(66%,40rem))]",
          stage(dock, hidden, "animate-wipe-in [animation-delay:100ms]"),
        )}
      >
        <ul className={cn("grid sm:grid-cols-3", stage(dock, "", fadeIn[300]))}>
          {solutions.items.map((item) => (
            <li
              key={item.key}
              className="min-w-0 border-line not-last:border-b sm:not-last:border-r sm:not-last:border-b-0"
            >
              <a
                href="#solutions"
                onClick={() => onPickSolution(item.key)}
                className="group flex h-full items-center gap-4 px-5 py-4 transition-colors duration-(--duration-fast) hover:bg-surface-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus"
              >
                <span className="font-tech text-sm text-ink-secondary tabular-nums">
                  {item.code}
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="font-medium text-pretty">{item.title}</span>
                  {item.latin && (
                    <span className="truncate font-latin text-xs text-ink-secondary uppercase">
                      {item.latin}
                    </span>
                  )}
                </span>
                <span
                  aria-hidden="true"
                  className="ml-auto h-4 w-1 shrink-0 bg-ink-secondary transition-colors duration-(--duration-fast) group-hover:bg-action"
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
