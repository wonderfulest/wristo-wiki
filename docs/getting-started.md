# 快速开始

本文档介绍如何在本地运行 Wristo Wiki，以及如何部署到 Vercel。

## 环境要求

- Node.js：推荐 **Node 18+**（至少 Node 16+）
- 包管理器：`npm`（也可以使用 `pnpm` / `yarn`，命令需自行替换）

## 一、初始化与本地运行

以下命令假设你在仓库根目录：`wristo-wiki-design/`。

### 1. 初始化 VitePress（仅首次需要）

如果你还没有初始化 VitePress，可以执行：

```bash
npm create vitepress@latest
```

按交互提示选择：

1. 项目类型：选择 **Existing project**
2. Docs 目录：输入 `docs`
3. 主题：默认主题即可（已在 `.vitepress` 中做自定义）

### 2. 安装依赖

进入 `docs` 目录安装依赖：

```bash
cd docs
npm install
```

安装完成后，项目根目录下会出现 `docs/node_modules` 等文件夹，编辑器关于 `vitepress` / `vue` 的报错也会消失。

### 3. 启动开发服务

在 `docs` 目录中启动本地开发服务器：

```bash
npm run dev
```

或根据脚手架生成的脚本，也可能是：

```bash
npm run docs:dev
```

启动成功后，终端会输出本地访问地址，例如：

```bash
  > Local:   http://localhost:5173/
```

在浏览器打开该地址即可预览 Wristo Wiki。

## 二、构建静态文件

部署到生产环境前，需要先构建静态文件。

仍然在 `docs` 目录执行：

```bash
npm run build
```

或：

```bash
npm run docs:build
```

构建完成后，静态文件会输出到：

- `docs/.vitepress/dist/`

## 三、部署到 Vercel

下面是使用 Vercel 进行托管的推荐流程。

### 1. 准备仓库

1. 确保本地代码已提交到 Git 仓库（GitHub / GitLab 等）。
2. 将 `wristo-wiki-design` 仓库推送到远程：

```bash
git add .
git commit -m "chore: init Wristo Wiki with vitepress"
git push origin main
```

### 2. 在 Vercel 上创建项目

1. 打开 [https://vercel.com](https://vercel.com) 并登录。
2. 点击 **New Project**，选择刚推送的 `wristo-wiki-design` 仓库。
3. 如果 Vercel 没有自动识别构建设置，可以手动指定：

   - **Framework Preset**：`Vite` 或 `Other` 均可（VitePress 基于 Vite）。
   - **Root Directory**：
     - 如果直接从根目录构建，请保持为空（使用仓库根目录）。
     - 如果希望从 `docs` 目录构建，可以在这里选择 `docs` 作为 Root Directory。

### 3. 配置构建命令与输出目录

具体配置取决于构建发生在“仓库根目录”还是 `docs` 目录。

#### 方案 A：以 `docs` 为 Root Directory（推荐给文档仓库）

- Root Directory：`docs`
- Build Command：`npm run build` 或 `npm run docs:build`
- Output Directory：`.vitepress/dist`

#### 方案 B：以仓库根目录为 Root Directory

这种情况下，建议在仓库根目录添加一个 `package.json`，并在其中代理脚本至 `docs` 目录，例如：

```json
{
  "scripts": {
    "docs:dev": "cd docs && npm run dev",
    "docs:build": "cd docs && npm run build"
  }
}
```

然后在 Vercel 中设置：

- Build Command：`npm run docs:build`
- Output Directory：`docs/.vitepress/dist`

> 实际使用中可以根据团队偏好选择 A 或 B，两种方案都可以兼容当前目录结构。

### 4. 首次部署与预览

配置完成后点击 **Deploy**：

- Vercel 会自动拉取代码、安装依赖、执行构建，并将 `.vitepress/dist` 输出部署为静态站点。
- 部署完成后会生成一个形如 `https://xxx.vercel.app` 的预览地址。

### 5. 绑定自定义域名（可选）

在 Vercel 的项目设置中，可以绑定如 `wiki.wristo.app` 这类自定义域名：

1. 在 **Domains** 中添加自定义域名。
2. 按提示在域名服务商处配置 DNS 记录（如 CNAME 到 `cname.vercel-dns.com`）。

## 四、后续维护建议

- 任何对文档的修改（新增 Markdown 页面、调整导航等）
  - 提交到主分支后，Vercel 会自动触发重新构建与部署。
- 建议在 `README.md` 中保持一份简要的“如何本地运行 & 部署”的说明，方便新同学快速上手。
