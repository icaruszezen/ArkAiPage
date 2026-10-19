/*
 * 页面外壳：宽屏左缘一条导航轨，窄屏换成顶栏 + 全屏菜单；
 * 主舞台是一页长滚动，版块顺序和导航一致。
 */
import {
  BackToTop,
  DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  IconButton,
  Menu,
  NavAction,
  NavMenu,
  NavMenuItem,
  SideRail,
  SideRailItem,
  TopBar,
  useTheme,
  type DropdownMenuAlign,
  type DropdownMenuSide,
} from "@endfield-ui/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BrandMark } from "./Brand.tsx";
import {
  sectionIds,
  type Need,
  type SectionId,
  type SolutionKey,
} from "./content.ts";
import { useActiveSection, useMediaQuery } from "./hooks.ts";
import {
  languages,
  matchLang,
  setLang,
  useCopy,
  useLang,
} from "./i18n.ts";
import {
  ApproachIcon,
  CasesIcon,
  ContrastIcon,
  FaqIcon,
  GlobeIcon,
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

/*
 * 出现左侧导航轨的宽度：能悬停的设备从 1024px 起，触屏从 1280px 起
 * （触屏上轨一直带着文字，占 224px）。和 styles.css 里的 rail 变体是同一条
 */
const railQuery =
  "(min-width: 64rem) and (hover: hover) and (pointer: fine), (min-width: 80rem)";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { ui } = useCopy();
  const dark = resolvedTheme === "dark";
  return (
    <IconButton
      aria-label={dark ? ui.toLight : ui.toDark}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      <ContrastIcon />
    </IconButton>
  );
}

/*
 * 语言菜单：钮上是一个地球，点开是各种语言的名字。
 * 名字用那种语言自己写，也按那种语言念（lang）：不认得当前这种语言的人也找得到自己的。
 * side / align 是面板出现在哪边：导航轨在左缘，往右开；顶栏在上面，往下开
 */
function LanguageMenu({
  side,
  align,
}: {
  side: DropdownMenuSide;
  align: DropdownMenuAlign;
}) {
  const lang = useLang();
  const { ui } = useCopy();
  const name = languages.find((item) => item.code === lang)?.name;
  return (
    <DropdownMenu
      variant="strong"
      side={side}
      align={align}
      trigger={
        <IconButton aria-label={`${ui.language}${ui.colon}${name}`}>
          <GlobeIcon />
        </IconButton>
      }
    >
      <DropdownMenuRadioGroup
        label={ui.language}
        value={lang}
        onValueChange={(value) => {
          const next = matchLang(value);
          if (next) setLang(next);
        }}
      >
        {languages.map((item) => (
          <DropdownMenuRadioItem
            key={item.code}
            value={item.code}
            lang={item.code}
          >
            {item.name}
          </DropdownMenuRadioItem>
        ))}
      </DropdownMenuRadioGroup>
    </DropdownMenu>
  );
}

export function App() {
  const t = useCopy();
  const active = useActiveSection(sectionIds);
  const wide = useMediaQuery(railQuery);
  // 能悬停的设备上导航轨收窄成只有图标（悬停时浮出文字），触屏上一直带着文字
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  // 顶栏放不下的工具挪进全屏菜单：不到 640px 先挪主题切换，不到 360px 语言菜单也挪走
  const roomy = useMediaQuery("(min-width: 40rem)");
  const narrow = useMediaQuery("(max-width: 22.4375rem)");
  // 收窄的导航轨在矮屏上（常见的 1366×657 笔记本视口以下）放不下竖排的咨询按钮
  const short = useMediaQuery("(max-height: 41.25rem)");
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
      aria-label={t.ui.homeLink}
      className="inline-flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
    >
      <BrandMark compact={canHover} />
    </a>
  );

  // 导航轨在左缘：菜单往右开，和按钮的下沿对齐（工具组在轨的下半截）
  const railTools = (
    <>
      <LanguageMenu side="right" align="end" />
      <ThemeToggle />
    </>
  );
  // 全屏菜单的工具带在栏目下面：往下开，左对齐
  const menuTools = (
    <>
      <LanguageMenu side="bottom" align="start" />
      <ThemeToggle />
    </>
  );
  // 顶栏在右上角：往下开，右对齐
  const barLanguage = <LanguageMenu side="bottom" align="end" />;

  const consult = (key: Need) => setNeed(key);

  return (
    <div className="flex min-h-dvh bg-surface text-ink">
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-2 focus-visible:left-2 focus-visible:z-(--z-toast) focus-visible:bg-surface-inverse focus-visible:px-3 focus-visible:py-2 focus-visible:text-sm focus-visible:text-ink-inverse"
      >
        {t.ui.skip}
      </a>

      <SideRail
        aria-label={t.ui.mainNav}
        collapsed={canHover}
        className="hidden rail:flex"
        brand={brand}
        tools={railTools}
        // 收窄的图标轨上竖排：用短的说法；屏幕矮就不放，导航里的"联系我们"去的是同一处
        action={
          canHover && short ? undefined : (
            <NavAction href="#contact">
              {canHover ? t.ui.consultShort : t.ui.consult}
            </NavAction>
          )
        }
      >
        {sectionIds.map((id) => (
          <SideRailItem
            key={id}
            icon={icons[id]}
            href={`#${id}`}
            current={active === id}
          >
            {t.nav[id]}
          </SideRailItem>
        ))}
      </SideRail>

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          className="rail:hidden"
          brand={
            <a
              href="#home"
              aria-label={t.ui.homeLink}
              className="inline-flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <BrandMark />
            </a>
          }
          tools={
            narrow ? undefined : roomy ? (
              <>
                {barLanguage}
                <ThemeToggle />
              </>
            ) : (
              barLanguage
            )
          }
          action={<NavAction href="#contact">{t.ui.consultShort}</NavAction>}
          menu={
            <NavMenu
              open={menuOpen}
              onOpenChange={setMenuOpen}
              title={t.ui.menuTitle}
              navLabel={t.ui.mainNav}
              closeLabel={t.ui.closeMenu}
              brand={<BrandMark />}
              ghost="ARKAI"
              tools={menuTools}
              trigger={
                <IconButton aria-label={t.ui.openMenu}>
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
                  {t.ui.consult}
                </NavAction>
              }
            >
              {sectionIds.map((id) => (
                <NavMenuItem
                  key={id}
                  icon={icons[id]}
                  href={`#${id}`}
                  current={active === id}
                  onClick={() => {
                    menuTarget.current = id;
                  }}
                >
                  {t.nav[id]}
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

      <BackToTop aria-label={t.ui.backToTop} />
    </div>
  );
}
