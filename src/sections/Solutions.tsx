/*
 * 解决方案：照官网"干员情报"的排法，一次看一条业务线——
 * 左边是名称、标签对、简介和能力清单，右边是这条线的线稿，占一大块。
 */
import {
  BracketTitle,
  Button,
  cn,
  SectionTitle,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TagPair,
  Viewfinder,
} from "@endfield-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { IsoArt, type Shape } from "../art/iso.tsx";
import { agentArt, llmArt, visionArt } from "../art/scenes.ts";
import type { Need, Solution, SolutionKey } from "../content.ts";
import { useCopy } from "../i18n.ts";
import {
  fadeIn,
  hidden,
  shiftIn,
  stage,
  useLightUp,
  useReveal,
} from "../reveal.ts";

const art: Record<SolutionKey, Shape[]> = {
  llm: llmArt,
  agent: agentArt,
  vision: visionArt,
};

/* 名值对的"值"在窄屏上可以折行，不把页面撑宽（组件库的 Tag 默认不换行） */
const pairFit =
  "max-w-full [&>*:last-child]:h-auto [&>*:last-child]:min-h-7 [&>*:last-child]:min-w-0 [&>*:last-child]:shrink [&>*:last-child]:py-1.5 [&>*:last-child]:leading-snug [&>*:last-child]:whitespace-normal";

