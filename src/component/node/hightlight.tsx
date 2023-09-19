type HighlightProps = {
  list: string[]
  keywords: string
  matchStyle?: { [key: string]: string }
}
/**
 * 高光组件
 * @param list {string} 文本[]
 * @param keywords 搜索关键字
 * @param style 匹配文本样式
 */
const Highlight = ({ list = [], keywords = '', matchStyle = {} }: HighlightProps) => {
  if (list.length === 1) {
    return list[0]
  }

  return (
    <>
      {list.map((str, index) => (
        <span key={index}>
          {str}
          {index === list.length - 1 ? null : <span style={matchStyle}>{keywords}</span>}
        </span>
      ))}
    </>
  )
}

export default Highlight
