import { RefObject, FC } from 'react'
declare const Entry: FC<Props & ConfigProps>
export default Entry

// export {}

declare module '*.scss'

export enum Status {
  dragging = 'dragging',
  stop = 'stop',
}

interface fieldNames {
  name: string
  key: string
  children: string
  slot: string
}

declare global {
  interface Window {
    $tree: {
      fieldNames: fieldNames
      reverse: boolean
      contextMenu: boolean
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
      menu: HTMLElement
    }
  }

  interface StateType {
    treeData: TreeNode[]
    flattenData: Record<string, TreeNode>
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
    id: string
    // pid: string
    // order: number
    icon: string
    root: boolean
    name: string
    lock: boolean
    hidden: boolean
    fold: boolean
    selected: boolean
    edit: boolean
    slot?: boolean // means allow insert other tree node
    children?: TreeNode[]
    anchor: number[]
  }

  interface Props {
    data?: TreeNode[]
    lineRef?: RefObject<HTMLDivElement>
    containerRef?: RefObject<HTMLDivElement>
    copy?: () => void
    cut?: () => void
    paste?: () => void
    remove?: () => void
    lock?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, node: TreeNode) => void
    hidden?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, node: TreeNode) => void
    node?: TreeNode
    indent?: number[]
    virtual?: boolean
  }

  interface ConfigProps {
    fieldNames?: fieldNames
    indentSize?: number
    foldIconDisplay?: string
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
