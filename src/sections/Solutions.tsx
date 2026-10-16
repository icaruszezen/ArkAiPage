/*
 * 解决方案：照官网"干员情报"的排法，一次看一条业务线——
 * 左边是名称、标签对、简介和能力清单，右边是这条线的线稿，占一大块。
 */
import {
  BracketTitle,
  Button,
  SectionTitle,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TagPair,
  Viewfinder,
} from "@endfield-ui/react";
import { useEffect, useRef } from "react";
import { IsoArt, type Shape } from "../art/iso.tsx";
import { agentArt, llmArt, visionArt } from "../art/scenes.ts";
import {
  moreSolutions,
  solutions,
  type Need,
  type Solution,
  type SolutionKey,
} from "../content.ts";

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
}: {
  item: Solution;
  onConsult: (key: Need) => void;
}) {
  return (
    <div className="grid gap-x-12 gap-y-10 pt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <div className="flex min-w-0 flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p className="font-tech text-xs text-ink-secondary">
            {`${item.code} / ${String(solutions.length).padStart(2, "0")}　${item.latin.toUpperCase()}`}
          </p>
          <BracketTitle className="text-[clamp(1.75rem,9.5vw,2.5rem)] text-balance sm:text-4xl lg:text-[clamp(2.5rem,4.8vw,3.25rem)]">
            {item.title}
          </BracketTitle>
        </div>
        <div className="flex flex-wrap gap-2">
          <TagPair name="交付形式" value={item.delivery} className={pairFit} />
          <TagPair name="典型场景" value={item.scenarios} className={pairFit} />
        </div>
        <p className="max-w-prose text-lg leading-relaxed">{item.summary}</p>
        <div>
          <h4 className="font-tech text-xs text-ink-secondary">
            <span aria-hidden="true">{"// "}</span>能做什么
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
        <div>
          <Button size="lg" href="#contact" onClick={() => onConsult(item.key)}>
            咨询这个方向
          </Button>
        </div>
      </div>

      {/* 编号和名字左边已经写了，取景框不再重复读数；手机上只留线稿，不要取景角 */}
      <Viewfinder
        size="md"
        className="grid aspect-square min-w-0 place-items-center border border-line bg-surface-raised max-md:[&>.corner-brackets]:hidden lg:aspect-auto"
      >
        <IsoArt shapes={art[item.key]} className="w-[62%] text-ink" />
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
  const listRef = useRef<HTMLDivElement>(null);

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
    <section id="solutions" aria-label="解决方案" className="bg-surface">
      <div className="mx-auto w-full max-w-page px-4 py-24 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <SectionTitle
            latin="Solutions"
            meta={`// 解决方案　共 ${solutions.length} 条业务线`}
            className="min-w-0"
          >
            解决方案
          </SectionTitle>
          <p className="max-w-md text-ink-secondary">
            面向企业的 AI 解决方案，目前覆盖下面三个方向。
          </p>
        </div>

        <Tabs
          value={value}
          onValueChange={(next) => onValueChange(next as SolutionKey)}
          className="mt-12"
        >
          <TabList ref={listRef} aria-label="业务方向">
            {solutions.map((item) => (
              // 手机上用短名，三个页签才放得下；完整的名字在下面的标题里
              <Tab key={item.key} value={item.key} className="max-sm:px-5">
                <span className="sm:hidden">{item.short}</span>
                <span className="hidden sm:inline">{item.title}</span>
              </Tab>
            ))}
          </TabList>
          {solutions.map((item) => (
            <TabPanel
              key={item.key}
              value={item.key}
              className="border-t border-line"
            >
              <SolutionDetail item={item} onConsult={onConsult} />
            </TabPanel>
          ))}
        </Tabs>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-line pt-6">
          <p className="max-w-2xl text-ink-secondary">{moreSolutions}</p>
          <Button
            variant="text"
            href="#contact"
            onClick={() => onConsult("other")}
          >
            聊聊你的需求
          </Button>
        </div>
      </div>
    </section>
  );
}
