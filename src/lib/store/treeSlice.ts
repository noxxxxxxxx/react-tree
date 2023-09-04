import { cleanData, clearCopyData, find, getCopyData, getFields, saveCopyData, sortAnchors, uuid } from '../helper'
import { createSlice } from '@reduxjs/toolkit'
import { Status } from '@/lib/types'

const initialState: StateType = {
  treeData: [],
  flattenData: {},
  status: Status.stop,
  start: {
    ids: [],
    anchors: [],
    indexes: [],
    from: '',
  },
  over: {
    id: '',
    anchor: [],
    index: -1,
  },
}

export const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    initTreeData: (state, action) => {
      state.treeData = cleanData(action.payload)
    },
    initFlattenData: (state, action) => {
      state.flattenData = cleanData(action.payload)
    },
    setStart: (state, { payload }) => {
      const [ids, anchors, indexes] = payload
      state.start.ids = ids
      const [sortedAnchors, sortedIndexes] = sortAnchors(anchors, indexes)
      state.start.anchors = sortedAnchors
      state.start.indexes = sortedIndexes
      const nodes = find(sortedAnchors, state.treeData)
      nodes.forEach((node) => {
        node.selected = true
      })
    },
    clearSelected: (state) => {
      const nodes = find(state.start.anchors, state.treeData)
      if (nodes.length) {
        nodes.forEach((node) => {
          node.selected = false
        })
      }
    },
    setOver: (state, { payload }) => {
      const [anchor, index] = payload
      if (anchor !== '') state.over.anchor = anchor
      if (index !== undefined) state.over.index = index
      console.log('目标位置', JSON.stringify(state.over.anchor), state.over.index)
    },
    setStatus: (state, { payload }) => {
      state.status = payload
    },
    updateNode: (state, { payload }) => {
      const [anchor, key, value] = payload
      const node = find([anchor], state.treeData)[0]
      node[key] = value
    },
    refresh: (state) => {
      const { key } = getFields()
      // const over = state.over

      function recursion(children: TreeNode[], anchor: number[]) {
        children?.forEach((child, index) => {
          const position = [...anchor]
          position.push(index)
          child.anchor = position.slice()
          const idx = state.start.ids.indexOf(child[key] as string)
          const same = state.over.id === child[key]
          if (idx !== -1) {
            state.start.anchors[idx] = child.anchor
          }
          if (same) {
            state.over.anchor = child.anchor
          }
          if (child.children) recursion(child.children, child.anchor)
        })
      }

      // over.anchor.pop() // 查找上二级
      // console.log(JSON.stringify(over.anchor))
      // const parent = over.anchor.length ? find([over.anchor], state.treeData)[0] : null
      // if (parent) {
      //   recursion(parent.children!, parent.anchor!)
      // } else {
      // to improve
      state.treeData.forEach((child: TreeNode, index) => {
        child.anchor = [index]
        const idx = state.start.ids.indexOf(child[key] as string)
        const same = state.over.id === child[key]
        if (idx !== -1) {
          state.start.anchors[idx] = child.anchor
        }
        if (same) {
          state.over.anchor = child.anchor
        }
        if (child.children) {
          recursion(child.children, child.anchor)
        }
      })
      // }
    },
    moveNode: (state) => {
      const start = state.start
      const over = state.over
      // console.log(JSON.stringify(start), '----', JSON.stringify(over))
      const targetIsRoot = over.anchor.length === 0
      start.anchors.forEach((anchor, index) => {
        const startIsRoot = anchor.length === 1
        const start = find([anchor], state.treeData)[0]
        const target = find([over.anchor], state.treeData)[0]
        let startIndex = state.start.indexes[index]
        if (!target && !targetIsRoot) {
          // console.log(target, targetIsRoot, '-----')
          console.warn("move node or insert target node dosn't exist, please check anchor array is correct?")
          return
        }
        // 获取待插入节点的父节点
        const startParentAnchor = anchor.slice()
        startParentAnchor.pop()
        const startParent = find([startParentAnchor], state.treeData)[0]
        // 目标节点是根节点：
        if (targetIsRoot) {
          console.log('目标节点是数组')
          state.treeData.splice(over.index, 0, start) // 根节点插入
          if (startIsRoot) {
            if (startIndex >= over.index) {
              startIndex += 1
              console.log('开始节点是数组')
            }
            state.treeData.splice(startIndex, 1) // 在根节点中删除旧节点
          } else {
            startParent.children?.splice(startIndex, 1) // 原父节点删除旧节点
          }
        } else {
          // 目标节点是普通父节点 || 子节点中平移
          target.children?.splice(over.index, 0, start) // 目标位置插入节点
          // 同层级向上移动
          if (target && startParent?.id === target.id && startIndex >= over.index) {
            startIndex += 1
          }
          if (startIsRoot) {
            console.log('开始节点是根节点 startIndex', startIndex)
            state.treeData.splice(startIndex, 1) // 父节点是根数组 删除旧节点
          } else {
            startParent.children?.splice(startIndex, 1)
          }
        }
      })
    },
    removeNode: (state) => {
      const { children } = getFields()
      state.start.anchors.forEach((anchor: number[], index) => {
        if (anchor.length === 1) {
          state.treeData.splice(state.start.indexes[index], 1)
        } else {
          const parentAnchor = anchor.slice()
          parentAnchor.pop()
          const node = find([parentAnchor], state.treeData)[0]
          console.log(state.start.indexes[index], '删除下表', anchor)
          ;(node[children] as TreeNode[])?.splice(state.start.indexes[index], 1)
        }
      })
      // state.setCurrent(0, '', -1, [])
    },
    insertNode: (state) => {
      // const over = state.over
      // const target = find([over.anchor], state.data)[0]
      // const root = over.anchor.length === 0
      // const id = state.start.from
      // const newNode = cleanData(useStore.getState().getMaterial(id!))
      // newNode.id = nanoid()
      // newNode.anchors = []
      // newNode.lock = false
      // newNode.edit = false
      // newNode.hidden = false
      // if (root) {
      //   state.data.splice(over.index, 0, newNode)
      // } else {
      //   target.children?.splice(over.index, 0, newNode)
      // }
      // state.id = newNode.id // 更新当前选中 id
      // state.uid = newNode.uid // 更新当前选中 indexes
      // state.indexes = [...over.indexes, over.index] // 更新当前选中 indexes
    },
    // fix selected node anchors
    fixSelected: (state, { payload }) => {
      // const { key, slot, children } = getFields()
      // const paste = payload
      // let anchor = state.over.anchor
      // let target = find([anchor], state.treeData)[0]
      // if (paste) {
      //   anchor = state.start.anchors[0]
      //   target = find([anchor], state.treeData)[0]
      //   const insert = target[slot] === true
      //   if (insert) return
      //   anchor.pop()
      //   target = find([anchor], state.treeData)[0] // find parent
      // }
      // state.start.anchors =
      //   (target[children] as TreeNode[])
      //     ?.filter((child) => state.start.ids.includes(child[key] as string))
      //     .map((child) => child.anchor) || []
    },
    // updateNodeProps: (data, type) =>
    //   set((state) => {
    //     const { indexes } = get()
    //     const node = findNode(indexes, state)
    //     if (node) {
    //       if (type == 'style') {
    //         node!.style = merge(node!.style, data)
    //       } else {
    //         node!.props = merge(node!.props, data)
    //       }
    //     }
    //   }),
    // repairIndexes: () => {
    //   set((state) => {
    //     const repair = (tree: TreeNode[]) => {
    //       for (let i = 0; i < tree.length; i++) {
    //         const node = tree[i]
    //         if (node.uid === state.uid) {
    //           state.indexes = node.indexes.slice()
    //           return
    //         }
    //         if (node.group) {
    //           repair(node.group)
    //         }
    //       }
    //     }
    //     repair(state.tree)
    //   })
    // },
    copyNode: (state) => {
      const node = find(state.start.anchors, state.treeData)
      saveCopyData(JSON.stringify(node))
    },
    pasteNode: (state) => {
      const { key, children, name, slot } = getFields()
      const parent = state.start.anchors[0].slice()
      parent.pop()
      const node = getCopyData()
      if (!node) {
        console.error("paste tree node failed, can't get saved node data.")
      } else {
        const target = JSON.parse(node)
        target.forEach((node: TreeNode) => {
          node[key] = uuid()
          node[name] = `${node[name]}_Copy`
          if (target.length === 1) node['selected'] = false
        })
        if (parent.length === 0) {
          state.treeData.splice(state.start.indexes[0], 0, target)
        } else {
          const startNode = find([state.start.anchors[0]], state.treeData)[0]
          const insert = startNode[slot] === true
          if (insert) {
            ;(startNode[children] as TreeNode[]).unshift(...target)
          } else {
            const parentNode = find([parent], state.treeData)[0]
            ;(parentNode[children] as TreeNode[]).splice(state.start.indexes[0], 0, ...target)
          }
        }
        clearCopyData()
      }
    },
  },
})

export const {
  initTreeData,
  initFlattenData,
  setStart,
  clearSelected,
  setOver,
  setStatus,
  updateNode,
  refresh,
  moveNode,
  insertNode,
  copyNode,
  pasteNode,
  removeNode,
  fixSelected,
} = treeSlice.actions

export default treeSlice.reducer
