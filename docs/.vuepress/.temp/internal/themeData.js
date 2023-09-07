export const themeData = JSON.parse("{\"repo\":\"https://github.com/noxxxxxxxx/tree\",\"docsBranch\":\"doc\",\"editLink\":true,\"lastUpdated\":true,\"locales\":{\"/\":{\"selectLanguageName\":\"English\",\"selectLanguageText\":\"Language\",\"navbar\":[{\"text\":\"Gide\",\"link\":\"/\"}]},\"/zh/\":{\"selectLanguageText\":\"选择语言\",\"selectLanguageName\":\"简体中文\",\"navbar\":[{\"text\":\"指南\",\"link\":\"/zh/\"}]}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"navbar\":[],\"logo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebar\":\"auto\",\"sidebarDepth\":2,\"editLinkText\":\"Edit this page\",\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
