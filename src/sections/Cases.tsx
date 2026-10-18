/*
 * 应用场景：深色版块里的一组媒体轮播（官网"影像资料"的排法）。
 * 几类通用的落地场景，每一类配一张线稿。
 */
import {
  Carousel,
  CarouselSlide,
  List,
  ListRow,
  SectionTitle,
  Tag,
} from "@endfield-ui/react";
import { useLayoutEffect, useRef, useState } from "react";
import { IsoArt, type Shape } from "../art/iso.tsx";
import { chartArt, docsArt, shelfArt, visionArt } from "../art/scenes.ts";
import type { SolutionKey } from "../content.ts";
import { useCopy, useLang } from "../i18n.ts";

const art: Shape[][] = [visionArt, docsArt, shelfArt, chartArt];

export function Cases() {
  const lang = useLang();
  const { cases, solutions, ui } = useCopy();
  const { carousel } = ui;
  const [index, setIndex] = useState(0);
  const carouselRef = useRef<HTMLElement>(null);

  /* 涉及的业务线用和表单一样的短名，比如"大模型 + Agent" */
  const lineNames = (keys: SolutionKey[]) =>
    keys
      .map((key) => solutions.items.find((item) => item.key === key)?.short)
      .join(" + ");

  /*
   * 组件库的轮播把几处读屏文字写成了中文（"轮播""幻灯片""第 1 张，共 4 张"），
   * 没有对应的属性可传：这里按当前语言改写。
   * 这几个属性 React 不会再去改（值一直不变），所以只在换语言时改一遍；
   * 播报"第几张"的那一句换成标题里自己的一句，原来那句藏起来
   */
  useLayoutEffect(() => {
    const root = carouselRef.current;
    if (!root) return;
    root.setAttribute("aria-roledescription", carousel.label);
    const slides = root.querySelectorAll('[role="group"]');
    slides.forEach((slide, position) => {
      slide.setAttribute("aria-roledescription", carousel.slide);
      slide.setAttribute(
        "aria-label",
        carousel.place(position + 1, slides.length),
      );
    });
    root.querySelector("[aria-live] > .sr-only")?.setAttribute("hidden", "");
  }, [carousel]);

  return (
    <section
      id="cases"
      data-theme="dark"
      className="bg-surface-sunken text-ink"
    >
      <div className="mx-auto grid w-full max-w-page gap-x-12 gap-y-8 px-4 pb-24 [grid-template-areas:'head'_'media'_'list'] sm:px-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(17rem,0.8fr)] lg:grid-rows-[auto_1fr] lg:[grid-template-areas:'media_head'_'media_list'] lg:px-10">
        <div className="flex min-w-0 flex-col gap-6 [grid-area:head]">
          <SectionTitle latin="Use Cases" meta={cases.meta(cases.items.length)}>
            {cases.title}
          </SectionTitle>
          <p className="text-ink-secondary">{cases.intro}</p>
        </div>

        <List aria-label={cases.listLabel} className="min-w-0 [grid-area:list]">
          {cases.items.map((item, position) => (
            <ListRow
              key={position}
              selected={position === index}
              onClick={() => setIndex(position)}
              start={
                // 定宽：类别名长短不一，标题才能对齐在同一条竖线上
                <Tag
                  variant="muted"
                  size="sm"
                  className={`justify-center ${lang === "en" ? "w-18" : "w-15"}`}
                >
                  {item.tag}
                </Tag>
              }
              description={lineNames(item.solutions)}
            >
              {/* 组件库的行标题只排一行、放不下就截断：英文标题长，窄屏上让它折行 */}
              <span className="block whitespace-normal text-pretty">
                {item.title}
              </span>
            </ListRow>
          ))}
        </List>

        <Carousel
          ref={carouselRef}
          aria-label={cases.galleryLabel}
          previousLabel={carousel.previous}
          nextLabel={carousel.next}
          indicator
          index={index}
          onIndexChange={setIndex}
          className="min-w-0 [grid-area:media]"
        >
          {cases.items.map((item, position) => (
            // 用位置当 key：换语言时幻灯片不重新挂载，上面改过的读屏文字不会被冲掉
            <CarouselSlide
              key={position}
              title={
                <>
                  <span className="sr-only">
                    {carousel.place(position + 1, cases.items.length)}
                    {lang === "en" ? ": " : "："}
                  </span>
                  {cases.slideTitle(item.tag, item.title)}
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
