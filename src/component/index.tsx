import { type FC, type ReactElement, useEffect, useRef, useState } from 'react'
import { patchNodes, getConfig, initConfig } from '@/helper'
import { useDispatch, useSelector } from 'react-redux'
import { FoldIconDisplay } from '@/helper/const'
import { initTreeData } from '@/store/treeSlice'
import { useAction } from '@/hooks/useAction'
import ContextMenu from '@/component/menu'
import classNames from 'classnames'
import { RootState } from '@/store'
import Wrapper from './node/wrapper'
import { emitter } from '@/event'

const Tree: FC<Props & ConfigProps> = (props): ReactElement => {
  const { mouseEnter, mouseLeave, copy, cut, paste, remove, rightClick, handleTreeMouseDown } = useAction()
  const { data, theme, searchValue } = props
  const [config, setConfig] = useState<Window['$tree']>()
  const lineRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const treeData = useSelector((state: RootState) => state.tree.treeData)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!data || data.length === 0) return
    initConfig(props)
    setConfig(getConfig())
    dispatch(initTreeData(patchNodes(data, []))) // init tree data
    document.documentElement.addEventListener('mousedown', handleTreeMouseDown)
    return () => {
      document.documentElement.removeEventListener('mousedown', handleTreeMouseDown)
    }
  }, [data])

  useEffect(() => {
    emitter.emit('filter', searchValue)
  }, [searchValue])

  if (!config) return <></>

  return (
    <section
      className={classNames(
        config.foldIconDisplay === FoldIconDisplay.always ? 'tree-fold-show' : '',
        theme ? `theme-${theme}-tree` : 'theme-default-tree',
      )}
      ref={containerRef}
      style={config.style}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onContextMenu={rightClick}
    >
      <div className="tree-container">
        <Wrapper
          {...config}
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
        {...config}
        copy={copy}
        cut={cut}
        paste={paste}
        remove={remove}
      />
    </section>
  )
}

export default Tree
