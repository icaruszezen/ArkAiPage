/*
 * 应用场景：深色版块里的一组媒体轮播（官网"影像资料"的排法）。
 * 真实的客户案例还没有，这里是几类典型场景的示意，页面上标明"示例"。
 */
import {
  Carousel,
  CarouselSlide,
  List,
  ListRow,
  SectionTitle,
  Tag,
} from "@endfield-ui/react";
import { useState } from "react";
import { IsoArt, type Shape } from "../art/iso.tsx";
import { chartArt, docsArt, shelfArt, visionArt } from "../art/scenes.ts";
import { cases, needs } from "../content.ts";

const art: Shape[][] = [visionArt, docsArt, shelfArt, chartArt];

/* 涉及的业务线用和表单一样的短名，比如"大模型 + Agent" */
const lineNames = (keys: (typeof cases)[number]["solutions"]) =>
  keys
    .map((key) => needs.find((item) => item.value === key)?.label)
    .join(" + ");

export function Cases() {
  const [index, setIndex] = useState(0);

  return (
    <section
      id="cases"
      data-theme="dark"
      className="bg-surface-sunken text-ink"
    >
      <div className="mx-auto grid w-full max-w-page gap-x-12 gap-y-8 px-4 pb-24 [grid-template-areas:'head'_'media'_'list'] sm:px-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(17rem,0.8fr)] lg:grid-rows-[auto_1fr] lg:[grid-template-areas:'media_head'_'media_list'] lg:px-10">
        <div className="flex min-w-0 flex-col gap-6 [grid-area:head]">
          <SectionTitle
            latin="Cases"
            meta={`// 应用场景　示例 ${cases.length} 个`}
          >
            应用场景
          </SectionTitle>
          <p className="text-ink-secondary">
            几类常见的落地场景，用来说明每条业务线能做什么。以下均为示例，并非具体客户项目。
          </p>
        </div>

        <List aria-label="应用场景" className="min-w-0 [grid-area:list]">
          {cases.map((item, position) => (
            <ListRow
              key={item.title}
              selected={position === index}
              onClick={() => setIndex(position)}
              start={
                // 定宽：行业名长短不一，标题才能对齐在同一条竖线上
                <Tag variant="muted" size="sm" className="w-15 justify-center">
                  {item.industry}
                </Tag>
              }
              description={lineNames(item.solutions)}
            >
              {item.title}
            </ListRow>
          ))}
        </List>

        <Carousel
          aria-label="应用场景示例"
          indicator
          index={index}
          onIndexChange={setIndex}
          className="min-w-0 [grid-area:media]"
        >
          {cases.map((item, position) => (
            <CarouselSlide
              key={item.title}
              title={
                <>
                  {`${item.industry}　${item.title}`}
                  <Tag
                    variant="outline"
                    size="sm"
                    className="ml-3 align-middle"
                  >
                    示例
                  </Tag>
                </>
              }
              description={item.text}
            >
              <div className="relative grid place-items-center bg-surface">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 dot-grid [--dot-gap:22px]"
                />
                <IsoArt
                  shapes={art[position]!}
                  className="relative h-[58%] w-auto text-ink"
                />
              </div>
            </CarouselSlide>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
