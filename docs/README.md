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
mport { Tree } from 'figma-tree'
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
