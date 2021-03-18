/**
 * webpack 打包基本依赖
 */
const path = require('path');
const baseEntry = path.resolve(__dirname, '../src/index.tsx');
const plugins = require('./common/plugins');
const rules = require('./common/rules');
const optimization = require('./common/optimization');

module.exports = {
    mode: process.env.NODE_ENV === 'dev'? 'development': 'production',
    entry: 
      process.env.NODE_ENV === 'dev'
      ? ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000', baseEntry] 
      : baseEntry,
    output: {
      path: path.resolve(__dirname,'../dist'),
      filename: './static/js/[name]_[hash:8].js'
    },
    module: {
      rules
    },
    optimization,
    plugins: plugins(),
    resolve: {
      extensions: ['.wasm', '.mjs', '.ts', '.tsx', '.js', '.json'], // 自动解析确定的扩展
      mainFiles: ['index', 'module'],
      alias: {
        '@': path.join(__dirname, '..', 'src'), // @映射到src目录
        // 'react-dom': '@hot-loader/react-dom', // 该包支持对React Hook 热更新
        static: path.join(__dirname, '..', 'src/static') // 指向静态资源目录
      }
    }
}