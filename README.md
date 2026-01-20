# antd-wp - Ant Design 组件库二次封装

[![npm version](https://img.shields.io/npm/v/antd-wp.svg)](https://www.npmjs.com/package/antd-wp)
[![License](https://img.shields.io/npm/l/antd-wp.svg)](https://gitee.com/uxy-ui/antd-wp/blob/master/LICENSE.txt)

antd-wp 是一个基于 Ant Design 的 React 组件库二次封装项目，提供了增强的表格、网格表单、工作台布局等常用组件，旨在提升开发效率和用户体验。

## 🎯 项目特色

- **增强表格组件** - 基于 Ant Design Table，内置过滤、排序、展开等功能
- **网格表单系统** - 24列网格布局，支持所有 Ant Design 表单组件
- **工作台布局** - CSS Grid 布局系统，可配置多个区域
- **智能标签组件** - 自动根据文本内容生成配色
- **TypeScript 支持** - 完整的类型定义和类型安全
- **现代化构建** - 基于 Rslib/Rsbuild 的高性能构建工具链

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
# 构建库文件（监听模式）
npm run dev

# 启动 Storybook 组件文档
npm run storybook
```

### 生产构建

```bash
# 构建组件库
npm run build

# 构建 Storybook 静态文档
npm run build:storybook
```

### 代码质量

```bash
# 代码检查和自动修复
npm run check

# 代码格式化
npm run format

# 运行测试
npm run test
```

## 📦 核心组件

### EnhanceTable（增强表格）

基于 Ant Design Table 的增强组件，提供丰富的功能：

```tsx
import {EnhanceTable} from 'antd-wp';

const MyTable = () => {
    const columns = [
        {
            config: {title: '姓名', dataIndex: 'name'},
            filterType: 'search'
        },
        {
            config: {title: '创建时间', dataIndex: 'createdAt'},
            filterType: 'date'
        }
    ];

    return (
        <EnhanceTable
            rowKey="id"
            columns={columns}
            data={dataSource}
            selection={{show: true}}
            expanding={{
                render: (record) => <div>展开内容: {record.name}</div>
            }}
        />
    );
};
```

**主要特性：**

- 🔍 列过滤（搜索、日期、多选）
- 📊 数据排序
- ➕ 行展开/折叠
- ✅ 行选择
- 📄 分页功能
- 🎯 虚拟滚动支持

### GridForm（网格表单）

24列网格布局的表单系统：

```tsx
import {GridForm} from 'antd-wp';

const MyForm = () => {
    return (
        <GridForm
            value={{name: '张三', age: 18}}
            items={[
                {
                    row: 1,
                    col: 1,
                    span: 8,
                    type: 'input',
                    config: {
                        name: 'name',
                        label: '姓名'
                    }
                },
                {
                    row: 1,
                    col: 2,
                    span: 8,
                    type: 'input',
                    config: {
                        name: 'age',
                        label: '年龄'
                    }
                }
            ]}
            actions={[
                {
                    label: '提交',
                    props: {type: 'primary'},
                    validated: true,
                    onAction: (data) => console.log(data)
                }
            ]}
        />
    );
};
```

**支持的表单组件：**

- input、input-number、textarea
- select、radio、checkbox
- date-picker、time-picker
- switch、upload、rate 等

### WorkBench（工作台布局）

灵活的 CSS Grid 布局系统：

```tsx
import {WorkBench} from 'antd-wp';

const MyLayout = () => {
    return (
        <WorkBench
            areas={{
                root: <Sidebar/>,
                nav: <Navbar/>,
                main: <MainContent/>,
                footer: <Footer/>
            }}
            dimensions={{
                rootWidth: 200,
                navHeight: 60
            }}
        />
    );
};
```

**可配置区域：**

- root（左侧边栏）
- nav（顶部导航）
- home（右侧区域）
- menu（菜单区）
- path（路径导航）
- main（主要内容区）
- toggle（切换区）
- footer（底部区域）

### TextTag（文本标签）

智能配色的标签组件：

```tsx
import {TextTag} from 'antd-wp';

const MyTags = () => {
    return (
        <TextTag
            items={[
                {text: '重要'},
                {text: '紧急', config: {color: 'red'}},
                {text: '已完成', config: {color: 'green'}}
            ]}
        />
    );
};
```

## 🛠️ 技术栈

- **核心框架**: React 19.2.3 + TypeScript 5.9.3
- **UI 组件库**: Ant Design 6.2.0
- **构建工具**: Rslib 0.19.2 + Rsbuild 1.7.1
- **测试框架**: Rstest 0.7.9
- **代码质量**: Biome 2.3.8
- **文档工具**: Storybook 10.1.11
- **虚拟滚动**: rc-virtual-list 3.19.2

## 📁 项目结构

```
src/
├── datas/              # 数据展示组件
│   ├── enhance-table/  # 增强表格组件
│   └── grid-form/      # 网格表单组件
├── layouts/            # 布局组件
│   └── work-bench/     # 工作台布局
├── utils/              # 工具函数
└── widgets/            # 小组件
    └── text-tag/       # 文本标签组件

stories/                # Storybook 故事文件
├── data/               # 数据组件示例
├── layout/             # 布局组件示例
└── widget/             # 小组件示例

tests/                  # 单元测试文件
dist/                   # 构建输出目录
```

## 📖 使用文档

详细的组件使用说明和示例请查看我们的 [Storybook 文档](http://static.diamater.top/storybook/antd-wp/index.html)

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE.txt) 文件了解详情

## 👥 作者

**soonlee** - [soonlee113@163.com](mailto:soonlee113@163.com)

项目地址: [https://gitee.com/uxy-ui/antd-wp.git](https://gitee.com/uxy-ui/antd-wp.git)