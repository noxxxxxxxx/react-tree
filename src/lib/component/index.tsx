import { type FC, type ReactElement, useEffect, useRef } from 'react'
import Node from './node'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { initTreeData } from '@/lib/store/treeSlice'
import { anchor, getConfig, initDefaultConfig } from '@/lib/helper'
import { useAction } from '@/lib/hooks/useAction'
import ContextMenu from '@/lib/component/menu'
import 'lu2/theme/edge/css/common/ui/LightTip.css'
import 'lu2/theme/edge/js/common/ui/LightTip.js'

const Tree: FC<Props & ConfigProps> = (props): ReactElement => {
  const { mouseEnter, mouseLeave, copy, cut, paste, remove, rightClick, handleTreeMouseDown } = useAction(props)
  const { data, foldIconDisplay } = props
  const { style } = getConfig()
  const lineRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const treeData = useSelector((state: RootState) => state.tree.treeData)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!data || data.length === 0) return
    initDefaultConfig(props) // init config
    dispatch(initTreeData(anchor(props.data, []))) // save tree data with anchor
    document.documentElement.addEventListener('mousedown', handleTreeMouseDown)
    return () => {
      document.documentElement.removeEventListener('mousedown', handleTreeMouseDown)
    }
  }, [data])

  return (
    <section
      className={foldIconDisplay === 'always' ? 'tree-fold-show' : ''}
      ref={containerRef}
      style={style}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onContextMenu={rightClick}
    >
      <div className="tree-container">
        <Node
          {...props}
          data={treeData}
          lineRef={lineRef}
          containerRef={containerRef}
        />
        <div
          ref={lineRef}
          className="tree-drop-line"
        />
      </div>
      <ContextMenu
        {...props}
        copy={copy}
        cut={cut}
        paste={paste}
        remove={remove}
      />
    </section>
  )
}

export default Tree
