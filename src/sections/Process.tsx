/*
 * 合作流程：从深色版块回到白底，版块顶上一行被上沿截断的实心巨字（官网"玩法介绍"的排法）；
 * 五步横排，窄了折成两列、一列。
 */
import { GhostText, SectionTitle } from "@endfield-ui/react";
import { steps } from "../content.ts";

export function Process() {
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
        <GhostText
          variant="solid"
          className="absolute -top-[0.34em] left-4 hidden text-line md:block lg:left-10"
        >
          //ArkAI
        </GhostText>
      </div>

      <div className="relative mx-auto w-full max-w-page px-4 pt-20 pb-24 sm:px-6 md:pt-[calc(clamp(6rem,9vw,10rem)+clamp(1.5rem,3vw,3rem))] lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <SectionTitle
            latin="Process"
            meta={`// 合作流程　共 ${steps.length} 步`}
            className="min-w-0"
          >
            合作流程
          </SectionTitle>
          <p className="max-w-md text-ink-secondary">
            每一步结束都有能检查的产出，看过结果再决定下一步要不要做、怎么做。
          </p>
        </div>

        <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <li key={step.title} className="flex min-w-0 flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="font-display text-4xl leading-none font-extrabold tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {/* 步与步之间的接续：一条细线，最后一步没有 */}
                {index < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden h-px flex-1 bg-line-strong lg:block"
                  />
                )}
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-sm text-ink-secondary">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
