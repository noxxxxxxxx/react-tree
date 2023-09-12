# Guide

## Quick Start

:::tip Prerequisites

- Familiarity with the React and Redux
- Install Node.js version 16.0 or higher
  :::

### Install

Use NPM:

```bash
$ npm i figma-tree
```

Use Yarn:

```bash
$ yarn add figma-tree
```

Use PNPM:

```bash
$ pnpm i figma-tree
```

<!-- Using figma-tree from CDN -->

### Import

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

## Demo

The latest version of figma-tree compoent.

<iframe src="https://codesandbox.io/embed/figma-tree-demo-hhqgws?autoresize=1&fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="figma-tree-demo"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
