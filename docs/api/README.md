# API

## theme

Set a default theme ui for tree component

::: tip
Each theme has default configurations, but you can override them by declaring specific attributes.
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

Customize treeNode icon.

::: tip
If the icon field is of string type, it will be rendered as an img element.

The icon field in the treeData will also be rendered.
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

The icon displayed when expanding or collapsing

::: tip
For better performance, collapsible effect implemented using checkbox. Therefore, the direction of the passed element needs to be considered.
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

Each tree node indentation spacing

- **Default** `15`

- **Unit** `px`

- **Type** `number`

## foldIconDisplay

When to display the collapse icon.

::: tip
If the theme is `Figma` the value of `foldIconDisplay` will be set to `hover`, the collapse icon will be displayed only when the user hovers over the tree node that can be collapsed or expanded.
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

Determining whether a treeNode can be dragged or not.

- **Default** `false`

- **Type** `boolean`

## selectable

Whether a tree node is selectable or not.

::: tip
In the default theme, only a single node can be selected.
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

<!-- - **Default** `string`

- **Type**

```ts
type
````

- **Example** -->
