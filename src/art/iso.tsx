/*
 * 等距线稿：页面上的插图都由这里的长方块拼出来。
 * 规格照组件库的图像规范：等距视角、统一 1.5px 线宽、圆角接头、面是白的（页面底色），
 * 至多一处信号黄；不用阴影、渐变和灰阶。线和面的颜色都跟着主题走。
 *
 * 坐标：x 往右下、y 往左下、z 往上，单位是任意的"格"。
 * 一张图是一串图元，按从后到前的顺序排；画面范围由图元自己算出来。
 */
import { cn } from "@endfield-ui/react";

type Point3 = [number, number, number];
type Face = "top" | "left" | "right";

export type Shape =
  | {
      kind: "box";
      /** 起点（离观者最远的那个角） */
      at: Point3;
      /** 沿 x、y、z 的尺寸 */
      size: Point3;
      /** 涂成信号黄的那一面 */
      accent?: Face;
    }
  | {
      kind: "line";
      from: Point3;
      to: Point3;
      dashed?: boolean;
      /** 画在信号黄的面上：用黄底上的墨色，暗色主题下也看得清 */
      onAccent?: boolean;
    }
  | {
      kind: "label";
      at: Point3;
      text: string;
      /** 文字从这一点往哪边排 */
      anchor?: "start" | "end";
    };

const COS = Math.cos(Math.PI / 6);

/** 三维点投到画面上 */
function iso([x, y, z]: Point3): [number, number] {
  return [(x - y) * COS, (x + y) * 0.5 - z];
}

function polygon(list: Point3[]) {
  return list
    .map((point) =>
      iso(point)
        .map((n) => n.toFixed(2))
        .join(","),
    )
    .join(" ");
}

function boxFaces(at: Point3, size: Point3) {
  const [x, y, z] = at;
  const [w, d, h] = size;
  return {
    top: [
      [x, y, z + h],
      [x + w, y, z + h],
      [x + w, y + d, z + h],
      [x, y + d, z + h],
    ] as Point3[],
    right: [
      [x + w, y, z],
      [x + w, y + d, z],
      [x + w, y + d, z + h],
      [x + w, y, z + h],
    ] as Point3[],
    left: [
      [x, y + d, z],
      [x + w, y + d, z],
      [x + w, y + d, z + h],
      [x, y + d, z + h],
    ] as Point3[],
  };
}

/* 标注文字每个字符的估算宽度（字号的倍数），用来把文字也算进画面范围 */
const LABEL_ADVANCE = 0.56;

function bounds(shapes: Shape[], padding: number, labelSize: number) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const add = ([px, py]: [number, number]) => {
    minX = Math.min(minX, px);
    maxX = Math.max(maxX, px);
    minY = Math.min(minY, py);
    maxY = Math.max(maxY, py);
  };
  for (const shape of shapes) {
    if (shape.kind === "box") {
      const faces = boxFaces(shape.at, shape.size);
      for (const point of [...faces.top, ...faces.left, ...faces.right]) {
        add(iso(point));
      }
    } else if (shape.kind === "line") {
      add(iso(shape.from));
      add(iso(shape.to));
    } else {
      const [px, py] = iso(shape.at);
      const width = shape.text.length * LABEL_ADVANCE * labelSize;
      add([px, py - labelSize]);
      add([shape.anchor === "end" ? px - width : px + width, py + 2]);
    }
  }
  return [
    minX - padding,
    minY - padding,
    maxX - minX + padding * 2,
    maxY - minY + padding * 2,
  ].map((n) => n.toFixed(2));
}

type IsoArtProps = {
  shapes: Shape[];
  className?: string;
  /** 画面四周留的空，画面坐标 */
  padding?: number;
  /**
   * 标注的字号，画面坐标。图会随容器缩放，字也跟着缩放：
   * 同一张图画得很大时把它调小，屏幕上的字才不会大成标题
   */
  labelSize?: number;
};

/**
 * 把一串图元画成一张 SVG。纯装饰，对辅助技术隐藏；
 * 线宽不随缩放变（non-scaling-stroke），大图小图都是 1.5px。
 */
export function IsoArt({
  shapes,
  className,
  padding = 8,
  labelSize = 10,
}: IsoArtProps) {
  return (
    <svg
      viewBox={bounds(shapes, padding, labelSize).join(" ")}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      className={cn(
        "pointer-events-none select-none [&_*]:[vector-effect:non-scaling-stroke]",
        className,
      )}
    >
      {shapes.map((shape, index) => {
        if (shape.kind === "box") {
          const faces = boxFaces(shape.at, shape.size);
          return (
            <g key={index}>
              {(["left", "right", "top"] as const).map((face) => (
                <polygon
                  key={face}
                  points={polygon(faces[face])}
                  className={
                    // 黄面的轮廓用黄底上的墨色：暗色主题下白线压在黄面上看不清
                    shape.accent === face
                      ? "fill-action stroke-on-action"
                      : "fill-surface"
                  }
                />
              ))}
            </g>
          );
        }
        if (shape.kind === "line") {
          const [x1, y1] = iso(shape.from);
          const [x2, y2] = iso(shape.to);
          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              strokeDasharray={shape.dashed ? "3 4" : undefined}
              className={shape.onAccent ? "stroke-on-action" : undefined}
            />
          );
        }
        const [px, py] = iso(shape.at);
        return (
          <text
            key={index}
            x={px}
            y={py}
            textAnchor={shape.anchor ?? "start"}
            stroke="none"
            className="fill-current font-tech"
            style={{ fontSize: labelSize, letterSpacing: "0.05em" }}
          >
            {shape.text}
          </text>
        );
      })}
    </svg>
  );
}
