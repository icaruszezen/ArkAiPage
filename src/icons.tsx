/*
 * 站点自己的图标：照组件库的图标规格画——24 网格、2px 描边、平头尖角、
 * 线条以 0° / 45° / 90° 为主。纯装饰，默认对辅助技术隐藏（createIcon 自带）。
 */
import { createIcon } from "@endfield-ui/react";

/** 首页：一座房子 */
export const HomeIcon = createIcon(
  "HomeIcon",
  <path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z" />,
);

/** 解决方案：四块模组 */
export const ModulesIcon = createIcon(
  "ModulesIcon",
  <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
);

/** 方法：一枚罗盘似的准星 */
export const ApproachIcon = createIcon(
  "ApproachIcon",
  <>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 2v5M12 17v5M2 12h5M17 12h5" />
  </>,
);

/** 应用场景：公文包 */
export const CasesIcon = createIcon(
  "CasesIcon",
  <path d="M3 7h18v13H3zM8 7V4h8v3M3 12h18" />,
);

/** 合作流程：一级一级的台阶 */
export const ProcessIcon = createIcon(
  "ProcessIcon",
  <path d="M3 20h6v-6h6V8h6V3" />,
);

/** 常见问题：对话框 */
export const FaqIcon = createIcon(
  "FaqIcon",
  <path d="M3 4h18v12H10l-4 4v-4H3zM8 10h8" />,
);

/** 联系我们：信封 */
export const MailIcon = createIcon(
  "MailIcon",
  <path d="M3 5h18v14H3zM3 5l9 7 9-7" />,
);

/** 亮暗切换：一个圆，右半边实心 */
export const ContrastIcon = createIcon(
  "ContrastIcon",
  <>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" stroke="none" />
  </>,
);

/** 语言：一个地球，两段圆弧拼成的经线和一条赤道（圆弧分开画，两极不起尖） */
export const GlobeIcon = createIcon(
  "GlobeIcon",
  <>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 4a10 10 0 0 0 0 16M12 4a10 10 0 0 1 0 16M4 12h16" />
  </>,
);
