/*
 * 点云球：一圈均匀分布在球面上的点（斐波那契球面），正投影到平面上。
 * 离观者近的点大而实，远的点小而淡，读起来是一个立体的球。
 * 静止的图，不做持续的转动；颜色跟着文字色走。
 */
import { useMemo } from "react";

type PointCloudProps = {
  /** 点的个数 */
  count?: number;
  className?: string;
};

const GOLDEN = Math.PI * (3 - Math.sqrt(5));
/* 绕两条轴各转一点，让赤道斜着，不像一张平面网格 */
const TILT_X = 0.42;
const TILT_Z = -0.3;

export function PointCloud({ count = 420, className }: PointCloudProps) {
  const dots = useMemo(() => {
    const list: { x: number; y: number; r: number; o: number }[] = [];
    for (let index = 0; index < count; index++) {
      const y = 1 - (index / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = GOLDEN * index;
      let px = Math.cos(theta) * radius;
      let py = y;
      let pz = Math.sin(theta) * radius;
      // 绕 x 轴
      [py, pz] = [
        py * Math.cos(TILT_X) - pz * Math.sin(TILT_X),
        py * Math.sin(TILT_X) + pz * Math.cos(TILT_X),
      ];
      // 绕 z 轴
      [px, py] = [
        px * Math.cos(TILT_Z) - py * Math.sin(TILT_Z),
        px * Math.sin(TILT_Z) + py * Math.cos(TILT_Z),
      ];
      const depth = (pz + 1) / 2; // 0 远，1 近
      list.push({
        x: 100 + px * 92,
        y: 100 + py * 92,
        r: 0.7 + depth * 1.3,
        o: 0.18 + depth * 0.82,
      });
    }
    // 远的先画，近的盖在上面
    return list.sort((a, b) => a.o - b.o);
  }, [count]);

  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {dots.map((dot, index) => (
        <circle
          key={index}
          cx={dot.x.toFixed(2)}
          cy={dot.y.toFixed(2)}
          r={dot.r.toFixed(2)}
          fill="currentColor"
          fillOpacity={dot.o.toFixed(2)}
        />
      ))}
    </svg>
  );
}
