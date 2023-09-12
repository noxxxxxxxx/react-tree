import { ReactComponent as DeleteTwo } from '@/assets/remove.svg'
import { ReactComponent as Clipboard } from '@/assets/paste.svg'
import { ReactComponent as CuttingOne } from '@/assets/cut.svg'
import { ReactComponent as Copy } from '@/assets/copy.svg'
import { createPortal } from 'react-dom'
import { FC, ReactElement } from 'react'
import { stop } from '@/helper'
import './style.scss'

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
          <Copy className="i-icon" />
          复制
        </span>
        <span>⌘C</span>
      </li>
      <li onClick={() => paste?.()}>
        <span className="menu-item">
          <Clipboard className="i-icon" />
          粘贴
        </span>
        <span>⌘V</span>
      </li>
      <li onClick={() => cut?.()}>
        <span className="menu-item">
          <CuttingOne className="i-icon" />
          剪切
        </span>
        <span>⌘X</span>
      </li>
      <li onClick={() => remove?.()}>
        <span className="menu-item">
          <DeleteTwo className="i-icon" />
          删除
        </span>
        <span>Del</span>
      </li>
    </ul>,
    document.body,
  )
}

export default Menu
