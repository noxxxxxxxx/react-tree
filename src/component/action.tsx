import { FC } from 'react'
import { stop } from '@/helper'
import { Lock, PreviewClose, PreviewOpen, Unlock } from '@icon-park/react'

const Action: FC<Props & ConfigProps> = (props) => {
  const { node, lock, hidden } = props

  if (!node) return <></>

  return (
    <div className="action">
      <div
        onMouseDown={(e) => lock?.(e, node)}
        onMouseUp={stop}
        className="lock-wrap"
      >
        {node.lock ? (
          <Lock
            className={`i-lock ${node.lock && 'show'}`}
            theme="outline"
            size="12"
            fill="#969696"
            strokeWidth={4}
          />
        ) : (
          <Unlock
            className="i-unlock"
            theme="outline"
            size="12"
            fill="#969696"
            strokeWidth={4}
          />
        )}
        <span className="lock-dot">·</span>
      </div>
      <div
        onMouseDown={(e) => hidden?.(e, node)}
        onMouseUp={stop}
        className="hidden-wrap"
      >
        {node.hidden ? (
          <PreviewClose
            className={`i-invisible ${node.hidden ? 'show' : ''}`}
            theme="filled"
            size="12"
            fill="#969696"
            strokeWidth={4}
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
        ) : (
          <PreviewOpen
            className="i-visible"
            theme="outline"
            size="12"
            fill="#969696"
            strokeWidth={4}
          />
        )}
        <span className="visible-dot">·</span>
      </div>
    </div>
  )
}

export default Action
