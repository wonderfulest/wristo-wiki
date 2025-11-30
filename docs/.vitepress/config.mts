import { defineConfig } from 'vitepress'
import productSidebar from './sidebar/product'
import designSidebar from './sidebar/design'
import marketingSidebar from './sidebar/marketing'
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
      { text: '产品', link: '/01-product/01-overview' },
      { text: '设计', link: '/02-design/01-design-overview/01-brand-vision' },
      { text: '营销', link: '/03-marketing/01-after-sales-form' },
      { text: 'Studio', link: '/04-studio/00-index' },
      { text: 'ConnectIQ', link: '/05-connect-iq/00-index' },
      { text: '运维', link: '/06-ops/02-aws-basic-guide.md' }
    ],

    sidebar: {
      '/01-product/': productSidebar,
      '/02-design/': designSidebar,
      '/03-marketing/': marketingSidebar,
      '/04-studio/': studioSidebar,
      '/05-connect-iq/': connectIQSidebar,
      '/06-ops/': opsSidebar
    },

    search: {
      provider: 'local'
    },

    outline: false
  }
})
