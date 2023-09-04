import { type FC, type ReactElement } from 'react'
import { findLabel, getFields, mergeAnchor, prevent } from '@/lib/helper'
import { useAction } from '@/lib/hooks/useAction'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import Action from './action'
import Indent from './indent'

const Node: FC<Props & ConfigProps> = (props): ReactElement => {
  const { data, lineRef, containerRef, defaultSelectMulti } = props
  const treeData = data
  const action = useAction(props)
  const startData = useSelector((state: RootState) => state.tree.start)
  const base = (containerRef?.current as HTMLElement)?.getBoundingClientRect().top
  const { key } = getFields()

  const lock = (e: DragEvent, node: TreeNode) => {
    e.stopPropagation()
    action.lock(node.anchor, !node.lock)
  }

  const hidden = (e: MouseEvent, node: TreeNode) => {
    e.stopPropagation()
    action.hidden(node.anchor, !node.hidden)
  }

  const dragStart = (e: DragEvent, id: string, anchor: number[], index: number) => {
    e.stopPropagation()
    action.select([id], [anchor], [index])
    window.$tree.drag.start.id = id
    window.$tree.dragNode = e.currentTarget as HTMLElement
  }

  const dragEnter = (e: DragEvent) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const dragOver = (
    e: DragEvent,
    root: boolean,
    group: boolean,
    id: string,
    anchor: number[],
    index: number,
    selfCount: number,
  ) => {
    e.stopPropagation()
    e.preventDefault()
    const target = e.currentTarget as HTMLElement
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
      lineRef.current.style.opacity = 0
      window.$tree.drag.over = false
      return
    }

    const y = e.pageY
    const baseY = target.getBoundingClientRect().top
    const middle = baseY + 30 / 2
    if (group && id !== window.$tree.drag.start.id) {
      // 拖拽到组中
      if (y > middle - 7 && y < middle + 7) {
        lineRef.current.style.opacity = 0
        target.style.boxShadow = 'inset 0 0 0px 1px blue'
        action.over(anchor, selfCount)
        console.log('移动到组中', anchor, selfCount)
        return
      }
    }

    lineRef.current.style.opacity = 1
    if (y > middle) {
      // 组被展开时，忽略当前元素
      const open = target?.nextSibling?.querySelector('label')?.control.checked === false
      if (group && open && selfCount > 0) {
        console.log('当前组是展开状态')
        lineRef.current.style.opacity = 0
        window.$tree.drag.over = false
        return
      }
      lineRef.current.style.top = `${baseY - (base || 0) + 30}px`
      action.over(overParent, index)
    } else {
      lineRef.current.style.top = `${baseY - (base || 0)}px`
      action.over(overParent, index + 1)
    }
    lineRef.current.style.left = `${findLabel(target)!.offsetLeft - 10}px`
  }

  /* 拖拽离开 */
  const dragLeave = (e: DragEvent) => {
    e.stopPropagation()
    const target = e.currentTarget as HTMLElement
    target.style.boxShadow = 'none'
  }

  /* 拖拽释放 */
  const drop = (e: DragEvent, root: boolean) => {
    e.stopPropagation()
    const target = e.currentTarget as HTMLElement
    lineRef.current.style.opacity = 0
    target.style.boxShadow = 'none'
    if (root || !window.$tree.drag.over) return
    console.log('drop - 开始移动')
    action.move()
  }

  const mouseDown = (e: MouseEvent, id: string, anchor: number[], index: number) => {
    if (startData.ids.includes(id) || e.button === 2) return
    if (e.shiftKey) {
    }
    if (e.metaKey && defaultSelectMulti) {
      console.log('按住 command')
      const ids = [...startData.ids, id]
      const anchors = mergeAnchor(startData.anchors, anchor)
      const indexes = anchors.map((anchor) => anchor.slice().pop()!)
      action.select(ids, anchors, indexes)
      return
    }
    action.select([id], [anchor], [index])
  }

  if (!treeData.length) {
    return <></>
  }

  console.log('render---', base)

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
            draggable={!item.root && !item.lock}
            onDragStart={(e) => dragStart(e, item.id, item.anchor, parentCount - index)}
            onDragEnter={(e) => dragEnter(e)}
            onDragOver={(e) =>
              dragOver(e, item.root, item.slot, item.id, item.anchor, parentCount - index, item?.children?.length || 0)
            }
            onDragLeave={(e) => dragLeave(e)}
            onDrop={(e) => drop(e, item.root)}
            onMouseDown={(e) => mouseDown(e, item.id, item.anchor, index)}
          >
            <Indent
              indent={indent}
              node={item}
              virtual={true}
            />
            <div className="node-name">
              {!!item.icon && (
                <i className="icon">
                  <img src={item.icon} />
                </i>
              )}
              <span>
                {item.name} - {item.anchor}
              </span>
            </div>
          </div>
          <div className="fold-wrap">
            <Indent
              indent={indent}
              node={item}
              virtual={false}
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
