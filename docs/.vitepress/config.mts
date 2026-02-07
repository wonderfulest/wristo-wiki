import { defineConfig } from 'vitepress'
import productSidebar from './sidebar/product'
import designerQuickstartSidebar from './sidebar/designer-quickstart'
import designerQuickstartZhSidebar from './sidebar/zh/designer-quickstart-zh'
import promotionQuickstartSidebar from './sidebar/promotion-quickstart'
import promotionQuickstartZhSidebar from './sidebar/zh/promotion-quickstart-zh'
import connectIQSidebar from './sidebar/connect-iq'
import studioSidebar from './sidebar/studio'
import opsSidebar from './sidebar/ops'

export default defineConfig({
  base: '/',

  // 顶部站点标题在部分主题区域会优先读取这里；避免回退显示为默认的 "VitePress"
  lang: 'en-US',
  title: 'Wristo Wiki',
  description: 'Wristo product / design / engineering / ops knowledge base',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]
  ],

  // 多语言站点配置：默认英文（root），中文在 /zh/
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      title: 'Wristo Wiki',
      description: 'Wristo product / design / engineering / ops knowledge base'
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'Wristo Wiki',
      description: 'wristo 产品 / 设计 / 工程 / 运维一体化知识库'
    }
  },

  // 公共主题配置（所有语言生效）
  themeConfig: {
    siteTitle: 'Wristo Wiki',
    // 导航目前统一为英文（默认语言），多语言页面通过 / 与 /zh/ 路径区分
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Design', link: '/02-designer-quickstart/01-getting-started' },
      { text: 'Promotion', link: '/03-promotion/01-getting-started' }
    ],
    sidebar: {
      '/02-designer-quickstart/': designerQuickstartSidebar,
      '/zh/02-designer-quickstart/': designerQuickstartZhSidebar,
      '/03-promotion/': promotionQuickstartSidebar,
      '/zh/03-promotion/': promotionQuickstartZhSidebar
    },
    outline: false
  }
})
