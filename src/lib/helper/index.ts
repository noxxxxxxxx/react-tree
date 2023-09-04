import ID from './id'
import { MouseEventHandler } from 'react'
export const LabelClass = '.node-name'
export const StorageKey = 'tree:copy:node'
const fieldNames = {
  name: 'name',
  key: 'id',
  children: 'children',
  slot: 'slot',
}

/* 获取元素下标 */
export const getIndex = (element: HTMLElement) => {
  return Number(element.getAttribute('data-index'))
}

export const getAnchor = (element: HTMLElement) => {
  return element.getAttribute('data-anchor')?.split(',')
}

/* 获取元素索引 */
export const getIndexes = (element: HTMLElement): number[] | undefined => {
  return element.getAttribute('data-indexes')?.split(',').map(Number)
}

/* 获取元素唯一ID */
export const getUId = (element: HTMLElement) => {
  return element.getAttribute('data-uid')
}

/* 获取元素ID */
export const getId = (element: HTMLElement) => {
  return element.getAttribute('data-id')
}

/* 判断根节点是否支持移出 */
export const canMoveOutRoot = (element: HTMLElement, enable: boolean) => {
  if (enable) {
    return true
  }
  const root = element.getAttribute('data-root') === 'true'
  if (root) {
    return false
  }
  return true
}

/* 获取 label DOM */
export const findLabel = (element: HTMLElement): HTMLElement | null => {
  return element.querySelector(LabelClass)
}

/* 获取基准 DOM */
export const findNode = (e: React.MouseEvent): HTMLElement => {
  let target = e.target as HTMLElement
  while (target !== null) {
    const anchor = target.getAttribute('data-anchor')
    if (anchor) {
      return target
    }
    target = target.parentNode
  }
}

/**
 * Get tree node data
 * @returns string
 */
export const getCopyData = () => {
  return localStorage.getItem(StorageKey)
}

/**
 * Remove storied tree node
 */
export const clearCopyData = () => {
  localStorage.removeItem(StorageKey)
}

/**
 * Store node data
 * @param data string
 */
export const saveCopyData = (data: string) => {
  localStorage.setItem(StorageKey, data)
}

/**
 * Check node data exist
 * @returns boolean
 */
export const allowPaste = () => {
  return !!localStorage.getItem(StorageKey)
}

/**
 * Get node data from DOM
 * @param node HTMLElement
 * @returns id, anchor, index
 */
export const getNodeInfo = (node: HTMLElement) => {
  const anchor = getAnchor(node)!
  const id = getId(node)!
  const index = getIndex(node)!
  return { id, anchor, index }
}

/**
 * Find tree node
 * @param anchors number[][]
 * @param list TreeNode[]
 * @returns TreeNode[]
 */
export const find = (anchors: number[][], list: TreeNode[]): TreeNode[] => {
  const { children } = getFields()
  const result: TreeNode[] = []
  anchors.forEach((anchor) => {
    if (anchor.length === 0) {
      console.warn('anchor is an empty array, example: [1,2,3]')
      return result
    }
    let instance: TreeNode
    anchor.forEach((next, index) => {
      if (index === 0) {
        instance = list[next] as TreeNode
      } else if (index !== anchor.length) {
        if (instance && instance[children]) {
          instance = (instance[children] as TreeNode[])[next] as TreeNode
        }
      }
    })
    if (instance) result.push(instance)
  })
  return result
}

/**
 * Sort anchors
 * @param anchors number[][]
 * @returns
 */
export const sortAnchors = (anchors: number[][], indexes: number[]): [number[][], number[]] => {
  const len = anchors.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      const a = anchors[j]
      const b = anchors[j + 1]
      let index = 0
      // b depth > a depth [a,b]
      while (index < a.length || index < b.length) {
        if (b[index] > a[index] || a[index] === undefined) {
          ;[anchors[j], anchors[j + 1]] = [anchors[j + 1], anchors[j]][(indexes[j], indexes[j + 1])] = [
            indexes[j + 1],
            indexes[j],
          ]
          break
        }
        if (a[index] > b[index]) {
          break
        }
        index++
      }
    }
  }
  return [anchors, indexes]
}

/**
 * Simple function to copy data
 * @param data TreeNode[]
 * @returns TreeNode[]
 */
export const cleanData = (data: Record<string, unknown>) => JSON.parse(JSON.stringify(data))

/**
 * Add custom property to each node
 * @param list TreeNode[]
 * @param property {key: value}
 * @returns
 */
export const extendProperty = (list: TreeNode[], property: Record<string, unknown>) => {
  const { slot, children } = getFields()
  const keys = Object.keys(property)
  list.forEach((node) => {
    if (!node) return
    const _property = cleanData(property)
    keys.forEach((key) => {
      node[key] = _property[key]
    })
    if (slot && node[slot]) {
      if (!node[children]) node[children] = []
    }
    if (Array.isArray(node[children])) {
      extendProperty(node[children] as TreeNode[], property)
    }
  })
  return list
}

/**
 * Generate anchor for each node
 * @param list TreeNode[]
 */
