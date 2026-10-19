/*
 * 滚进视口时的入场：照组件库自己的写法（SectionTitle、CompletionBanner）——
 * useInView 管触发，没进视口时停在起点，进了播一次，滚走再回来不重播。
 *
 * 一组东西一个触发：一组不超过手机上的一屏高，矮的那一段先到的先播。
 * 比组件库多一个"播完"：播完之后撤掉所有动画类，后来重挂的（换语言、切页签）
 * 都是静止的；fill-mode 留下的 clip-path、transform 也一起撤掉。
 *
 * 起点只写在 staged: 变体里（styles.css）：只在屏幕上、没开"减少动态效果"时才藏，
 * 打印和减少动态效果天然就是终态。
 */
import { useInView, useReducedMotion } from "@endfield-ui/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type Phase = "pending" | "playing" | "settled";

/* 最长的一组从开始到停下 600ms；多留一截再撤动画类 */
const SETTLE_MS = 800;

/**
 * 一组入场的触发。ref 给这一组的外层（一直挂着、不会被换掉的那个节点），
 * phase 交给 stage() 换成类名。
 * - 减少动态效果：一开始就是 settled，没有等待态；
 * - 没有 IntersectionObserver：useInView 当场给 true，播完就 settled；
 * - 键盘把焦点送进还在等或正在播的一组：当场 settled，不让焦点落在透明的东西上；
 * - disabled：不播（切过来的页签面板）。
 * 一旦 settled 就不再变回去。
 * rootMargin、threshold 原样交给 useInView，默认是一露头就播（同 SectionTitle）。
 */
export function useReveal<T extends Element = HTMLDivElement>({
  disabled = false,
  rootMargin,
  threshold,
}: { disabled?: boolean; rootMargin?: string; threshold?: number } = {}) {
  const reduced = useReducedMotion();
  const [settled, setSettled] = useState(disabled || reduced);
  const [ref, inView] = useInView<T>({
    disabled: settled,
    rootMargin,
    threshold,
  });

  useEffect(() => {
    if ((disabled || reduced) && !settled) setSettled(true);
  }, [disabled, reduced, settled]);

  useEffect(() => {
    const node = ref.current;
    if (!node || settled) return;
    const finish = () => setSettled(true);
    node.addEventListener("focusin", finish);
    return () => node.removeEventListener("focusin", finish);
  }, [ref, settled]);

  useEffect(() => {
    if (!inView || settled) return;
    const timer = window.setTimeout(() => setSettled(true), SETTLE_MS);
    return () => window.clearTimeout(timer);
  }, [inView, settled]);

  const phase: Phase =
    settled || reduced ? "settled" : inView ? "playing" : "pending";
  return [ref, phase] as const;
}

/** 等待时用 from，播的时候用 play，播完什么都不加 */
export const stage = (phase: Phase, from: string, play: string) =>
  phase === "pending" ? from : phase === "playing" ? play : undefined;

/*
 * —— 起点 ——
 * 一律只用透明。擦入的也是：播的那一刻，擦入关键帧的第一帧自己就是裁掉的。
 * 不要把起点写成被观察的那个节点自己的 clip-path——Chromium 的 IntersectionObserver
 * 会把目标自己的裁切算进去，裁成零宽的目标可能永远算不上"进了视口"，就一直藏着
 */
export const hidden = "staged:opacity-0";

/*
 * —— 版块中段的大图 ——
 * 主图在一个高的容器里居中：一露头就播的话，图还在屏幕下面就播完了。
 * 这几组等容器顶边过了视口高度的 60% 再播。只给版块中段的用：
 * 挨着页面底部的（页脚、联系区）可能永远到不了这条线，会一直藏着
 */
export const midPage = { rootMargin: "0px 0px -40% 0px" } as const;

/*
 * —— 播的时候 ——
 * 类名都写全：Tailwind 只认源码里原样出现的类名，拼出来的它看不见。
 * 节拍：0 色带、取景、主图；200 控件和色带上的字；300 标题旁的说明
 */
const shift = "animate-shift-in [--shift-x:calc(var(--motion-shift-lg)*-1)]";
/** 文字：从左 8px 淡入归位，300ms */
export const shiftIn = {
  0: shift,
  200: `${shift} [animation-delay:200ms]`,
  300: `${shift} [animation-delay:300ms]`,
} as const;
/** 能点的东西：只跟着所在的那一块淡入，300ms */
export const fadeIn = {
  100: "animate-fade-in [animation-delay:100ms]",
  200: "animate-fade-in [animation-delay:200ms]",
  300: "animate-fade-in [animation-delay:300ms]",
} as const;
/** 色带、色条、巨字：从左擦入 */
export const wipeIn = {
  base: "animate-wipe-in",
  slow: "animate-wipe-in [animation-duration:var(--duration-slow)]",
  slower: "animate-wipe-in [animation-duration:var(--duration-slower)]",
} as const;
/**
 * 一排里的第几列（--i，写在每一项自己身上）晚 75ms：同一排的一起触发、依次到；
 * 手机上一项一行，各自进视口各自播，都从 0 起
 */
export const shiftInColumn = `${shift} [animation-delay:calc(var(--i,0)*75ms)]`;

/*
 * 主图点亮：同一时间只让一处闪烁。前一次闪烁开始后 1 秒之内又有主图进来，
 * 它改成淡入——一秒之内不超过三次闪
 */
const FLICKER_GAP_MS = 1000;
let flickerFree = 0;

export function useLightUp(phase: Phase) {
  const [kind, setKind] = useState<"flicker" | "fade">("flicker");
  const claimed = useRef(false);
  useLayoutEffect(() => {
    if (phase !== "playing" || claimed.current) return;
    claimed.current = true;
    const now = performance.now();
    if (now < flickerFree) setKind("fade");
    else flickerFree = now + FLICKER_GAP_MS;
  }, [phase]);
  return stage(
    phase,
    hidden,
    kind === "flicker" ? "animate-flicker" : "animate-fade-in",
  );
}
