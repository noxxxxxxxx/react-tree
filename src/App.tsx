import Tree from './index'
import '@/style/style.scss'
import { useEffect, useState } from 'react'
// import Tree from '../dist/index'
// import '../dist/style.css'

const api = 'https://mock.apifox.cn/m1/3170270-0-default/data'
const App: React.FC = () => {
  const [data, setData] = useState<TreeNode[]>([
    { name: 'Expand to load', id: '0' },
    { name: 'Expand to load', id: '1' },
    { name: 'Tree Node', id: '2' },
  ])

  // It's just a simple demo. You can use tree map to optimize update perf.
  const updateTreeData = (list, key: React.Key, children) =>
    list.map((node) => {
      if (node.id === key) {
        console.log(node.id, key, '----', children)
        return {
          ...node,
          children,
        }
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        }
      }
      return node
    })
  const onLoadData = (anchor: number[], key: React.Key, children: TreeNode[]) =>
    new Promise<void>((resolve) => {
      if (children.length) {
        resolve()
        return
      }
      setTimeout(() => {
        setData((origin) =>
          updateTreeData(origin, key, [
            { name: 'Child Node', id: `${key}-0` },
            { name: 'Child Node', id: `${key}-1` },
          ]),
        )
        resolve()
      }, 1000)
      setTimeout(() => console.log(data), 1000)
    })

  const config = {
    foldIconDisplay: 'always',
    loadData: onLoadData,
    checkable: true,
  }

  // useEffect(() => {
  //   let ignore = false
  //   const fetchData = async () => {
  //     const res = await fetch(api)
  //     if (ignore) return
  //     ignore = true
  //     const { data } = await res.json()

  //     // extend data whatever you need
  //     // const extendedList = extendProperty(data, {
  //     //   slot: true,
  //     // })
  //     setData(data)
  //   }
  //   fetchData()
  //   return () => {
  //     ignore = true
  //   }
  // }, [])

  return (
    <Tree
      {...config}
      data={data}
    />
    // <div>wewe</div>
  )
}

export default App
