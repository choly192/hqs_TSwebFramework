# 搭建步骤
## 1. 安装
 - webpack基本依赖安装
  `
  npm install webpack webpack-cli cross-env webpack-merge -D
  `
 - 热更新依赖安装
  `
  npm install express webapck-dev-middleware webapck-hot-middleware -D
  `
  - plugins
  `
  npm i -D webpackbar copy-webpack-plugin clean-webpack-plugin mini-css-extract-plugin optimize-css-assets-webpack-plugin
  `
  - babel 转译
  `
  npm install -D babel-loader @babel/core @babel/cli @babel/preset-env @babel/preset-react @babel/plugin-proposal-class-properties
  `
  - rules 基本模块
  `
  npm install -D style-loader css-loader postcss-loader less-loader file-loader url-loader autoprefixer postcss-flexbugs-fixes cssnano
  `
  - 依赖babel环境编译typescript
  `
  npm install -D @babel/preset-typescript
  `
  - 组件按需引入
  `
  npm install -D babel-plugin-import
  `
  - react 
  `
  npm install -S react react-dom react-redux react-router 
  `
  - 配置代码检查规则 eslint (eslint-plugin-typescript 、 typescript已存在)
  `
  @typescript-eslint/eslint-plugin babel-eslint @typescript-eslint/parser eslint eslint-config-prettier eslint-config-standard eslint-webpack-plugin eslint-plugin-node eslint-plugin-react eslint-plugin-prettier eslint-plugin-promise eslint-plugin-standard prettier
  `