import { stop } from '@/helper'
import { useAction } from '@/hooks/useAction'

const CheckBox = ({ name, node }: { name: string; node: TreeNode }) => {
  const action = useAction()
  const handleChange = (checked: boolean, name: string) => {
    const anchor = name.split(',').map(Number)
    action.checked(anchor, checked)
  }
  return (
    <input
      name={name}
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
