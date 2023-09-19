import { useDispatch, useSelector } from 'react-redux'
import {
  clearSelected,
  copyNode,
  moveNode,
  pasteNode,
  refresh,
  removeNode,
  setOver,
  setStart,
  setStatus,
  updateChecked,
  updateNode,
} from '@/store/treeSlice'
import { RootState } from '@/store'
import { MouseEventHandler } from 'react'
import { FoldIconDisplay, Status } from '@/helper/const'
import { allowPaste, findNode, getConfig, getNodeInfo } from '@/helper'

export const useAction = () => {
  const dispatch = useDispatch()
  const startData = useSelector((state: RootState) => state.tree.start)

  const handleTreeMouseDown = () => {
    hideMenu()
  }

  const hideMenu = () => {
    const { menu, contextMenu } = getConfig()
    if (contextMenu === false) return
    menu().style.visibility = 'hidden'
  }

  const select = (ids: string[], anchors: number[][], indexes: number[]) => {
    const { selectable } = getConfig()
    if (selectable === false) return
    dispatch(clearSelected())
    dispatch(setStart([ids, anchors, indexes]))
  }

  const over = (anchor: number[] | string, index?: number) => {
    dispatch(setOver([anchor, index]))
  }

  const lock = (anchor: number[], value: boolean) => {
    dispatch(updateNode([[anchor], 'lock', value]))
  }

  const hidden = (anchor: number[], value: boolean) => {
    dispatch(updateNode([[anchor], 'hidden', value]))
  }

  const copy = () => {
    dispatch(copyNode())
    hideMenu()
    new LightTip('复制成功', 'success')
  }

  const cut = () => {
    dispatch(copyNode())
    dispatch(removeNode())
    dispatch(refresh())
    hideMenu()
    new LightTip('剪切成功', 'success')
  }

  const paste = () => {
    dispatch(pasteNode())
    dispatch(refresh())
    hideMenu()
    new LightTip('粘贴成功', 'success')
  }

  const remove = () => {
    dispatch(removeNode())
    dispatch(refresh())
    hideMenu()
    new LightTip('删除成功', 'success')
  }

  const move = () => {
    dispatch(moveNode())
    dispatch(refresh())
  }

  const dragStatus = (status: Status) => {
    dispatch(setStatus(status))
  }

  const mouseEnter: MouseEventHandler<HTMLElement> = (e) => {
    const { foldIconDisplay } = getConfig()
    if (foldIconDisplay === FoldIconDisplay.hover) {
      e.currentTarget.classList.add('tree-mouse-in')
    }
  }

  const mouseLeave: MouseEventHandler<HTMLElement> = (e) => {
    const { foldIconDisplay } = getConfig()
    if (foldIconDisplay === FoldIconDisplay.hover) {
      e.currentTarget.classList.remove('tree-mouse-in')
    }
  }
  const setPaste = () => {
    const { menu } = getConfig()
    menu().setAttribute('data-paste', String(allowPaste()))
  }

  const showMenu = (x: number, y: number) => {
    const { menu } = getConfig()
    const menuHeight = menu().clientHeight
    const windowHeight = document.documentElement.clientHeight
    let _y = y
    if (y + menuHeight > windowHeight) {
      _y = _y - menuHeight
    }
    menu().style.left = `${x}px`
    menu().style.top = `${_y}px`
    menu().style.visibility = 'visible'
  }

  const rightClick = (e: React.MouseEvent) => {
    const { contextMenu } = getConfig()
    if (contextMenu === false) return
    e.stopPropagation()
    e.preventDefault()
    const node = findNode(e) // node-info
    if (node) {
      const { id, anchor, index } = getNodeInfo(node)
      // select single node
      if (startData.ids.indexOf(id) === -1) {
        console.log('清除')
        dispatch(clearSelected())
        dispatch(setStart([[id], [anchor], [index]]))
      }
      setPaste()
      showMenu(e.clientX, e.clientY)
    }
  }

  /* set checkbox value */
  const checked = (anchor: number[], value: boolean) => {
    dispatch(updateChecked([anchor, value]))
  }

  const expand = (anchor: number[], value: boolean) => {
    dispatch(updateNode([[anchor], 'expand', value]))
  }

  return {
    select,
    over,
    dragStatus,
    lock,
    hidden,
    copy,
    cut,
    paste,
    remove,
    move,
    mouseEnter,
    mouseLeave,
    rightClick,
    hideMenu,
    handleTreeMouseDown,
    checked,
    expand,
  }
}
