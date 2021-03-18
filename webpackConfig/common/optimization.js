/**
 * optimization
 */
module.exports = optimization = {
  splitChunks: {
    minChunks: 1, // 模块至少使用次数
    minSize: 0, // 引入文件大于0kb才进行分割
    chunks: 'all', // async 异步引入代码分割  initial同步引入代码分割
    cacheGroups: {
      // 缓存组  将所有的模块放在缓存里一起分割打包
      commons: {
        name: 'commons',
        chunks: 'initial',
        minChunks: 2
      },
      vendors: {
        // 自定义打包模块
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
      }
    }
  }
};
