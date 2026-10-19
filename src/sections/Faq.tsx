/*
 * 常见问题：标题和一句引导靠左，问答占右边的大部分。
 * 折叠的回答留在页面里（searchable），用浏览器的页内查找也能找到并展开。
 */
import {
  Accordion,
  AccordionItem,
  Button,
  cn,
  SectionTitle,
} from "@endfield-ui/react";
import { useCopy } from "../i18n.ts";
import { fadeIn, hidden, shiftIn, stage, useReveal } from "../reveal.ts";

export function Faq() {
  const { faq } = useCopy();
  const [headRef, head] = useReveal();
  const [listRef, list] = useReveal();
  return (
    <section id="faq" className="bg-surface">
      <div className="mx-auto grid w-full max-w-page gap-x-16 gap-y-10 px-4 py-24 sm:px-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.6fr)] lg:px-10">
        <div ref={headRef} className="flex min-w-0 flex-col items-start gap-6">
          <SectionTitle latin="FAQ" meta={faq.meta(faq.items.length)}>
            {faq.title}
          </SectionTitle>
          <p
            className={cn(
              "text-ink-secondary",
              stage(head, hidden, shiftIn[300]),
            )}
          >
            {faq.intro}
          </p>
          {/* 按钮跟着上面那段说明一起到，只淡入 */}
          <div className={stage(head, hidden, fadeIn[300])}>
            <Button variant="text" href="#contact">
              {faq.action}
            </Button>
          </div>
        </div>
        {/* 问答全是可以点的：整块淡入 */}
        <div
          ref={listRef}
          className={cn("min-w-0", stage(list, hidden, fadeIn[200]))}
        >
          <Accordion searchable defaultValue={["q0"]} className="min-w-0">
            {faq.items.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`q${index}`}
                title={item.question}
              >
                <p className="max-w-prose text-ink-secondary">{item.answer}</p>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
