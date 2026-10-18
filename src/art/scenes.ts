/*
 * 页面上用到的几张等距线稿。都是原创的示意图，不是产品截图。
 * 每张图一串图元，从后往前排（后画的盖住先画的）。
 */
import type { Shape } from "./iso.tsx";

type Point3 = [number, number, number];

const box = (
  at: Point3,
  size: Point3,
  accent?: "top" | "left" | "right",
): Shape => ({ kind: "box", at, size, accent });

const line = (
  from: Point3,
  to: Point3,
  dashed = false,
  onAccent = false,
): Shape => ({ kind: "line", from, to, dashed, onAccent });

const label = (
  at: Point3,
  text: string,
  anchor: "start" | "end" = "start",
): Shape => ({ kind: "label", at, text, anchor });

/* ------------------------------------------------------------------ */
/* 首屏：三层的台子，自下而上对应三条业务线，顶上是几个连在一起的节点     */
/* ------------------------------------------------------------------ */

const SLAB = 96;
const SLAB_H = 12;
const GAP = 34;

function slabLevel(level: number): Shape[] {
  const z = level * (SLAB_H + GAP);
  const shapes: Shape[] = [];
  // 和下一层之间的四根虚线立柱（只画看得见的三根）
  if (level > 0) {
    const from = z - GAP;
    for (const [x, y] of [
      [SLAB, 0],
      [SLAB, SLAB],
      [0, SLAB],
    ] as const) {
      shapes.push(line([x, y, from], [x, y, z], true));
    }
  }
  shapes.push(box([0, 0, z], [SLAB, SLAB, SLAB_H]));
  return shapes;
}

/*
 * 每层左侧引出一条横线，写上编号和名字（和页面上的三条业务线对应）。
 * 标注朝左、朝着标题那一边：宽屏上图的右缘被版面切掉，标注不受影响
 */
function slabLabel(level: number, text: string): Shape[] {
  const z = level * (SLAB_H + GAP) + SLAB_H / 2;
  const start: Point3 = [18, SLAB, z];
  const end: Point3 = [18 - 26, SLAB + 26, z];
  return [line(start, end), label([18 - 30, SLAB + 30, z - 3.5], text, "end")];
}

const topZ = 2 * (SLAB_H + GAP) + SLAB_H;
const nodes: Point3[] = [
  [14, 18, topZ],
  [58, 14, topZ],
  [26, 60, topZ],
  [64, 58, topZ],
];
const NODE = 12;
const center = ([x, y, z]: Point3): Point3 => [x + NODE / 2, y + NODE / 2, z];

/** 首屏主图，不带标注（手机上图小，标注的字会小到看不清） */
export const heroStackBare: Shape[] = [
  ...slabLevel(0),
  ...slabLevel(1),
  ...slabLevel(2),
  // 顶层上的连线先画，节点盖在线的两头上
  line(center(nodes[0]!), center(nodes[1]!)),
  line(center(nodes[0]!), center(nodes[2]!)),
  line(center(nodes[1]!), center(nodes[3]!)),
  line(center(nodes[2]!), center(nodes[3]!)),
  line(center(nodes[0]!), center(nodes[3]!)),
  ...nodes.map((at, index) =>
    box(
      at,
      [NODE, NODE, index === 3 ? NODE * 1.6 : NODE],
      index === 3 ? "top" : undefined,
    ),
  ),
];

/** 首屏主图，带三层的标注 */
export const heroStack: Shape[] = [
  ...heroStackBare,
  ...slabLabel(0, "01 / LLM"),
  ...slabLabel(1, "02 / AGENT"),
  ...slabLabel(2, "03 / VISION"),
];

/* ------------------------------------------------------------------ */
/* 三条业务线各一张                                                     */
/* ------------------------------------------------------------------ */

/** 大模型服务：一摞薄层（模型的层），中间一根虚线贯穿 */
export const llmArt: Shape[] = (() => {
  const shapes: Shape[] = [];
  const layers = 6;
  for (let index = 0; index < layers; index++) {
    const z = index * 14;
    // 层与层之间：朝外的那个角上一根虚线（中间的会被上一层挡住）
    if (index > 0) {
      shapes.push(line([80, 80, z - 10], [80, 80, z], true));
    }
    shapes.push(
      box([0, 0, z], [80, 80, 4], index === layers - 1 ? "top" : undefined),
    );
  }
  // 旁边一台小服务器：推理的地方
  // 连线先画，服务器盖住它的一头
  shapes.push(line([80, 40, 30], [104, 40, 30], true));
  shapes.push(box([104, 20, 0], [28, 40, 44]));
  return shapes;
})();

