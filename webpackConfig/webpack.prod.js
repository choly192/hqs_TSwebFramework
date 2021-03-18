/**
 * 生产时打包构建
 */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
// 压缩JS文件（webpack在构建时内置了该插件 如果需要对该插件进行配置 就需要安装）
const TerserPlugin = require('terser-webpack-plugin');
const env = require('./env/prod');
const globalVariable = require('./env/commonEnv');
const base = require('./webpack.base');
module.exports = merge(base, {
  plugins: [new webpack.DefinePlugin({ ...env, ...globalVariable })],
  // 打包优化
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true // 多进程打包提升构建速度
      })
    ]
  },
  devtool: 'source-map'
});
