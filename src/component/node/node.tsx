import { useState, type FC, type ReactElement } from 'react'
import { getFields, prevent } from '@/helper'
import CheckBox from '../checkbox'
import Action from '../action'
import Indent from '../indent'
import Icon from '../icon'
import { emitter } from '@/event'
import Highlight from './hightlight'

const Node: FC<Props & NodeProps & ConfigProps> = (props): ReactElement => {
  const {
    node,
    index,
    indent,
    parentCount,
    lock,
    hidden,
    dragStart,
    dragEnter,
    dragOver,
    dragLeave,
    dragEnd,
    drop,
    mouseDown,
    draggable,
    checkable,
    loadData,
    icon,
    action,
    switcherIcon,
  } = props

  const { children, key, name } = getFields()
  const [title, setTitle] = useState<string[]>([node[name] as string])
  const [searchValue, setSearchValue] = useState('')
  if (!node) return <></>

  let childrenNodes = node[children] as TreeNode[]
  if (childrenNodes) {
    childrenNodes = childrenNodes.slice().reverse()
  }
  emitter.on('filter', (keywords: string | undefined) => {
    const originName = node[name] as string
    if (keywords === '') {
      if (title[0] === originName) return
      setTitle([originName])
      return
    }
    if (keywords && originName.indexOf(keywords) !== -1) {
      console.log('trigger', keywords, originName)
      setSearchValue(keywords)
      setTitle(originName.split(keywords))
    } else {
      setTitle([originName])
    }
  })

  return (
    <div
      className="node-item"
      key={node[key] as string}
    >
      <div
        className="node-info"
        data-id={node[key]}
        data-root={node.root}
        data-lock={node.lock}
        data-hidden={node.hidden}
        data-anchor={node.anchor}
        data-expand={node.expand}
        data-index={parentCount - index!}
      >
        <div
          className={`node-label ${node?.selected ? 'selected' : ''} ${node?.edit ? 'edit' : ''}`}
          style={{ color: node.hidden ? '#bebebe' : 'inherit' }}
          draggable={!node.root && !node.lock && draggable}
          onDragStart={(e) => dragStart(e, node.id!, node.anchor!, parentCount - index)}
          onDragEnter={(e) => dragEnter(e, node.anchor!)}
          onDragOver={(e) =>
            dragOver(
              e,
              node.root!,
              node.slot!,
              node.id!,
              node.anchor!,
              parentCount - index,
              node?.children?.length || 0,
            )
          }
          onDragLeave={(e) => dragLeave(e, node.anchor!)}
          onDragEnd={(e) => dragEnd(e, node.anchor!)}
          onDrop={(e) => drop(e, node.root!, node.anchor!)}
          onMouseDown={(e) => mouseDown(e, node.id, node.anchor, index)}
        >
          <Indent
            node={node}
            virtual={true}
            indent={indent}
          />
          {checkable && (
            <CheckBox
              name={node.anchor!.join()}
              node={node}
            />
          )}
          <div className="node-name">
            <Icon
              Icom={icon || node.icon}
              node={node}
            />
            <span>
              <Highlight
                list={title}
                keywords={searchValue}
                matchStyle={{ color: 'rgb(255,82,82)' }}
              />
            </span>
          </div>
        </div>
        <div className="fold-wrap">
          <Indent
            node={node}
            virtual={false}
            indent={indent}
            expand={action.expand}
            loadData={loadData}
            switcherIcon={switcherIcon}
          />
        </div>
        {!node.root && (
          <Action
            node={node}
            lock={lock}
            hidden={hidden}
            prevent={prevent}
          />
        )}
      </div>
      {childrenNodes && (
        <div
          className="node-children"
          style={{
            color: node.hidden ? '#bebebe' : 'inherit',
          }}
        >
          {childrenNodes.map((childNode: TreeNode, index: number) => (
            <Node
              {...props}
              index={index}
              node={childNode}
              indent={indent!.concat([0])}
              parentCount={(childNode[children] as TreeNode[]).length - 1}
              key={childNode[key] as string}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Node
