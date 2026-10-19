/*
 * 合作流程：从深色版块回到白底，版块顶上一行被上沿截断的实心巨字（官网"玩法介绍"的排法）；
 * 五步横排，窄了折成两列、一列。
 */
import { cn, GhostText, SectionTitle } from "@endfield-ui/react";
import type { Copy } from "../content.ts";
import { useCopy } from "../i18n.ts";
import {
  hidden,
  shiftIn,
  shiftInColumn,
  stage,
  useReveal,
  wipeIn,
} from "../reveal.ts";

type StepItem = Copy["process"]["steps"][number];

/*
 * 一步一个触发：宽屏上五步在同一排，一起触发、每列晚 75ms 依次到，
 * 接续的细线在下一步到的时候从起点充到头（300ms，同步骤条）；
 * 窄了两列、一列，各排各自进视口各自播
 */
function Step({
  step,
  index,
  last,
}: {
  step: StepItem;
  index: number;
  last: boolean;
}) {
  const [ref, phase] = useReveal<HTMLLIElement>();
  return (
    <li
      ref={ref}
      className={cn(
        "flex min-w-0 flex-col gap-3",
        "[--i:0] sm:even:[--i:1] lg:nth-2:[--i:1] lg:nth-3:[--i:2] lg:nth-4:[--i:3] lg:nth-5:[--i:4]",
        stage(phase, hidden, shiftInColumn),
      )}
    >
      <div className="flex items-center gap-3">
        <span className="font-display text-4xl leading-none font-extrabold tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* 步与步之间的接续：一条细线，最后一步没有 */}
        {!last && (
          <span
            aria-hidden="true"
            className={cn(
              "hidden h-px flex-1 bg-line-strong lg:block",
              stage(
                phase,
                "",
                "origin-left animate-fill [animation-duration:var(--duration-base)] [animation-delay:calc(var(--i,0)*75ms+75ms)]",
              ),
            )}
          />
        )}
      </div>
      <h3 className="text-xl font-bold">{step.title}</h3>
      <p className="text-sm text-ink-secondary">{step.text}</p>
    </li>
  );
}

export function Process() {
  const { process } = useCopy();
  const { steps } = process;
  const [ghostRef, ghost] = useReveal<HTMLSpanElement>();
  const [headRef, head] = useReveal();
  return (
    <section id="process" className="relative bg-surface">
      {/*
       * 裁切线放在版块上沿往下一截：巨字在白底上被切，不和上面的深色版块粘在一起。
       * 字用很浅的不透明色，压在标题下面一层
       */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[clamp(1.5rem,3vw,3rem)] bottom-0 overflow-clip"
      >
        {/* 巨字是这一版块的"色带"：较大面积，从左擦入 400ms */}
        <GhostText
          ref={ghostRef}
          variant="solid"
          className={cn(
            "absolute -top-[0.34em] left-4 hidden text-line md:block lg:left-10",
            stage(ghost, hidden, wipeIn.slow),
          )}
        >
          //ArkAI
        </GhostText>
      </div>

      <div className="relative mx-auto w-full max-w-page px-4 pt-20 pb-24 sm:px-6 md:pt-[calc(clamp(6rem,9vw,10rem)+clamp(1.5rem,3vw,3rem))] lg:px-10">
        <div
          ref={headRef}
          className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6"
        >
          <SectionTitle
            latin="Process"
            meta={process.meta(steps.length)}
            className="min-w-0"
          >
            {process.title}
          </SectionTitle>
          <p
            className={cn(
              "max-w-md text-ink-secondary",
              stage(head, hidden, shiftIn[300]),
            )}
          >
            {process.intro}
          </p>
        </div>

        <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            // 用位置当 key：换语言时不重挂，入场不重播
            <Step
              key={index}
              step={step}
              index={index}
              last={index === steps.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
