import { getFields } from '@/helper'
import { FC } from 'react'

const Indent: FC<Props & ConfigProps> = (props) => {
  const { indent, node, virtual, switcherIcon } = props
  const { slot } = getFields()

  if (!node) return <></>

  return (
    <div className="node-indent">
      {indent?.map((_: number, index: number) => {
        return (
          <span key={index}>
            {!virtual && index === indent.length - 1 && (node[slot] as boolean) && (
              <label
                className="label-fold"
                htmlFor={`fold-${node.id}`}
              >
                {switcherIcon?.()}
              </label>
            )}
          </span>
        )
      })}
    </div>
  )
}

export default Indent
