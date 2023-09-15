import { RefObject } from 'react'
import type { Status } from './helper/const'

declare module '*.scss'
interface fieldNames {
  name: string
  key: string
  children: string
  slot: string
}

declare global {
  interface Window {
    $tree: {
      dragNode: null | HTMLElement
      throttleTimer: number | NodeJS.Timeout
      throttleDelay: number
      drag: {
        start: {
          id: string
          index: number
        }
        over?: boolean // identify can drop
      }
      style: Record<string, string>
      menu: () => HTMLElement
    } & ConfigProps
  }

  interface StateType {
    treeData: TreeNode[]
    status: Status
    start: {
      ids: string[] // current selected id
      anchors: number[][] // current Node location
      indexes: number[] // current Node in parent children location
      from: string // insert node id
    }
    // move or insert to target node
    over: {
      id: string
      anchor: number[] // parent anchor
      index: number // insert parent children location
    }
  }

  // Tree Node
  interface TreeNode {
    [key: string]: unknown
    id?: string
    // pid: string
    // order: number
    root?: boolean
    name?: string
    icon?: string
    lock?: boolean
    fold?: boolean
    hidden?: boolean
    expand?: boolean
    checked?: boolean
    selected?: boolean
    halfChecked?: boolean
    edit?: boolean
    slot?: boolean // means allow insert other tree node
    anchor?: number[]
    children?: TreeNode[]
  }

  interface Props {
    data?: TreeNode[]
    lineRef?: RefObject<HTMLDivElement>
    containerRef?: RefObject<HTMLDivElement>
    cut?: () => void
    copy?: () => void
    paste?: () => void
    remove?: () => void
    lock?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, node: TreeNode) => void
    hidden?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, node: TreeNode) => void
    node?: TreeNode
    indent?: number[]
    virtual?: boolean
    expand?: (anchor: TreeNode.anchor, value: boolean) => void
  }

  interface ConfigProps {
    theme?: Theme
    draggable?: boolean
    checkable?: boolean
    icon?: ReactNode | string
    switcherIcon?: ReactNode
    fieldNames?: fieldNames
    indentSize?: number
    foldIconDisplay?: FoldIconDisplay
    selectable?: boolean
    loadData?: (anchor: TreeNode['anchor'], key: React.Key,  children: TreeNode[]) => Promise
    onDragStart?: (params: { event: React.SyntheticEvent; node: TreeNode }) => void
    onDragEnd?: (params: { event: React.SyntheticEvent; node: TreeNode }) => void
    onDragOver?: (params: { event: React.SyntheticEvent; node: TreeNode }) => void
    onDragLeave?: (params: { event: React.SyntheticEvent; node: TreeNode }) => void
    onDragEnter?: (params: { event: React.SyntheticEvent; node: TreeNode }) => void
    onDrop?: (params: {
      event: React.SyntheticEvent
      node: TreeNode
      dragNodes: TreeNode[]
      dragNodesKeys: TreeNode['anchor'][]
    }) => void
    defaultSelectMulti?: boolean
    expandAll?: boolean
    expandParent?: boolean
    reverse?: boolean
    contextMenu?: boolean
    parentBgColor?: string
    childrenBgColor?: string
    childrenColor?: string
    parentColor?: string
  }
}