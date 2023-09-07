import { defaultTheme } from "vuepress";
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";

export default {
  head: [
    ["link", { rel: "icon", type: "image/png", sizes: "16x16", href: "/logo.png" }],
    ['link', { rel: "shortcut icon", href: "/favicon.ico" }],
  ],
  locales: {
    "/": {
      lang: "en-US",
      title: "React Tree Component",
      description:
        "A React tree component that looks similar to Figma tree, a tree ui component that has all the tree functionalities",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "React Tree Component",
      description:
        "React Tree 组件，拥有 Figma Tree 的样式，具备树组件的所有功能",
    },
  },
  theme: defaultTheme({
    repo: "https://github.com/noxxxxxxxx/tree",
    docsBranch: "doc",
    editLink: true,
    lastUpdated: true,
    locales: {
      "/": {
        selectLanguageName: "English",
        selectLanguageText: "Language",
        navbar: [
          {
            text: "Gide",
            link: "/",
          },
        ],
      },
      "/zh/": {
        selectLanguageText: "选择语言",
        selectLanguageName: "简体中文",
        navbar: [
          {
            text: "指南",
            link: "/zh/",
          },
        ],
      },
    },
    themePlugins: {
      mediumZoom: true,
      nprogress: true,
    },
    // backToTop: true,
    // prismjs: true,
  }),
  plugins: [
    googleAnalyticsPlugin({
      id: "G-405778348",
    }),
    // docsearchPlugin({
    //   // 配置项
    // }),
  ],
};
