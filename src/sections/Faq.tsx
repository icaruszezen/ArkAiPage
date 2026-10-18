/*
 * 常见问题：标题和一句引导靠左，问答占右边的大部分。
 * 折叠的回答留在页面里（searchable），用浏览器的页内查找也能找到并展开。
 */
import {
  Accordion,
  AccordionItem,
  Button,
  SectionTitle,
} from "@endfield-ui/react";
import { useCopy } from "../i18n.ts";

export function Faq() {
  const { faq } = useCopy();
  return (
    <section id="faq" className="bg-surface">
      <div className="mx-auto grid w-full max-w-page gap-x-16 gap-y-10 px-4 py-24 sm:px-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.6fr)] lg:px-10">
        <div className="flex min-w-0 flex-col items-start gap-6">
          <SectionTitle latin="FAQ" meta={faq.meta(faq.items.length)}>
            {faq.title}
          </SectionTitle>
          <p className="text-ink-secondary">{faq.intro}</p>
          <Button variant="text" href="#contact">
            {faq.action}
          </Button>
        </div>
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
    </section>
  );
}
