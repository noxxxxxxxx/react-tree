import { stop } from '@/helper'
import { useAction } from '@/hooks/useAction'
import { useEffect, useRef } from 'react'

const CheckBox = ({ name, node }: { name: string; node: TreeNode }) => {
  const inputRef = useRef(null)
  const action = useAction()
  const handleChange = (checked: boolean, name: string) => {
    const anchor = name.split(',').map(Number)
    action.checked(anchor, checked)
  }

  useEffect(() => {
    inputRef.current.indeterminate = node.halfChecked
  }, [node.halfChecked])

  return (
    <input
      name={name}
      ref={inputRef}
      type="checkbox"
      is="ui-checkbox"
      checked={node.checked}
      onMouseDown={stop}
      onClick={(e) => handleChange((e.target as HTMLInputElement).checked, name)}
      onChange={() => {}}
    ></input>
  )
}

export default CheckBox
