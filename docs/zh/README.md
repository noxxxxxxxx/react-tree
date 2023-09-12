# 教程

## 快速入门

:::tip 前提条件

- 熟悉 React 和 Redux 语法
- 已安装 16.0 或更高版本的 Node.js
  :::

### 安装

根据你的包管理工具，选择下列任意一项命令执行。

使用 NPM:

```bash
$ npm i figma-tree
```

使用 Yarn:

```bash
$ yarn add figma-tree
```

使用 PNPM:

```bash
$ pnpm i figma-tree
```

### 导入

将 `figma-tree` 组件导入，设置数据和默认参数并进行渲染。

```tsx
import Tree from 'figma-tree'
import 'figma-tree/dist/style.css'

export default App () => {
  const data = []
  const config = {}

  return (
    return (
    <Tree
      {...config}
      data={data}
    />
  )
  )
}
```

## 演示

最新版本的 Figma-tree 组件

<iframe src="https://codesandbox.io/embed/figma-tree-demo-hhqgws?autoresize=1&fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="figma-tree-demo"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
