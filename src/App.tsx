import { Tree } from 'figma-tree'
import 'figma-tree/dist/style.css'
import { useEffect, useState } from 'react'

const api = 'https://mock.apifox.cn/m1/3170270-0-default/data'
const App: React.FC = () => {
  const [data, setData] = useState<TreeNode[]>([])

  const config = {
    indentSize: 30,
    foldIconDisplay: 'always',
    defaultSelectMulti: false,
    expandParent: true,
    expandAll: true,
    fieldNames: {
      name: 'name',
      key: 'id',
      children: 'children',
      slot: 'slot',
    },
    reverse: true,
    contextMenu: true,
    // parentBgColor: 'red',
    // parentColor: '#fff',
    // childrenBgColor: 'blue',
    // childrenColor: '#fff',
  }

  useEffect(() => {
    let ignore = false
    const fetchData = async () => {
      const res = await fetch(api)
      if (ignore) return
      ignore = true
      const { data } = await res.json()

      // extend data whatever you need
      // const extendedList = extendProperty(data, {
      //   slot: true,
      // })
      setData(data)
    }
    fetchData()
    return () => {
      ignore = true
    }
  }, [])

  return (
    <Tree
      {...config}
      data={data}
    />
  )
}

export default App
