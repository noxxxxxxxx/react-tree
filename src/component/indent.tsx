import { ReactComponent as Loading } from '@/assets/loading.svg'
import { getFields } from '@/helper'
import { FC, useState } from 'react'

const Indent: FC<Props & ConfigProps> = (props) => {
  const { indent, node, virtual, switcherIcon, expand, loadData } = props
  const { key, slot, children } = getFields()
  const [loading, setLoading] = useState(false)

  if (!node) return <></>

  const handleExpand = () => {
    if (loadData) {
      setLoading(true)
      loadData(node?.anchor, node[key] as React.Key, node[children] as TreeNode[]).then(() => {
        setLoading(false)
        expand?.(node.anchor, !node.expand)
      })
    } else {
      expand?.(node.anchor, !node.expand)
    }
  }

  return (
    <div className="node-indent">
      {indent?.map((_: number, index: number) => {
        return (
          <span key={index}>
            {!virtual && index === indent.length - 1 && (node[slot] as boolean) && (
              <div
                className="label-fold"
                onClick={() => handleExpand()}
              >
                {loading ? <Loading className="spin" /> : switcherIcon?.()}
              </div>
            )}
          </span>
        )
      })}
    </div>
  )
}

export default Indent
