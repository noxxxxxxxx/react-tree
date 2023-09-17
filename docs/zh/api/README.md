# API

## theme

根据主题设置 Tree 的展示样式

::: tip
主题会带有各自的行为，当主题设置为 `figma` 时， Tree Node 可以被拖拽，但是可以通过设置属性来开启或禁用。
:::

- **Default** `default`

- **Type**

```ts
enum Theme {
  figma = "figma",
  default = "default",
}
```

- **Example**

```jsx
<Tree theme="figma" />
```

## icon

自定义树节点前的 Icon 图标

::: tip
如果是字符串，最终将会被渲染为 `img`。

如果 Tree 的数据中还有 icon 字段，那么将会根据类型来进行渲染。
:::

- **Default** `-`

- **Type**

```ts
type icon = string | ReactNode;
```

- **Example**

```tsx
const icon = () => (
    <svg width="100" height="100">
      <circle cx="50" cy="50" r="40" />
    </svg>
  ),
};

<Tree icon={icon} />;
```

## switcherIcon

折叠或展开的箭头图标

::: tip
展开和收起是通过 `css` 样式控制的，因此传入的 DOM 节点要考虑好初始时的方向。
:::

- **Default** `ReactNode` arrow icon

- **Type**

```ts
interface switcherIcon {
  (): ReactNode;
}
```

- **Example**

```tsx
import { DownOne } from "@icon-park/react";
const switcherIcon = () => <DownOne />;

<Tree switcherIcon={switcherIcon} />;
```

## indentSize

控制 Tree 节点的缩进效果

- **Default** `15`

- **Unit** `px`

- **Type** `number`

## foldIconDisplay

用于控制哪种交互方式下展示折叠箭头图标

::: tip
如果主题是 `Figma`，该字段会被自动设置为 `hover`, 代表只有鼠标移入的时候才会展示箭头。
:::

- **Default** `-`

- **Type**

```ts
enum FoldIconDisplay {
  always = "always",
  hover = "hover",
}
```

## draggable

控制 Tree 节点是否可被拖拽

- **Default** `false`

- **Type** `boolean`

## checkable

控制 checkbox 是否展示

- **Default** `false`

- **Type** `boolean`

## selectable

控制 Tree 节点是否可被选中

::: tip
如果主题是 `default`，默认只能选中选中一个节点。
:::

- **Default** `true`

- **Type** `boolean`

## onDragStart

- **Type**

```ts
type onDragStart = (params: {
  event: React.SyntheticEvent;
  node: TreeNode;
}) => void;
```

## onDragEnter

- **Type**

```ts
type onDragStart = (params: {
  event: React.SyntheticEvent;
  node: TreeNode;
}) => void;
```

## onDragEnd

- **Type**

```ts
type onDragEnd = (params: {
  event: React.SyntheticEvent;
  node: TreeNode;
}) => void;
```

## onDragOver

- **Type**

```ts
type onDragOver = (params: {
  event: React.SyntheticEvent;
  node: TreeNode;
}) => void;
```

## onDragLeave

- **Type**

```ts
type onDragLeave = (params: {
  event: React.SyntheticEvent;
  node: TreeNode;
}) => void;
```

## onDrop

- **Type**

```ts
type onDrop = (params: {
  event: React.SyntheticEvent;
  node: TreeNode;
  dragNodes: TreeNode[];
  dragNodesKeys: TreeNode["anchor"][];
}) => void;
```

## loadData

异步加载数据插入到 Node 节点的 children 中

- **Type**

```ts
type loadData = (
  anchor: TreeNode["anchor"],
  key: React.Key,
  children: TreeNode[]
) => Promise;
```

- **Example**

<iframe src="https://codesandbox.io/embed/loaddata-v4g46h?fontsize=14&hidenavigation=1&theme=dark&view=preview"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="loadData"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## expandAll

如果 TreeData 中没有 `expand` 字段，初始化时默认展开所有节点

- **Type** `boolean`

- **Default** `false`


<!-- - **Default** `string`

- **Type**

```ts
type
````

- **Example** -->