/** Agent 设计：中间一个主控，四周四个工具，连线在地面上 */
export const agentArt: Shape[] = (() => {
  const hub: Point3 = [40, 40, 0];
  const HUB = 32;
  const TOOL = 18;
  const tools: Point3[] = [
    [0, 0, 0],
    [94, 4, 0],
    [4, 94, 0],
    [98, 98, 0],
  ];
  const hubCenter: Point3 = [hub[0] + HUB / 2, hub[1] + HUB / 2, 0];
  const shapes: Shape[] = tools.map((at) =>
    line(hubCenter, [at[0] + TOOL / 2, at[1] + TOOL / 2, 0], true),
  );
  // 从后往前：最远的工具、主控、两侧、最近的工具
  shapes.push(box(tools[0]!, [TOOL, TOOL, TOOL]));
  shapes.push(box(tools[1]!, [TOOL, TOOL, TOOL * 1.4]));
  shapes.push(box(tools[2]!, [TOOL, TOOL, TOOL * 0.8]));
  shapes.push(box(hub, [HUB, HUB, HUB], "top"));
  shapes.push(box(tools[3]!, [TOOL, TOOL, TOOL]));
  return shapes;
})();

/** 视觉方案：传送带上走过的工件，上方一台相机，虚线是它的视野 */
export const visionArt: Shape[] = (() => {
  const shapes: Shape[] = [];
  // 立柱在传送带后面
  shapes.push(box([66, 0, 0], [8, 8, 92]));
  shapes.push(box([0, 28, 0], [150, 34, 10]));
  const items: Point3[] = [
    [16, 36, 10],
    [64, 36, 10],
    [112, 36, 10],
  ];
  items.forEach((at, index) =>
    shapes.push(box(at, [18, 18, 18], index === 1 ? "top" : undefined)),
  );
  // 视野：相机底面四角到中间那个工件顶面四角。先画，
  // 相机画上去时盖住从它背面那个角出来的一段
  for (const [dx, dy] of [
    [0, 0],
    [16, 0],
    [16, 18],
    [0, 18],
  ] as const) {
    shapes.push(
      line(
        [62 + dx, 36 + dy, 66],
        [64 + (dx ? 18 : 0), 36 + (dy ? 18 : 0), 28],
        true,
      ),
    );
  }
  // 横臂和相机
  shapes.push(box([66, 8, 84], [8, 30, 8]));
  shapes.push(box([62, 36, 66], [16, 18, 16]));
  return shapes;
})();

/** 黄色色带上的小件：两块叠着的板 */
export const bandArt: Shape[] = [
  box([0, 0, 0], [44, 44, 10]),
  box([8, 8, 18], [28, 28, 10]),
  line([22, 22, 10], [22, 22, 18], true),
];

/* ------------------------------------------------------------------ */
/* 应用场景                                                           */
/* ------------------------------------------------------------------ */

/** 合规文档：一摞文件，最上面一张画着几行字 */
export const docsArt: Shape[] = (() => {
  const shapes: Shape[] = [];
  for (let index = 0; index < 5; index++) {
    shapes.push(
      box(
        [index * 3, -index * 3, index * 6],
        [60, 84, 2],
        index === 4 ? "top" : undefined,
      ),
    );
  }
  const top = 4 * 6 + 2;
  for (let row = 0; row < 4; row++) {
    const y = -12 + 14 + row * 14;
    // 字行画在黄色的那张上
    shapes.push(
      line([12 + 8, y, top], [12 + 48 - row * 6, y, top], false, true),
    );
  }
  return shapes;
})();

/** 知识库：一面方格架子，一格亮着 */
export const shelfArt: Shape[] = (() => {
  const shapes: Shape[] = [];
  const CELL = 24;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      shapes.push(
        box(
          [col * CELL, 0, row * CELL],
          [CELL, CELL, CELL],
          row === 1 && col === 2 ? "left" : undefined,
        ),
      );
    }
  }
  return shapes;
})();

/** 数据分析：一块底板上几根高低不一的柱子 */
export const chartArt: Shape[] = (() => {
  const heights = [22, 38, 30, 56, 44];
  const shapes: Shape[] = [box([0, 0, 0], [118, 34, 4])];
  heights.forEach((h, index) =>
    shapes.push(
      box(
        [8 + index * 22, 10, 4],
        [14, 14, h],
        index === 3 ? "top" : undefined,
      ),
    ),
  );
  return shapes;
})();
