module.exports = {
  printWidth: 120,
  singleQuote: true,
  jsxSingleQuote: false,
  quoteProps: 'consistent',
  trailingComma: 'all',
  semi: false,
  singleAttributePerLine: true,
  htmlWhitespaceSensitivity: 'ignore', // 防止自动格式化时添加/删除标签中的空格
  plugins: [require.resolve('prettier-plugin-packagejson')],
}
