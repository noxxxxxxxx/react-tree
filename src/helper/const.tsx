import { DownOne } from '@icon-park/react'
import { FoldIconDisplay } from '@/index.d'

const fieldNames = {
  name: 'name',
  key: 'id',
  children: 'children',
  slot: 'slot',
}

const getIcon = (type: string) => {
  if (type === 'downone')
    return (
      <DownOne
        theme="filled"
        size="12"
        fill="#969696"
        strokeWidth={4}
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
    )
}

export const defaultConfig = {
  fieldNames,
  reverse: false,
  contextMenu: false,
  switcherIcon: () => getIcon('downone'),
  selectable: true,
}

export const themeConfig = {
  default: {
    theme: 'default',
  },
  figma: {
    theme: 'figma',
    foldIconDisplay: FoldIconDisplay.hover,
    draggable: true,
  },
}
