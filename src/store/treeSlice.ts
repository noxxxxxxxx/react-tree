import { cleanData, clearCopyData, find, getCopyData, getFields, saveCopyData, sortAnchors, uuid } from '../helper'
import { createSlice } from '@reduxjs/toolkit'
import { Status } from '@/helper/const'

const initialState: StateType = {
  treeData: [],
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
    },
    setStatus: (state, { payload }) => {
      state.status = payload
    },
    updateNode: (state, { payload }) => {
      const [anchor, key, value] = payload
      const nodes = find(anchor, state.treeData)
      nodes.forEach((node) => {
        node[key] = value
      })
    },
    updateChecked: (state, { payload }) => {
      const { children } = getFields()
      const [anchor, checked] = payload
      const node = find([anchor], state.treeData)[0]
      node.checked = checked
      const loopChildren = (node: TreeNode) => {
        const list = node[children] as TreeNode[]
        if (!list) return
        node.halfChecked = false
        list.forEach((node) => {
          node.checked = checked
          loopChildren(node)
        })
      }
      const loopParent = (anchor: number[]) => {
        const position = anchor
        position.pop()
        let parentIndeterminate
        while (position.length) {
          const parent = find([position], state.treeData)[0]
          const list = parent[children] as TreeNode[]
          if (parentIndeterminate) {
            parent.checked = false
            parent.halfChecked = true
          } else {
            if (checked) {
              const unchecked = list.find((node) => !node.checked)
              if (unchecked) {
                parent.halfChecked = true
                parentIndeterminate = true
              } else {
                parent.halfChecked = false
                parent.checked = true
              }
            } else {
              const checked = list.find((node) => node.checked || node.halfChecked)
              if (checked) {
                parentIndeterminate = true
                parent.halfChecked = true
              } else {
                parent.checked = false
                parent.halfChecked = false
              }
            }
          }
          position.pop()
        }
      }
      loopChildren(node)
      loopParent(anchor)
    },
    refresh: (state) => {
      const { key } = getFields()
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
    },
    moveNode: (state) => {
      const start = state.start
      const over = state.over
      const targetIsRoot = over.anchor.length === 0
      start.anchors.forEach((anchor, index) => {
        const startIsRoot = anchor.length === 1
        const start = find([anchor], state.treeData)[0]
        const target = find([over.anchor], state.treeData)[0]
        let startIndex = state.start.indexes[index]
        if (!target && !targetIsRoot) {
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
          console.log(state.start.indexes[index], '删除下标', anchor)
          ;(node[children] as TreeNode[])?.splice(state.start.indexes[index], 1)
        }
      })
    },
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
  clearSelected,
  updateChecked,
  initTreeData,
  updateNode,
  removeNode,
  pasteNode,
  setStatus,
  copyNode,
  moveNode,
  setStart,
  setOver,
  refresh,
} = treeSlice.actions

export default treeSlice.reducer
