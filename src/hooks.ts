import { useEffect, useState, useSyncExternalStore } from "react";

/** 跟着一条媒体查询走 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * 当前滚到了哪个版块：顶端越过视口上三分之一的最后一个版块。
 * 滚到底时算最后一个（最后一个版块可能矮，顶端到不了那条线）。
 * 组件库的侧轨和全屏菜单不带这个，导航的"当前项"由它来算。
 */
export function useActiveSection<T extends string>(ids: readonly T[]) {
  const [active, setActive] = useState<T>(ids[0]!);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = window.innerHeight / 3;
      let current = ids[0]!;
      for (const id of ids) {
        const node = document.getElementById(id);
        if (node && node.getBoundingClientRect().top <= line) current = id;
      }
      const room = document.documentElement.scrollHeight - window.innerHeight;
      if (room > 0 && window.scrollY >= room - 2)
        current = ids[ids.length - 1]!;
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids]);

  return active;
}
