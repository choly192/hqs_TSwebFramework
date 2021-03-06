/**
 * rules
 * 模块配置规则 （loader、解析器等选项）
 */
 const MiniCssExtractPlugin = require('mini-css-extract-plugin');

 module.exports = moduleRules = [
  {
    test: /\.(js(x?)|ts(x?))$/,
    use: ['babel-loader'],
    exclude: /(node_modules|bower_components)/
  },
  {
    test: /\.css$/,
    exclude: /\.module\.css$/,
    use: [
      process.env.NODE_ENV === 'dev'? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: false // 是否启用css模块s
        }
      }
    ]
  },
  {
    test: /\.less$/,
    exclude: /\.module\.less$/,
    use: [
      process.env.NODE_ENV === 'dev' ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          modules: false
        }
      },
      {
        loader: 'postcss-loader', // 解决浏览器兼容性  添加前缀
        options:{
          postcssOptions:{
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes')(),
              require('autoprefixer')({
                overrideBrowserslist: ['last 4 versions', '>5%']
              })
            ]
          }
        }
      },
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }
    ]
  },
  { // 图片
    test: /\.(png|jpg|gif|svg|ico)$/,
    use: [
      {
        loader:'file-loader',
        options:{
          limit: 3072,
          name: '[name].[ext]',
          outputPath: './static/images' // 定义图片打包的输出位置
        }
      }
    ]
  },
  { // 字体
    test: /\.(eot|woff|woff2|ttf)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 3072,
          name: '[name].[ext]',
          outputPath: './static/fonts' // 定义字体输出位置
        }
      }
    ]
  },
  { // 数据
    test: /\.json$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          limit: 3072,
          name: '[name].[ext]',
          outputPath: './static/data'
        }
      }
    ]
  },
  { // 音乐
    test: /\.(mp3|mp4|wav)$/,
    use: [
      {
        options: {
          outputPath: './static/music' // 定义音乐输出位置
        }
      }
    ]
  },
 ]