export const anchor = (list: TreeNode[], start: number[]) => {
  const { children } = getFields()
  list.forEach((node, index) => {
    const position: number[] = start.slice()
    position.push(index)
    node.anchor = position.slice()
    if (node[children]) {
      anchor(node[children] as TreeNode[], position)
    }
  })
  return list
}

/*
 * array to tree
 * id: 唯一标识
 * pid: 对应父级id
 * children: 子元素对应的字段
 */
// export const construct = (list: TreeNode[], id: string, pid: string, children: string, slot: string) => {
//   const nodeMap: Map<string, TreeNode> = new Map()
//   const result: TreeNode[] = []
//   list.forEach((item) => {
//     const _id = item[id] as string
//     const _pid = item[pid] as string
//     const node = item
//     if (node[slot]) {
//       if (!node[children]) node[children] = []
//     }
//     const preSetNode = nodeMap.get(_id)
//     if (preSetNode) {
//       nodeMap.set(_id, {
//         ...preSetNode,
//         ...node,
//       })
//     } else {
//       nodeMap.set(_id, node)
//     }

//     const pNode = nodeMap.get(_pid)
//     if (pNode) {
//       if (pNode[children] == null) {
//         pNode[children] = []
//       }
//       if (node.order === undefined) {
//         node.order = (pNode[children] as TreeNode[]).length
//       }
//       ; (pNode[children] as TreeNode[]).push(node)
//         ; (pNode[children] as TreeNode[]).sort((a, b) => a.order - b.order)
//     } else {
//       // parent node not been setted
//       nodeMap.set(pid, {
//         [children]: [node],
//       } as TreeNode)
//     }

//     if (!node[pid]) {
//       result.push(node)
//     }
//   })
//   return anchor(result, [])
// }

/**
 * tree to array
 * @param tree
 * @param id
 * @param pid
 * @param children
 * @returns
 */
// export const destruct = (tree: TreeNode[], id: string, pid: string, children: string) => {
//   const flatten = (node: TreeNode) => {
//     const result = []
//     const queue = [node]

//     while (queue.length) {
//       const item = queue.shift()
//       if (item && item[children] && (item[children] as TreeNode[]).length > 0) {
//         (item[children] as TreeNode[]).forEach((c) => {
//           queue.push({
//             ...c,
//             [pid]: item[id],
//           })
//         })
//       }

//       if (item) delete item[children]

//       result.push(item)
//     }

//     return result
//   }
//   // 如果是数组而非单个根节点
//   if (Array.isArray(tree)) {
//     return tree.map((item) => flatten(item)).reduce((pre, cur) => pre.concat(cur), [])
//   } else {
//     return flatten(tree)
//   }
// }

/**
 * if two anchors have same ancestor then return their same ancestor anchor
 * @param pre
 * @param cur
 * @returns
 */
export const mergeAnchor = (pre: number[][], cur: number[]): number[][] => {
  const result: number[][] = []
  let compared = false

  pre.forEach((anchor) => {
    const length = cur.length > anchor.length ? anchor.length : cur.length
    const temp: number[] = []
    let i = 0
    let j = 0

    // start compare
    while (i < anchor.length && j < cur.length) {
      if (anchor[i] === cur[j]) {
        temp.push(anchor[i])
        i++
        j++
      } else {
        break
      }
    }
    if (temp.length === length) {
      compared = true
      const pos = result.findIndex((item) => item.toString() === temp.toString())
      if (pos === -1) result.push(temp)
    } else {
      const pos = result.findIndex((item) => item.toString() === anchor.toString())
      if (pos === -1) result.push(anchor)
    }
  })

  if (!compared) {
    result.push(cur)
  }

  return result
}

// export const clearThrottle = () => {
//   clearTimeout(window.$tree.throttleTimer)
//   window.$tree.throttleTimer = 0
// }

/**
 * Generate tree node id
 * @returns guid
 */
export const uuid = () => {
  return ID.guid()
}

/**
 * Tree component default config data
 * @param props ConfigProps
 */
export const initDefaultConfig = (props: ConfigProps) => {
  window.$tree = {
    fieldNames: props.fieldNames || fieldNames,
    reverse: props.reverse || false,
    contextMenu: props.contextMenu || false,
    dragNode: null,
    throttleTimer: 0,
    throttleDelay: 200,
    drag: {
      start: {
        id: '',
        index: 0,
      },
      over: false, // identify can drop
    },
    style: {
      '--node-indent': (props.indentSize || 15) + 'px',
      '--parent-bg-color': props.parentBgColor || '#e9e9e9',
      '--parent-color': props.parentColor || '#000',
      '--children-bg-color': props.childrenBgColor || '#f6f4f4',
      '--children-color': props.childrenColor || '#000',
    },
    menu: document.querySelector('.tree-context-menu')!,
  }
}

/**
 * Get tree config
 * @returns object
 */
export const getConfig = () => {
  return window.$tree || { fieldNames }
}

/**
 * Get user defined fieldNames
 * @returns fieldNames
 */
export const getFields = () => {
  const { fieldNames } = getConfig()
  return fieldNames
}

export const prevent: MouseEventHandler<HTMLElement> = (e) => e.preventDefault()

export const stop: MouseEventHandler<HTMLElement> = (e) => e.stopPropagation()
