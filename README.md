# 中文个人作品集

一个基于 Astro 的极简静态作品集，支持作品展示、个人简介、经历和 Markdown 文章，并可由 GitHub Actions 自动发布到 GitHub Pages。

本项目基于 [TimWitzdam/astro-minimal-portfolio-template](https://github.com/TimWitzdam/astro-minimal-portfolio-template) 改造，遵循 MIT 许可证。

## 开始使用

```bash
npm install
npm run dev
```

访问 `http://localhost:4321` 查看网站。

## 修改内容

- 所有个人资料和作品列表：`src/config.ts`
- 作品图片：`public/projects/`
- Markdown 文章：`src/content/posts/`
- 头像：`public/logo.webp`
- 详细步骤：[`作品上传指南.md`](./作品上传指南.md)

## 检查生产构建

```bash
npm run build
npm run preview
```

## 部署到 GitHub Pages

把项目推送到 GitHub 的 `main` 分支，然后在仓库的 `Settings → Pages → Source` 中选择 `GitHub Actions`。后续每次推送都会自动重新发布。

部署脚本同时支持：

- 用户主页仓库：`用户名.github.io`
- 普通项目仓库：任意仓库名称

## SEO 与收录

构建会自动生成：

- 每页独立的标题、描述、canonical URL 和 Open Graph 信息
- `robots.txt`
- `sitemap.xml`
- Person 结构化数据

使用 GitHub Pages 默认域名时无需额外配置。仓库改名后，部署会自动更新子路径。

未来绑定自定义域名时，在 GitHub 仓库的 `Settings → Secrets and variables → Actions → Variables` 中新增：

```text
PUBLIC_SITE_URL=https://你的域名
```

然后重新运行部署工作流即可更新 canonical、Open Graph、robots 和 sitemap 中的域名。

## 许可证

[MIT](./LICENSE)
