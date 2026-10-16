/*
 * 页面外壳：宽屏左缘一条导航轨，窄屏换成顶栏 + 全屏菜单；
 * 主舞台是一页长滚动，版块顺序和导航一致。
 */
import {
  BackToTop,
  IconButton,
  Menu,
  NavAction,
  NavMenu,
  NavMenuItem,
  SideRail,
  SideRailItem,
  TopBar,
  useTheme,
} from "@endfield-ui/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BrandMark } from "./Brand.tsx";
import {
  sections,
  type Need,
  type SectionId,
  type SolutionKey,
} from "./content.ts";
import { useActiveSection, useMediaQuery } from "./hooks.ts";
import {
  ApproachIcon,
  CasesIcon,
  ContrastIcon,
  FaqIcon,
  HomeIcon,
  MailIcon,
  ModulesIcon,
  ProcessIcon,
} from "./icons.tsx";
import { Approach } from "./sections/Approach.tsx";
import { Cases } from "./sections/Cases.tsx";
import { Contact } from "./sections/Contact.tsx";
import { Faq } from "./sections/Faq.tsx";
import { Footer } from "./sections/Footer.tsx";
import { Hero } from "./sections/Hero.tsx";
import { Process } from "./sections/Process.tsx";
import { Solutions } from "./sections/Solutions.tsx";

const icons: Record<SectionId, ReactNode> = {
  home: <HomeIcon />,
  solutions: <ModulesIcon />,
  approach: <ApproachIcon />,
  cases: <CasesIcon />,
  process: <ProcessIcon />,
  faq: <FaqIcon />,
  contact: <MailIcon />,
};

const sectionIds = sections.map((section) => section.id);

/*
 * 出现左侧导航轨的宽度：能悬停的设备从 1024px 起，触屏从 1280px 起
 * （触屏上轨一直带着文字，占 224px）。和 styles.css 里的 rail 变体是同一条
 */
const railQuery =
  "(min-width: 64rem) and (hover: hover) and (pointer: fine), (min-width: 80rem)";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  return (
    <IconButton
      aria-label={dark ? "切换到亮色" : "切换到暗色"}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      <ContrastIcon />
    </IconButton>
  );
}

export function App() {
  const active = useActiveSection(sectionIds);
  const wide = useMediaQuery(railQuery);
  // 能悬停的设备上导航轨收窄成只有图标（悬停时浮出文字），触屏上一直带着文字
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  // 不到 360px 宽时顶栏放不下主题切换，把它挪进全屏菜单
  const narrow = useMediaQuery("(max-width: 22.4375rem)");
  const [menuOpen, setMenuOpen] = useState(false);
  const [solution, setSolution] = useState<SolutionKey>("llm");
  const [need, setNeed] = useState<Need | null>(null);
  // 从全屏菜单里点了哪个版块：菜单关掉后把焦点送到那里
  const menuTarget = useRef<SectionId | null>(null);

  // 全屏菜单是挂在 body 上的弹层，顶栏藏起来它不会跟着藏：窗口拉宽到出现导航轨时关掉它
  useEffect(() => {
    if (wide) setMenuOpen(false);
  }, [wide]);

  /*
   * 菜单关掉时组件库会把焦点还给菜单按钮，下一次 Tab 就回到了页面顶上。
   * 等弹层真的移走、焦点还回去之后，再把焦点挪到刚才跳去的版块标题上
   */
  useEffect(() => {
    if (menuOpen || !menuTarget.current) return;
    const id = menuTarget.current;
    menuTarget.current = null;
    let timer = 0;
    const go = () => {
      const heading = document.querySelector<HTMLElement>(
        `#${id} :is(h1, h2):not([aria-hidden="true"] *)`,
      );
      if (!heading) return;
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    };
    const settle = () => {
      if (document.querySelector('[role="dialog"]')) return false;
      observer.disconnect();
      timer = window.setTimeout(go, 0);
      return true;
    };
    const observer = new MutationObserver(settle);
    if (!settle()) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [menuOpen]);

  const brand = (
    <a
      href="#home"
      aria-label="ArkAI 首页"
      className="inline-flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
    >
      <BrandMark compact={canHover} />
    </a>
  );

  const consult = (key: Need) => setNeed(key);

  return (
    <div className="flex min-h-dvh bg-surface text-ink">
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-2 focus-visible:left-2 focus-visible:z-(--z-toast) focus-visible:bg-surface-inverse focus-visible:px-3 focus-visible:py-2 focus-visible:text-sm focus-visible:text-ink-inverse"
      >
        跳到正文
      </a>

      <SideRail
        aria-label="主导航"
        collapsed={canHover}
        className="hidden rail:flex"
        brand={brand}
        tools={<ThemeToggle />}
        action={<NavAction href="#contact">预约咨询</NavAction>}
      >
        {sections.map((section) => (
          <SideRailItem
            key={section.id}
            icon={icons[section.id]}
            href={`#${section.id}`}
            current={active === section.id}
          >
            {section.label}
          </SideRailItem>
        ))}
      </SideRail>

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          className="rail:hidden"
          brand={
            <a
              href="#home"
              aria-label="ArkAI 首页"
              className="inline-flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <BrandMark />
            </a>
          }
          tools={narrow ? undefined : <ThemeToggle />}
          action={<NavAction href="#contact">预约咨询</NavAction>}
          menu={
            <NavMenu
              open={menuOpen}
              onOpenChange={setMenuOpen}
              title="ArkAI 导航"
              brand={<BrandMark />}
              ghost="ARKAI"
              tools={<ThemeToggle />}
              trigger={
                <IconButton aria-label="打开菜单">
                  <Menu />
                </IconButton>
              }
              footer={
                // 菜单项点了会自己关菜单，底下这个按钮不会：手动关上
                <NavAction
                  href="#contact"
                  onClick={() => {
                    menuTarget.current = "contact";
                    setMenuOpen(false);
                  }}
                >
                  预约咨询
                </NavAction>
              }
            >
              {sections.map((section) => (
                <NavMenuItem
                  key={section.id}
                  icon={icons[section.id]}
                  href={`#${section.id}`}
                  current={active === section.id}
                  onClick={() => {
                    menuTarget.current = section.id;
                  }}
                >
                  {section.label}
                </NavMenuItem>
              ))}
            </NavMenu>
          }
        />

        <main id="main" className="flex-1">
          <Hero onPickSolution={setSolution} />
          <Solutions
            value={solution}
            onValueChange={setSolution}
            onConsult={consult}
          />
          <Approach />
          <Cases />
          <Process />
          <Faq />
          <Contact need={need} onNeedChange={setNeed} />
        </main>
        <Footer />
      </div>

      <BackToTop />
    </div>
  );
}