function SolutionDetail({
  item,
  onConsult,
  still: stillAtMount,
  onPlay,
}: {
  item: Solution;
  onConsult: (key: Need) => void;
  /** 这一版块已经播过：后来切过来的面板只有页签自己的淡入 */
  still: boolean;
  onPlay: () => void;
}) {
  const { solutions } = useCopy();
  const count = String(solutions.items.length).padStart(2, "0");
  // 挂上时定下来，之后不变：播到一半切走再切回来也不会重播
  const [still] = useState(stillAtMount);
  /*
   * 三组各自触发：手机上左栏的字有一屏多高，取景框在它下面。
   * 钩子放在面板自己里面：面板切换时整块卸载、重挂，观察的节点跟着换
   */
  const [introRef, intro] = useReveal({ disabled: still });
  const [capsRef, caps] = useReveal({ disabled: still });
  const [frameRef, frame] = useReveal({ disabled: still });
  const artLight = useLightUp(frame);
  useEffect(() => {
    if (intro === "playing") onPlay();
  }, [intro, onPlay]);

  return (
    <div className="grid gap-x-12 gap-y-10 pt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <div className="flex min-w-0 flex-col gap-6">
        {/* 页头的顺序：微文字行 → 名称（括号标题自己的入场）→ 标签对 → 简介 */}
        <div ref={introRef} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p
              className={cn(
                "font-tech text-xs text-ink-secondary",
                stage(intro, hidden, shiftIn[0]),
              )}
            >
              {`${item.code} / ${count}`}
              {item.latin && `　${item.latin.toUpperCase()}`}
            </p>
            <BracketTitle
              animate={!still}
              className="text-[clamp(1.75rem,9.5vw,2.5rem)] text-balance sm:text-4xl lg:text-[clamp(2.5rem,4.8vw,3.25rem)]"
            >
              {item.title}
            </BracketTitle>
          </div>
          <div
            className={cn(
              "flex flex-wrap gap-2",
              stage(intro, hidden, shiftIn[200]),
            )}
          >
            <TagPair
              name={solutions.deliveryName}
              value={item.delivery}
              className={pairFit}
            />
            <TagPair
              name={solutions.scenariosName}
              value={item.scenarios}
              className={pairFit}
            />
          </div>
          <p
            className={cn(
              "max-w-prose text-lg leading-relaxed",
              stage(intro, hidden, shiftIn[300]),
            )}
          >
            {item.summary}
          </p>
        </div>
        {/* 能力清单是一整块，不逐行入场；按钮只淡入 */}
        <div ref={capsRef} className="flex flex-col gap-6">
          <div className={stage(caps, hidden, shiftIn[0])}>
            <h4 className="font-tech text-xs text-ink-secondary">
              <span aria-hidden="true">{"// "}</span>
              {solutions.capabilitiesHeading}
            </h4>
            <ol className="mt-3 border-b border-line">
              {item.capabilities.map((capability, index) => (
                <li
                  key={capability}
                  className="flex items-baseline gap-4 border-t border-line py-3"
                >
                  <span className="font-tech text-sm text-ink-secondary tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium">{capability}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className={stage(caps, hidden, fadeIn[200])}>
            <Button
              size="lg"
              href="#contact"
              onClick={() => onConsult(item.key)}
            >
              {solutions.consult}
            </Button>
          </div>
        </div>
      </div>

      {/* 编号和名字左边已经写了，取景框不再重复读数；手机上只留线稿，不要取景角 */}
      {/* 框一直在；取景角先落位（200ms），线稿随后点亮 */}
      <Viewfinder
        ref={frameRef}
        size="md"
        animate={frame === "playing"}
        className={cn(
          "grid aspect-square min-w-0 place-items-center border border-line bg-surface-raised max-md:[&>.corner-brackets]:hidden lg:aspect-auto",
          stage(frame, "staged:[&>.corner-brackets]:opacity-0", ""),
        )}
      >
        <IsoArt
          shapes={art[item.key]}
          className={cn("w-[62%] text-ink", artLight)}
        />
      </Viewfinder>
    </div>
  );
}

export function Solutions({
  value,
  onValueChange,
  onConsult,
}: {
  value: SolutionKey;
  onValueChange: (key: SolutionKey) => void;
  onConsult: (key: Need) => void;
}) {
  const { solutions } = useCopy();
  const listRef = useRef<HTMLDivElement>(null);
  const [headRef, head] = useReveal();
  const [tabsRef, tabs] = useReveal();
  const [moreRef, more] = useReveal();
  // 第一块面板播过之后，切过来的面板不再播（页签的规矩：新的那一块只淡入）
  const [played, setPlayed] = useState(false);
  const onPlay = useCallback(() => setPlayed(true), []);

  // 页签一行放不下时会横向滚动：从首屏停靠坞选了一条业务线，把它的页签滚进来
  useEffect(() => {
    const list = listRef.current;
    const tab = list?.querySelector<HTMLElement>(
      '[role="tab"][aria-selected="true"]',
    );
    if (!list || !tab) return;
    const left = tab.offsetLeft - list.offsetLeft;
    const right = left + tab.offsetWidth;
    if (left < list.scrollLeft) list.scrollTo({ left, behavior: "smooth" });
    else if (right > list.scrollLeft + list.clientWidth)
      list.scrollTo({ left: right - list.clientWidth, behavior: "smooth" });
  }, [value]);

  return (
    <section id="solutions" aria-label={solutions.title} className="bg-surface">
      <div className="mx-auto w-full max-w-page px-4 py-24 sm:px-6 lg:px-10">
        <div
          ref={headRef}
          className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6"
        >
          <SectionTitle
            latin="Solutions"
            meta={solutions.meta(solutions.items.length)}
            className="min-w-0"
          >
            {solutions.title}
          </SectionTitle>
          <p
            className={cn(
              "max-w-md text-ink-secondary",
              stage(head, hidden, shiftIn[300]),
            )}
          >
            {solutions.intro}
          </p>
        </div>

        <Tabs
          ref={tabsRef}
          value={value}
          onValueChange={(next) => onValueChange(next as SolutionKey)}
          className="mt-12"
        >
          <TabList
            ref={listRef}
            aria-label={solutions.tabsLabel}
            className={stage(tabs, hidden, fadeIn[200])}
          >
            {solutions.items.map((item) => (
              // 窄屏上用短名，三个页签才放得下（英文全名到 768px 才排得开）；完整的名字在下面的标题里
              <Tab key={item.key} value={item.key} className="max-md:px-5">
                <span className="md:hidden">{item.short}</span>
                <span className="hidden md:inline">{item.title}</span>
              </Tab>
            ))}
          </TabList>
          {solutions.items.map((item) => (
            <TabPanel
              key={item.key}
              value={item.key}
              className="border-t border-line"
            >
              <SolutionDetail
                item={item}
                onConsult={onConsult}
                still={played}
                onPlay={onPlay}
              />
            </TabPanel>
          ))}
        </Tabs>

        <div
          ref={moreRef}
          className="mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-line pt-6"
        >
          <p
            className={cn(
              "max-w-2xl text-ink-secondary",
              stage(more, hidden, shiftIn[0]),
            )}
          >
            {solutions.more}
          </p>
          <div className={stage(more, hidden, fadeIn[200])}>
            <Button
              variant="text"
              href="#contact"
              onClick={() => onConsult("other")}
            >
              {solutions.moreAction}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
