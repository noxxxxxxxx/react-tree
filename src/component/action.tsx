import { ReactComponent as PreviewClose } from '@/assets/invisible.svg'
import { ReactComponent as PreviewOpen } from '@/assets/visible.svg'
import { ReactComponent as Unlock } from '@/assets/unlock.svg'
import { ReactComponent as Lock } from '@/assets/lock.svg'
import { stop } from '@/helper'
import { FC } from 'react'

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
        {node.lock ? <Lock className={`i-lock ${node.lock && 'show'}`} /> : <Unlock className="i-unlock" />}
        <span className="lock-dot">·</span>
      </div>
      <div
        onMouseDown={(e) => hidden?.(e, node)}
        onMouseUp={stop}
        className="hidden-wrap"
      >
        {node.hidden ? (
          <PreviewClose className={`i-invisible ${node.hidden ? 'show' : ''}`} />
        ) : (
          <PreviewOpen className="i-visible" />
        )}
        <span className="visible-dot">·</span>
      </div>
    </div>
  )
}

export default Action
