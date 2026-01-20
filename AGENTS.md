# AGENTS.md

你是 React、TypeScript、Ant Design 和组件库开发方面的专家。你专长于使用 hooks 架构创建可复用的 UI 组件。

## 项目概览

这是一个基于以下技术构建的 React 组件库：
- **核心技术**: React 19.2.3, TypeScript 5.9.3
- **UI 框架**: Ant Design 6.2.0 配备 @ant-design/icons 6.1.0
- **构建工具**: Rslib 0.19.2, Rsbuild 1.7.1, Rspack (通过 @rsbuild/plugin-react 1.4.2)
- **测试工具**: Rstest 0.7.9 配备 @testing-library/react 16.3.1
- **代码质量**: Biome 2.3.8 (代码检查和格式化)
- **文档工具**: Storybook 10.1.11 配备 storybook-react-rsbuild 3.2.0
- **虚拟滚动**: rc-virtual-list 3.19.2

## 包信息

- **名称**: antd-wp (二次封装 antd)
- **版本**: 0.0.1
- **作者**: soonlee <soonlee113@163.com>
- **仓库**: https://gitee.com/uxy-ui/antd-wp.git
- **主页**: http://static.diamater.top/storybook/antd-wp/index.html
- **许可证**: MIT
- **模块类型**: ES Module

## 核心命令

- `npm run build` - 使用 Rslib 构建生产版本的库（输出到 dist/ 目录）
- `npm run dev` - 启动开发模式，带监听和自动重新构建功能
- `npm run storybook` - 启动 Storybook 开发服务器（localhost）
- `npm run build:storybook` - 构建静态 Storybook 文档
- `npm run test` - 使用 Rstest 和 happy-dom 环境运行测试
- `npm run check` - 使用 Biome 检查并修复代码问题
- `npm run format` - 使用 Biome 格式化代码

## 文档资源

- **Rslib**: https://rslib.rs/llms.txt
- **Rsbuild**: https://rsbuild.rs/llms.txt
- **Rspack**: https://rspack.rs/llms.txt
- **Ant Design**: https://ant.design/
- **React**: https://react.dev/
- **Storybook**: https://storybook.js.org/

## 开发工具

### 测试工具 (Rstest)
- 运行 `npm run test` 执行单元测试
- 测试文件位于 `tests/` 目录
- 使用 TypeScript 实现类型安全的测试
- 基于 happy-dom 提供 DOM 模拟环境
- 集成 @testing-library/react 提供 React 测试工具

### 组件文档 (Storybook)
- 运行 `npm run storybook` 启动交互式组件文档
- 故事文件位于 `stories/` 目录
- 组件按类别组织：数据(Data)、布局(Layout)、小组件(Widget)
- 使用 storybook-react-rsbuild 实现 Rsbuild 集成
- 包含 storybook-addon-rslib 支持 Rslib 兼容性

### 代码质量 (Biome)
- 运行 `npm run check` 检查并自动修复代码问题
- 运行 `npm run format` 自动格式化代码
- 配置文件位于 `biome.json`
- 替代传统的 ESLint/Prettier 方案

## 项目结构

```
src/
├── datas/          # 数据展示组件
│   ├── enhance-table/  # 增强表格，支持过滤、排序、展开
│   └── grid-form/      # 基于网格的表单布局系统
├── layouts/        # 布局组件
│   └── work-bench/     # 工作台布局，支持网格区域
├── utils/          # 工具函数
└── widgets/        # 小型 UI 组件
    └── text-tag/       # 标签组件，支持自动着色

stories/            # Storybook 故事文件
├── data/           # 数据组件故事
├── layout/         # 布局组件故事
└── widget/         # 小组件故事

tests/              # 单元测试
dist/               # 构建输出的库文件（ESM 格式）
```

## 构建配置 (rslib.config.ts)

```typescript
import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: ['./src/**'],  // 打包所有 src 文件
    },
  },
  lib: [
    {
      bundle: false,        // 输出独立模块
      dts: true,           // 生成 TypeScript 声明文件
      format: 'esm',       // ES Module 格式
    },
  ],
  output: {
    target: 'web',         // Web 目标
  },
  plugins: [pluginReact()], // React 支持
});
```

## 组件架构

组件遵循一致的设计模式：

1. **类型定义** (`*Type.tsx`) - 接口和类型定义
2. **主组件** (`*.tsx`) - React 组件实现
3. **自定义 Hooks** (`*Hook.tsx`) - 使用 React hooks 分离逻辑
4. **小组件/工具** (`*Widgets.tsx`) - 辅助组件
5. **索引导出** (`index.ts`) - 桶导出文件

## 核心组件

### EnhanceTable（增强表格）
- 高级 Ant Design Table 封装组件
- 内置过滤、排序和展开功能
- 通过 rc-virtual-list 支持虚拟滚动
- 自定义列过滤器，支持可搜索下拉框
- 行选择和分页功能
- 可展开行，支持自定义渲染

### GridForm（网格表单）
- 基于网格的表单布局系统
- 24列网格，类似于 Ant Design 的栅格系统
- 支持所有 Ant Design 表单组件
- 内置表单验证功能
- 灵活的行列定位

### WorkBench（工作台）
- 基于 CSS Grid 的布局系统
- 可配置的网格区域（root, nav, home, menu, path, main, toggle, footer）
- 可自定义尺寸和模板区域
- 响应式设计就绪

### TextTag（文本标签）
- 基于文本内容自动生成颜色
- Ant Design Tag 组件封装
- 通过 TagProps 支持自定义样式
- 使用 HSL 色彩算法实现一致的着色效果

## 依赖关系

### 对等依赖 (Peer Dependencies - 运行时依赖)
- react: >=16.9.0
- react-dom: >=16.9.0
- antd: ^6.2.0
- @ant-design/icons: ^6.1.0
- rc-virtual-list: ^3.19.2

### 开发依赖 (Dev Dependencies - 开发时依赖)
- @rslib/core: ^0.19.2 (主构建工具)
- @rsbuild/core: 1.7.1 (底层构建引擎)
- @rsbuild/plugin-react: ^1.4.2 (React 支持插件)
- storybook: ^10.1.11 (组件文档工具)
- @storybook/react: ^10.1.11
- @rstest/core: ^0.7.9 (测试框架)
- @biomejs/biome: 2.3.8 (代码质量工具)
- typescript: ^5.9.3