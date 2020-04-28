const {override, addWebpackAlias, fixBabelImports , addPostcssPlugins, addLessLoader } = require('customize-cra');
// const rewireLess = require('react-app-rewire-less');
const path = require('path')
process.env.GENERATE_SOURCEMAP = "false"

const addCustomize = () => config => {
  if (process.env.NODE_ENV === 'production') {
    // 关闭sourceMap
    // config.devtool = false;
    // 配置打包后的文件位置
    // config.output.path = __dirname + '../dist/demo/';
    // config.output.publicPath = 'https://static-aqs.health.ikang.com/2c/'
    // 添加js打包gzip配置
    // config.plugins.push(
    //   new CompressionWebpackPlugin({
    //     test: /\.js$|\.css$/,
    //     threshold: 1024,
    //   }),
    // )
  }
  // config = rewireLess(config)
  return config;
}

module.exports = override(
  addWebpackAlias({
    // "http": path.resolve(__dirname, "src/http"),
    // "assets": path.resolve(__dirname, "src/assets"),
    // "components": path.resolve(__dirname, "src/components"),
    // "config": path.resolve(__dirname, "src/config"),
    "@": path.resolve(__dirname, "src")
  }),
  // addPostcssPlugins([require('postcss-pxtorem')({
  //   rootValue: 40,
  //   propList: ['*', '!border'],
  //   selectorBlackList: []
  // })]),
  fixBabelImports('import', {
    // libraryName: 'antd-mobile',
    style: 'less'
  }),
  // addLessLoader({
  //   javascriptEnabled: true, // modifyVars: { "@primary-color": "#1DA57A" }
  // }),
  addCustomize(),
  // rewireLess.withLoaderOptions({
  //   modifyVars: { "@primary-color": "#1DA57A" },
  // })()
)
