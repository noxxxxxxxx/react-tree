export const siteData = JSON.parse("{\"base\":\"/\",\"lang\":\"en-US\",\"title\":\"\",\"description\":\"\",\"head\":[[\"link\",{\"rel\":\"icon\",\"type\":\"image/png\",\"sizes\":\"16x16\",\"href\":\"/logo.png\"}],[\"link\",{\"rel\":\"shortcut icon\",\"href\":\"/favicon.ico\"}]],\"locales\":{\"/\":{\"lang\":\"en-US\",\"title\":\"React Tree Component\",\"description\":\"A React tree component that looks similar to Figma tree, a tree ui component that has all the tree functionalities\"},\"/zh/\":{\"lang\":\"zh-CN\",\"title\":\"React Tree Component\",\"description\":\"React Tree 组件，拥有 Figma Tree 的样式，具备树组件的所有功能\"}}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
