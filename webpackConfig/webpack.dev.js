/**
 * 开发环境打包构建
 */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const base = require('./webpack.base');
const env = require('./env/dev');
const globalVariable = require('./env/commonEnv');
module.exports = merge(base, {
  plugins: [new webpack.DefinePlugin({ ...env, ...globalVariable })],
  devtool: 'source-map'
});
