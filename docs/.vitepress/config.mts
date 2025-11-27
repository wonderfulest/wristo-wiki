import { defineConfig } from 'vitepress'
import productSidebar from './sidebar/product'
import designSidebar from './sidebar/design'
import connectIQSidebar from './sidebar/connect-iq'
import studioSidebar from './sidebar/studio'
import opsSidebar from './sidebar/ops'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Wristo Wiki',
  description: 'wristo 产品 / 设计 / 工程 / 运维一体化知识库',
  base: '/',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '产品', link: '/product/overview' },
      { text: '设计', link: '/design/0x01_设计理念/0x01_品牌视觉定位' },
      { text: 'ConnectIQ', link: '/connect-iq/' },
      { text: 'Studio', link: '/studio/' },
      { text: '运维', link: '/ops/0x00-AWS基础运维必读' }
    ],

    sidebar: {
      '/product/': productSidebar,
      '/design/': designSidebar,
      '/connect-iq/': connectIQSidebar,
      '/studio/': studioSidebar,
      '/ops/': opsSidebar
    },

    search: {
      provider: 'local'
    },

    outline: false
  }
})
