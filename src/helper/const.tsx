import { ReactComponent as DownOne } from '@/assets/arrowdown.svg'

const fieldNames = {
  name: 'name',
  key: 'id',
  children: 'children',
  slot: 'slot',
}

export const defaultNodeKey = [
  {
    key: 'root',
    value: false,
  },
  {
    key: 'icon',
    value: '',
  },
  {
    key: 'expand',
    value: false,
  },
  {
    key: 'lock',
    value: false,
  },
  {
    key: 'fold',
    value: false,
  },
  {
    key: 'hidden',
    value: false,
  },
  {
    key: 'checked',
    value: false,
  },
  {
    key: 'selected',
    value: false,
  },
  {
    key: 'halfChecked',
    value: false,
  },
  {
    key: 'edit',
    value: false,
  },
  {
    key: 'slot',
    value: false,
  },
  {
    key: 'children',
    value: [],
  },
]

const getIcon = (type: string) => {
  if (type === 'downone') return <DownOne />
}

export const defaultConfig = {
  fieldNames,
  reverse: false,
  contextMenu: false,
  switcherIcon: () => getIcon('downone'),
  checkable: false,
  selectable: true,
}

export enum Theme {
  default = 'default',
  figma = 'figma',
}

export enum FoldIconDisplay {
  always = 'always',
  hover = 'hover',
}

export enum Status {
  dragging = 'dragging',
  stop = 'stop',
}

export const themeConfig = {
  default: {
    theme: Theme.default,
  },
  figma: {
    theme: Theme.figma,
    foldIconDisplay: FoldIconDisplay.hover,
    draggable: true,
    contextMenu: true,
  },
  file: {
    theme: 'file',
    showLine: true,
  },
}
