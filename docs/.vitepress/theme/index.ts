import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

// Catppuccin 主题样式（flavor + accent）
// import '@catppuccin/vitepress/theme/mocha/mauve.css'

// 自定义覆盖样式：主要用来增强 sidebar 不同层级的视觉差异
import './custom.css'

import HomeDemo from './HomeDemo.vue'

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomeDemo', HomeDemo)
  }
}

export default theme