require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const paths = require('./paths')

module.exports = {
  mode: 'production',
  entry: paths.appIndexJs,
  output: {
    libraryTarget: "umd", // 输出为一个可引用的包
    path: paths.appDist,
    filename: 'index.js'
  },
  module: {
    rules: [{
      test: /\.(jsx|js)$/,
      include: paths.appSrc,
      loader: require.resolve('babel-loader')
    }]
  },
  plugins: [
    // 清除旧的dist文件夹
    // Note: 必须要制定根目录 root, 不然默认根目录为当前目录
    new CleanWebpackPlugin(paths.appDist, {
      root: paths.appRoot
    }),
  ]
}