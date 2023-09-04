import { Clipboard, Copy, CuttingOne, DeleteTwo } from '@icon-park/react'
import { createPortal } from 'react-dom'
import { FC, ReactElement } from 'react'
import { stop } from '@/lib/helper'
import './inedex.scss'

const Menu: FC<Props & ConfigProps> = (props): ReactElement => {
  const { copy, paste, cut, remove, contextMenu } = props

  if (!contextMenu) return <></>

  return createPortal(
    <ul
      onMouseUp={stop}
      onMouseDown={stop}
      onMouseMove={stop}
      onContextMenu={stop}
      className="tree-context-menu"
      data-paste="false"
    >
      <li onClick={() => copy?.()}>
        <span className="menu-item">
          <Copy
            theme="outline"
            size="14"
            fill="var(--icon)"
            strokeWidth={3}
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
          复制
        </span>
        <span>⌘C</span>
      </li>
      <li onClick={() => paste?.()}>
        <span className="menu-item">
          <Clipboard
            theme="outline"
            size="14"
            fill="var(--icon)"
            strokeWidth={3}
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
          粘贴
        </span>
        <span>⌘V</span>
      </li>
      <li onClick={() => cut?.()}>
        <span className="menu-item">
          <CuttingOne
            theme="outline"
            size="14"
            fill="var(--icon)"
            strokeWidth={3}
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
          剪切
        </span>
        <span>⌘X</span>
      </li>
      <li onClick={() => remove?.()}>
        <span className="menu-item">
          <DeleteTwo
            theme="outline"
            size="14"
            fill="var(--icon)"
            strokeWidth={3}
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
          删除
        </span>
        <span>Del</span>
      </li>
    </ul>,
    document.body,
  )
}

export default Menu
