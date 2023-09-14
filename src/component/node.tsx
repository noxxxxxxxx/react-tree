import { find, findLabel, getFields, mergeAnchor, prevent } from '@/helper'
import { type FC, type ReactElement } from 'react'
import { useAction } from '@/hooks/useAction'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import CheckBox from './checkbox'
import Action from './action'
import Indent from './indent'
import Icon from './icon'

const Node: FC<Props & ConfigProps> = (props): ReactElement => {
  const {
    data,
    lineRef,
    containerRef,
    defaultSelectMulti,
    draggable,
    checkable,
    icon,
    switcherIcon,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    onDragEnd,
    onDragStart,
  } = props
  const treeData = data
  const action = useAction()
  const startData = useSelector((state: RootState) => state.tree.start)
  const base = (containerRef?.current as HTMLElement)?.getBoundingClientRect().top
  const { key } = getFields()

  const lock = (e: React.SyntheticEvent, node: TreeNode) => {
    e.stopPropagation()
    action.lock(node.anchor, !node.lock)
  }

  const hidden = (e: React.SyntheticEvent, node: TreeNode) => {
    e.stopPropagation()
    action.hidden(node.anchor, !node.hidden)
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

  const mouseDown = (e: MouseEvent, id: string, anchor: number[], index: number) => {
    if (startData.ids.includes(id) || e.button === 2) return
    // if (e.shiftKey) {}
    if (e.metaKey && defaultSelectMulti) {
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

  const node = (tree: TreeNode[], indent: any[], parentCount: number) =>
    tree.map((item: TreeNode, index) => (
      <div
        className="node-item"
        key={item[key] as string}
      >
        <input
          className="tree-hidden"
          type="checkbox"
          id={`fold-${item.id}`}
          name="node-fold"
        />
        <div
          className="node-info"
          data-root={item.root}
          data-lock={item.lock}
          data-hidden={item.hidden}
          data-anchor={item.anchor}
          data-id={item[key]}
          data-index={parentCount - index}
        >
          <div
            className={`node-label ${item?.selected ? 'selected' : ''} ${item?.edit ? 'edit' : ''}`}
            style={{ color: item.hidden ? '#bebebe' : 'inherit' }}
            draggable={!item.root && !item.lock && draggable}
            onDragStart={(e) => dragStart(e, item.id, item.anchor, parentCount - index)}
            onDragEnter={(e) => dragEnter(e, item.anchor)}
            onDragOver={(e) =>
              dragOver(e, item.root, item.slot, item.id, item.anchor, parentCount - index, item?.children?.length || 0)
            }
            onDragLeave={(e) => dragLeave(e, item.anchor)}
            onDragEnd={(e) => dragEnd(e, item.anchor)}
            onDrop={(e) => drop(e, item.root, item.anchor)}
            onMouseDown={(e) => mouseDown(e, item.id, item.anchor, index)}
          >
            <Indent
              node={item}
              virtual={true}
              indent={indent}
              switcherIcon={switcherIcon}
            />
            {checkable && (
              <CheckBox
                name={item.anchor.join()}
                node={item}
              />
            )}
            <div className="node-name">
              <Icon
                Icom={icon || item.icon}
                node={item}
              />
              <span>{item.name}</span>
            </div>
          </div>
          <div className="fold-wrap">
            <Indent
              node={item}
              virtual={false}
              indent={indent}
              switcherIcon={switcherIcon}
            />
          </div>
          {!item.root && (
            <Action
              node={item}
              lock={lock}
              hidden={hidden}
              prevent={prevent}
            />
          )}
        </div>
        {item.children && (
          <div
            className="node-children"
            style={{
              color: item.hidden ? '#bebebe' : 'inherit',
            }}
          >
            {node(item.children.slice().reverse(), indent.concat([0]), item.children.length - 1)}
          </div>
        )}
      </div>
    ))
  return <>{node(treeData.slice().reverse(), [0], treeData.length - 1)}</>
}

export default Node
