import { getFields } from '@/lib/helper'
import { DownOne } from '@icon-park/react'
import { FC } from 'react'

const Indent: FC<Props & ConfigProps> = (props) => {
  const { indent, node, virtual } = props
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
                <DownOne
                  theme="filled"
                  size="12"
                  fill="#969696"
                  strokeWidth={4}
                  strokeLinejoin="miter"
                  strokeLinecap="square"
                />
              </label>
            )}
          </span>
        )
      })}
    </div>
  )
}

export default Indent
