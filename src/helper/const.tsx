import { ReactComponent as DownOne } from '@/assets/arrowdown.svg'
import { FoldIconDisplay } from '@/index.d'

const fieldNames = {
  name: 'name',
  key: 'id',
  children: 'children',
  slot: 'slot',
}

const getIcon = (type: string) => {
  if (type === 'downone') return <DownOne />
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
    contextMenu: true,
  },
}
