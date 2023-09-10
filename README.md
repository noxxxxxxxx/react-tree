# Tree

![npm](https://img.shields.io/npm/dm/figma-tree) [![npm](https://img.shields.io/npm/v/figma-tree.svg)](https://www.npmjs.com/package/figma-tree) [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/noxxxxxxx)

A React tree component that looks similar to Figma tree, a tree ui component that has all the tree functionalities

## Document

[https://noxxxxxxxx.github.io/tree/](https://noxxxxxxxx.github.io/tree/)

## How to use

In an ideal scenario, we only store the necessary data in the database. When retrieving data to construct a tree, we may need to extend some attributes in the tree nodes to align with our custom logic. So we need an API `fieldNames` to tell the component which nodes can be inserted into other nodes.

Confirm whether the attributes are consistent. If they are not consistent, use `fieldNames` to set them.

```js
import Tree from 'figma-tree'
import 'figma-tree/dist/style.css'

export default App () => {
  const data= []
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

## Feature

- [x] copy node
- [x] paste node
- [x] cut node
- [x] fold node
- [x] hidden node
- [x] lock node
- [x] move node
- [x] remove node
- [x] select single node
- [x] select multi nodes
- [x] context menu
- [x] change selected color
- [x] node icon
- [x] custom indent size

## LICENSE

This repository is published under [MIT license](https://github.com/noxxxxxxxx/tree/blob/main/LICENSE)
