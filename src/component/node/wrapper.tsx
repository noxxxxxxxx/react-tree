import { find, findLabel, getFields, mergeAnchor } from '@/helper'
import { type FC, type ReactElement } from 'react'
import { useAction } from '@/hooks/useAction'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import Node from './node'

const Wrapper: FC<Props & ConfigProps> = (props): ReactElement => {
  const {
    data,
    lineRef,
    containerRef,

    defaultSelectMulti,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    onDragEnd,
    onDragStart,
    draggable,
    checkable,
    icon,
    switcherIcon,
  } = props
  const treeData = data?.slice().reverse()
  const action = useAction()
  const startData = useSelector((state: RootState) => state.tree.start)
  const base = (containerRef?.current as HTMLElement)?.getBoundingClientRect().top
  const { key, children } = getFields()

  const lock = (e: React.SyntheticEvent, node: TreeNode) => {
    e.stopPropagation()
    action.lock(node.anchor!, !node.lock)
  }

  const hidden = (e: React.SyntheticEvent, node: TreeNode) => {
    e.stopPropagation()
    action.hidden(node.anchor!, !node.hidden)
  }

  const dragStart = (event: React.SyntheticEvent, id: string, anchor: number[], index: number) => {
    event.stopPropagation()
    action.select([id], [anchor], [index])
    window.$tree.drag.start.id = id
    window.$tree.dragNode = event.currentTarget as HTMLElement
    const node = find([anchor], treeData!)[0]
    onDragStart?.({ event, node })
  }

  const dragEnter = (event: React.SyntheticEvent, anchor: number[]) => {
    event.stopPropagation()
    event.preventDefault()
    const node = find([anchor], treeData!)[0]
    onDragEnter?.({ event, node })
  }

  const dragOver = (
    event: React.SyntheticEvent & React.MouseEvent<HTMLDivElement>,
    root: boolean,
    group: boolean,
    id: string,
    anchor: number[],
    index: number,
    selfCount: number,
  ) => {
    event.stopPropagation()
    event.preventDefault()
    const node = find([anchor], treeData!)[0]
    onDragOver?.({ event, node })
    const target = event.currentTarget as HTMLElement
    const overParent = anchor.slice()
    overParent.pop()
    target.style.boxShadow = 'none'
    window.$tree.drag.over = true
    // 根节点 & 移动到自身
    if (root || window.$tree.drag.start.id === id) {
      console.log('移动到自身')
      window.$tree.drag.over = false
      return
    }

    const isInchildren = window.$tree.dragNode?.parentNode?.nextSibling?.contains(target)
    if (isInchildren) {
      console.log('在自己的children元素中')
      if (lineRef?.current) lineRef.current.style.opacity = '0'
      window.$tree.drag.over = false
      return
    }

    const y = event.pageY
    const baseY = target.getBoundingClientRect().top
    const middle = baseY + 30 / 2
    if (group && id !== window.$tree.drag.start.id) {
      // 拖拽到组中
      if (y > middle - 7 && y < middle + 7) {
        if (lineRef?.current) lineRef.current.style.opacity = '0'
        target.style.boxShadow = 'inset 0 0 0px 1px blue'
        action.over(anchor, selfCount)
        console.log('移动到组中', anchor, selfCount)
        return
      }
    }

    if (lineRef?.current) lineRef.current.style.opacity = '1'
    if (y > middle) {
      // 组被展开时，忽略当前元素
      const open = target?.nextSibling?.querySelector('label')?.control.checked === false
      if (group && open && selfCount > 0) {
        console.log('当前组是展开状态')
        if (lineRef?.current) lineRef.current.style.opacity = '0'
        window.$tree.drag.over = false
        return
      }
      if (lineRef?.current) lineRef.current.style.top = `${baseY - (base || 0) + 30}px`
      action.over(overParent, index)
    } else {
      if (lineRef?.current) lineRef.current.style.top = `${baseY - (base || 0)}px`
      action.over(overParent, index + 1)
    }
    if (lineRef?.current) lineRef.current.style.left = `${findLabel(target)!.offsetLeft - 10}px`
  }

  /* 拖拽离开 */
  const dragLeave = (event: React.SyntheticEvent, anchor: number[]) => {
    event.stopPropagation()
    const target = event.currentTarget as HTMLElement
    target.style.boxShadow = 'none'
    const node = find([anchor], treeData!)[0]
    onDragLeave?.({ event, node })
  }

  /* 拖拽结束 */
  const dragEnd = (event: React.SyntheticEvent, anchor: number[]) => {
    const node = find([anchor], treeData!)[0]
    onDragEnd?.({ event, node })
  }

  /* 拖拽释放 */
  const drop = (event: React.SyntheticEvent, root: boolean, anchor: number[]) => {
    event.stopPropagation()
    const target = event.currentTarget as HTMLElement
    if (lineRef?.current) lineRef.current.style.opacity = '0'
    target.style.boxShadow = 'none'
    if (root || !window.$tree.drag.over) return
    const node = find([anchor], treeData!)[0]
    const dragNodes = find(startData.anchors, treeData!)
    onDrop?.({ event, node, dragNodes, dragNodesKeys: startData.anchors })
    action.move()
  }

  const mouseDown = (event: MouseEvent, id: string, anchor: number[], index: number) => {
    if (startData.ids.includes(id) || event.button === 2) return
    // if (e.shiftKey) {}
    if (event.metaKey && defaultSelectMulti) {
      const ids = [...startData.ids, id]
      const anchors = mergeAnchor(startData.anchors, anchor)
      const indexes = anchors.map((anchor) => anchor.slice().pop()!)
      action.select(ids, anchors, indexes)
      return
    }
    action.select([id], [anchor], [index])
  }

  if (!treeData?.length) {
    return <></>
  }

  const result: ReactElement[] = treeData.map((node: TreeNode, index) => (
    <Node
      node={node}
      indent={[0]}
      index={index}
      parentCount={treeData.length - 1}
      key={node[key] as string}
      lock={lock}
      hidden={hidden}
      dragStart={dragStart}
      dragEnter={dragEnter}
      dragOver={dragOver}
      dragLeave={dragLeave}
      dragEnd={dragEnd}
      drop={drop}
      mouseDown={mouseDown}
      draggable={draggable}
      checkable={checkable}
      icon={icon}
      action={action}
      children={children}
      switcherIcon={switcherIcon}
    />
  ))

  return result
}

export default Wrapper
