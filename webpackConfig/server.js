/**
 * 热更新服务
 */
const webpack = require('webpack');
const path = require('path');
const express = require('express');
const os = require('os');
const app = express();
const open = require('open');
const devMiddleware = require('webpack-dev-middleware'); // 热更新
const hotMiddleware = require('webpack-hot-middleware'); // 热替换
const portfinder = require('portfinder'); // 自动获取有用端口
const globalVariable = require('./env/commonEnv');
const publicPathName = JSON.parse(globalVariable.publicPath);
// webpack打包配置
const webpackConfig = require('./webpack.dev.js');

// 执行中间件合并
const compiler = webpack(webpackConfig);

// 热更新
app.use(devMiddleware(compiler,{
  publicPath: publicPathName,
  // webpack-dev-middleware options
  // 统计信息
  stats: 'errors-only' // 不显示控制台打包信息
}));

// 热替换
app.use(hotMiddleware(compiler, {
  log: console.log,
  path: "/__webpack_hmr",
  heartbeat: 2000
}));

app.get('*', (req, res, next) => {
  const filename = path.join(__dirname, '../dist', 'index.html');
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});
/**
 * 获取本机IP
 */
const getIPAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
};

/**
 * 自动获取有用端口
 */
(async function(address) {8
  portfinder.basePort = 3000;
  const port = await portfinder
  .getPortPromise()
    .then(port => port)
    .catch(err => {
      console.log(err);
      return 8081;
    });
  app.listen(port, () => {
    const addressList = [`http://localhost:${port}${publicPathName}`, `http://${address}:${port}${publicPathName}`];
    console.log('Listening on the folowing address:');
    console.log('\x1b[96m',`${addressList[0]}`);
    console.log('\x1b[95m',`${addressList[1]}`);
    open(addressList[0], {wait: true});
  })
})(getIPAddress());
