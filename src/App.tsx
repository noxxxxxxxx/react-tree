// import Tree from './index'
// import '@/style/style.scss'
import { useEffect, useState } from 'react'
import Tree from '../dist/tree.es'
import '../dist/style.css'

const api = 'https://mock.apifox.cn/m1/3170270-0-default/data'
const App: React.FC = () => {
  const [data, setData] = useState<TreeNode[]>([])

  const config = {
    theme: 'default',
    // draggable: true,
    // icon: <div>这里是icon</div>,
    // indentSize: 30,
    // foldIconDisplay: 'always',
    fieldNames: {
      name: 'name',
      key: 'id',
      children: 'children',
      slot: 'slot',
    },
    // onDragStart: ({ event, node }) => {
    //   console.log(event, node)
    // },
    // onDragEnd: ({ event, node }) => {
    //   console.log(event, node)
    // },
    onDragOver: ({ event, node }) => {
      console.log(event, node)
    },
    onDragLeave: ({ event, node }) => {
      console.log(event, node)
    },
    onDragEnter: ({ event, node }) => {
      console.log(event, node)
    },
    onDrop: ({ event, node, dragNodes, dragNodesKeys }) => {
      console.log('drops----')
      console.log(event, node, dragNodes, dragNodesKeys)
    },
    // selectable: false
    // defaultSelectMulti: false,
    // expandParent: true,
    // expandAll: true,
    // reverse: true,
    // contextMenu: true,
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
      console.log(data)
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
    // <div>wewe</div>
  )
}

export default App
