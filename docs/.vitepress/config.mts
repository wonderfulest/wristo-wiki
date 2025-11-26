import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Wristo Wiki',
  description: 'wristo 产品 / 设计 / 工程 / 运维一体化知识库',
  base: '/',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '产品', link: '/product/overview' },
      { text: '设计', link: '/design/0x01_设计理念/0x01_品牌视觉定位' },
      { text: '工程', link: '/engineering/architecture' },
      { text: '运维', link: '/ops/faq' }
    ],

    sidebar: {
      '/product/': [
        {
          text: '产品',
          items: [
            { text: '产品概览', link: '/product/overview' },
            { text: '核心能力', link: '/product/features' },
            { text: '路线图', link: '/product/roadmap' }
          ]
        }
      ],
      '/design/': [
        {
          text: '1. 设计理念',
          items: [
            { text: '1.1 品牌视觉定位', link: '/design/0x01_设计理念/0x01_品牌视觉定位' },
            { text: '1.2 用户画像', link: '/design/0x01_设计理念/0x02_用户画像' },
            { text: '1.3 核心体验价值', link: '/design/0x01_设计理念/0x03_核心体验价值' },
            { text: '1.4 屏幕差异设计理念', link: '/design/0x01_设计理念/0x04_屏幕差异设计理念' }
          ]
        },
        {
          text: '2. 设计规范',
          items: [
            { text: '2.1 画布尺寸和模板', link: '/design/0x02_设计规范/0x01_画布尺寸和模板' },
            { text: '2.2 颜色规范', link: '/design/0x02_设计规范/0x02_颜色规范' },
            { text: '2.3 字体规范', link: '/design/0x02_设计规范/0x03_字体规范' },
            { text: '2.4 布局系统', link: '/design/0x02_设计规范/0x04_布局系统' },
            { text: '2.5 图标规范', link: '/design/0x02_设计规范/0x05_图标规范' }
          ]
        },
        {
          text: '3. 表盘模板库',
          items: [
            { text: '3.1 时间布局模板', link: '/design/0x03_表盘模板库/0x01_时间布局模板' },
            { text: '3.2 指针表盘模板', link: '/design/0x03_表盘模板库/0x02_指针表盘模板' },
            { text: '3.3 信息区模板', link: '/design/0x03_表盘模板库/0x03_信息区模板' }
          ]
        },
        {
          text: '4. 素材库',
          items: [
            { text: '4.1 背景图', link: '/design/0x04_素材库/0x01_背景图' },
            { text: '4.2 动态素材', link: '/design/0x04_素材库/0x02_动态素材' },
            { text: '4.3 字体库', link: '/design/0x04_素材库/0x03_字体库' },
            { text: '4.4 图标库', link: '/design/0x04_素材库/0x04_图标库' },
            { text: '4.5 SVG 元件', link: '/design/0x04_素材库/0x05_SVG元件' },
            { text: '4.6 预设调色盘', link: '/design/0x04_素材库/0x06_预设调色盘' }
          ]
        },
        {
          text: '5. 开发对接文档',
          items: [
            { text: '5.1 资源命名规范', link: '/design/0x05_开发对接文档/0x01_资源命名规范' },
            { text: '5.2 文件结构', link: '/design/0x05_开发对接文档/0x02_文件结构' },
            { text: '5.3 动态规则', link: '/design/0x05_开发对接文档/0x03_动态规则' },
            { text: '5.4 IconResolver 对应表', link: '/design/0x05_开发对接文档/0x04_IconResolver对应表' },
            { text: '5.5 字体导入规范', link: '/design/0x05_开发对接文档/0x05_字体导入规范' },
            { text: '5.6 性能要求', link: '/design/0x05_开发对接文档/0x06_性能要求' }
          ]
        },
        {
          text: '6. 教程与案例',
          items: [
            { text: '6.1 Figma 流程', link: '/design/0x06_教程与案例/0x01_Figma流程' },
            { text: '6.2 等宽数字教程', link: '/design/0x06_教程与案例/0x02_大时间等宽数字制作' },
            { text: '6.3 字体制作', link: '/design/0x06_教程与案例/0x03_字体制作' },
            { text: '6.4 背景处理', link: '/design/0x06_教程与案例/0x04_背景处理' },
            { text: '6.5 多设备适配', link: '/design/0x06_教程与案例/0x05_多设备适配' },
            { text: '6.6 常见错误指南', link: '/design/0x06_教程与案例/0x06_常见错误指南' },
            { text: '6.7 新人速成', link: '/design/0x06_教程与案例/0x07_设计师新人速成' },
            { text: '6.8 发布 Checklist', link: '/design/0x06_教程与案例/0x08_发布Checklist' }
          ]
        }
      ],
      '/engineering/': [
        {
          text: '工程',
          items: [
            { text: '技术架构', link: '/engineering/architecture' },
            { text: '前端规范（Vue 3）', link: '/engineering/frontend' },
            { text: 'API 概览', link: '/engineering/api' }
          ]
        }
      ],
      '/ops/': [
        {
          text: '运维 & 使用',
          items: [
            { text: 'FAQ', link: '/ops/faq' },
            { text: '更新日志', link: '/ops/changelog' }
          ]
        }
      ]
    },

    search: {
      provider: 'local'
    },

    outline: false
  }
})
