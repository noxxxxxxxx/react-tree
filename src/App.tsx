import Tree from './index'
import '@/style/style.scss'
import { useEffect, useState } from 'react'

const api = 'https://mock.apifox.cn/m1/3170270-0-default/data'
const App: React.FC = () => {
  const [data, setData] = useState<TreeNode[]>([])
  const [searchValue, setSearchValue] = useState('')

  // Tree Config
  const config = {
    foldIconDisplay: 'always',
    expandAll: true,
  }

  const handleChange = (value: string) => {
    setSearchValue(value)
  }

  useEffect(() => {
    let ignore = false
    const fetchData = async () => {
      const res = await fetch(api)
      if (ignore) return
      ignore = true
      const { data } = await res.json()
      setData(data)
    }
    fetchData()
    return () => {
      ignore = true
    }
  }, [])

  return (
    <>
      <input
        type="text"
        onChange={(e) => handleChange(e.target.value)}
      />
      <Tree
        {...config}
        searchValue={searchValue}
        data={data}
      />
    </>
  )
}

export default App
