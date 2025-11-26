
## Wristo Wiki（基于 Vue 3 + VitePress）

Wristo Wiki 是围绕 wristo 产品构建的统一知识库，使用 **Vue 3 + VitePress** 搭建，适合沉淀：

- **产品**：定位、目标用户、核心能力、路线图等
- **设计**：设计原则、Design Tokens、组件规范
- **工程**：技术架构、前端规范（Vue 3）、API 概览
- **运维**：FAQ、更新日志等

文档主目录在 `docs/`，VitePress 配置位于 `docs/.vitepress/`。

---

## 目录结构概览

```text
wristo-wiki-design/
  docs/
    index.md                # 首页（hero + HomeDemo 组件）
    getting-started.md      # 快速开始（本地运行 + 部署说明）
    product/
      overview.md           # 产品概览
      features.md           # 核心能力
      roadmap.md            # 路线图
    design/
      principles.md         # 设计原则
      tokens.md             # Design Tokens
      components.md         # 组件库
    engineering/
      architecture.md       # 技术架构
      frontend.md           # 前端规范（Vue 3）
      api.md                # API 概览
    ops/
      faq.md                # FAQ
      changelog.md          # 更新日志
    .vitepress/
      config.mts            # VitePress 主配置
      theme/
        index.ts            # 自定义主题入口（注册 HomeDemo 等组件）
        HomeDemo.vue        # 首页演示组件
```

---

## 本地开发

### 1. 环境要求

- Node.js：推荐 **Node 18+**（至少 Node 16+）
- 包管理器：`npm`（可以替换为 `pnpm` / `yarn`）

### 2. 初始化 VitePress（仅首次需要）

在项目根目录执行：

```bash
npm create vitepress@latest
```

按提示选择：

1. 项目类型：**Existing project**
2. Docs 目录：`docs`
3. 主题：默认主题

### 3. 安装依赖

进入 `docs` 目录安装依赖：

```bash
cd docs
npm install
```

安装完成后，编辑器中关于 `vitepress` / `vue` 类型缺失的报错会消失。

### 4. 启动开发服务器

在 `docs` 目录中运行：

```bash
npm run dev
```

或根据脚手架生成的脚本：

```bash
npm run docs:dev
```

终端将输出本地访问地址，例如：

```bash
  > Local:   http://localhost:5173/
```

在浏览器中访问该地址即可预览 Wristo Wiki。

---

## 构建与部署

### 1. 构建静态文件

在 `docs` 目录中执行：

```bash
npm run build
```

或：

```bash
npm run docs:build
```

构建完成后，静态文件位于：

- `docs/.vitepress/dist/`

### 2. 部署到 Vercel

1. 将仓库推送到 Git 托管平台（如 GitHub）：

   ```bash
   git add .
   git commit -m "chore: init Wristo Wiki with vitepress"
   git push origin main
   ```

2. 在 [Vercel](https://vercel.com) 新建项目，导入该仓库。

3. 配置 Root Directory 和构建输出（推荐两种方式之一）：

   **方案 A：Root Directory = `docs`（推荐）**

   - Root Directory：`docs`
   - Build Command：`npm run build` 或 `npm run docs:build`
   - Output Directory：`.vitepress/dist`

   **方案 B：Root Directory = 仓库根目录**

   - 在根目录新建 `package.json`，脚本示例：

     ```json
     {
       "scripts": {
         "docs:dev": "cd docs && npm run dev",
         "docs:build": "cd docs && npm run build"
       }
     }
     ```

   - 在 Vercel 中设置：
     - Build Command：`npm run docs:build`
     - Output Directory：`docs/.vitepress/dist`

4. 保存配置并点击 **Deploy**，等待构建完成后即可获得线上访问地址。

5. 如需绑定自定义域名（例如 `wiki.wristo.app`），在 Vercel 项目设置的 **Domains** 中添加域名并按照提示配置 DNS。

---

## 文档维护建议

- 所有内容修改（Markdown 文档、新增页面、导航配置等）合并到主分支后，Vercel 会自动重新构建和部署。
- 对于新加入的同学，可以优先阅读：
  - `docs/getting-started.md`：本地运行 & 部署流程
  - `docs/product/overview.md`：了解 wristo 的整体产品定位
  - `docs/design/principles.md` / `docs/engineering/frontend.md`：对齐设计与前端规范

