/**
 * Package dependent pligins
 */
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将CSS提取到单独的文件中 它为每个包含CSS的JS文件创建一个CSS文件 它支持CSS和SourceMap的按需加载
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩CSS文件
const ESLintPlugin = require('eslint-webpack-plugin');
module.exports = () => {
  const modulePlugins = [
    new WebpackBar(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../../src/static'),
          to: './static', // 打包到dist下的static
          noErrorOnMissing: true
        },
        {
          from: path.join(
            __dirname,
            `../../src/config/system.${process.env.NODE_ENV === 'dev' ? process.env.NODE_ENV : 'prod'}.config.js`
          ),
          to: './config/systemConfig.js',
          noErrorOnMissing: true
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../../src/index.html'),
      filename: 'index.html',
      chunks: ['main', 'vendor', 'commons'],
      inject: true,
      minify: true
    })
  ];
  if (process.env.NODE_ENV === 'dev') {
    const devPlugins = [
      new webpack.HotModuleReplacementPlugin(), // HMR 热替换模块 开发模式搭配WDS WDM使用
      new ESLintPlugin({ 
        cache: true,
        eslintPath: require.resolve('eslint'),
        resolvePluginsRelativeTo: __dirname,
        ignore: true,
        useEslintrc: true
       })
    ];
    return [...modulePlugins, ...devPlugins];
  } else {
    const proPlugins = [
      new CleanWebpackPlugin(),
      new OptimizeCssAssetsWebpackPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano')
      }),
      new MiniCssExtractPlugin({
        filename: './static/css/[name]-[id].[chunkhash:8].bundle.css' // 指定打包后的css
      }) // 用来抽离css文件 不用打包到js文件里
    ];
    return [...modulePlugins, ...proPlugins];
  }
};
