const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const TEMPLATE_CONFIG = require('./statics.config.js')
// const CompressionWebpackPlugin = require('compression-webpack-plugin')

// 区分环境
let path = require('path')
let ROOT_PATH = path.resolve(__dirname)
let BUILD_APTH = path.resolve(ROOT_PATH, '../dev/mobile') // 整体调试模式
// let BUILD_APTH = path.resolve(ROOT_PATH, '../dev/' + (TEMPLATE_CONFIG.package ? (TEMPLATE_CONFIG.package + '-') : '') + 'mobile') // 整体调试模式
// '../product/mobile/studio' // 整体生产模式
function resolve (dir) {
  return path.join(__dirname, dir)
}
// console.log(process.env.NODE_ENV)
// 生产环境，新架构输出目录要换一个
if (process.env.NODE_ENV === 'production') {
  // BUILD_APTH = path.resolve(ROOT_PATH, '../product/' + (TEMPLATE_CONFIG.package ? (TEMPLATE_CONFIG.package + '-') : '') + 'mobile')
  BUILD_APTH = path.resolve(ROOT_PATH, '../product/mobile')
}

// console.log(TEMPLATE_CONFIG)

module.exports = {
  // baseUrl: '/' + (TEMPLATE_CONFIG.package ? (TEMPLATE_CONFIG.package + '-') : '') + 'mobile/studio/', // /mobile/studio/
  publicPath: '/mobile/', // /mobile/studio/
  outputDir: BUILD_APTH,
  lintOnSave: 'error',
  productionSourceMap: false,
  filenameHashing: false,
  // css: {
  //   modules: true
  // },
  // 构建时开启多进程处理babel编译
  parallel: require('os').cpus().length > 1,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('Assets', resolve('src/assets'))
      .set('Components', resolve('src/components'))
      .set('Plugins', resolve('src/plugins'))
      .set('Views', resolve('src/views'))
  },
  // 配置scss全局变量引用
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       data: `
  //         @import "@/assets/css/base.color.scss";
  //       `
  //     }
  //   }
  // },
  // 配置压缩
  configureWebpack: config => {
    let plugins = [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: { // 清除console和其他的输出
            warnings: false,
            drop_debugger: true,
            drop_console: true
          }
        },
        sourceMap: false,
        parallel: true
      })
      // new CompressionWebpackPlugin({ // 压缩js为gzip
      //   asset: '[path].gz[query]',
      //   algorithm: 'gzip',
      //   test: new RegExp(
      //     '\\.(' +
      //     ['js', 'css'].join('|') +
      //     ')$'
      //   ),
      //   threshold: 10240,
      //   // deleteOriginalAssets: true,
      //   minRatio: 0.8
      // })
    ]
    if (process.env.NODE_ENV !== 'development') {
      config.plugins = [...config.plugins, ...plugins]
    }
    // console.log(config)
  },
  devServer: {
    // open: true,
    proxy: {
      '/api': {
        target: 'https://hyaena.org',
        // target: 'http://555.0234.co',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/cpi': {
        // target: 'http://192.168.3.72:8072',
        target: 'http://msg-service.0234.co',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/cpi': ''
        }
      }
    }
  },
  assetsDir: undefined,
  runtimeCompiler: undefined
  // pages: {
  //   testHello: {
  //     // page 的入口
  //     entry: 'src/main.js',
  //     // 模板来源
  //     template: 'public/index.html',
  //     // 在 dist/index.html 的输出
  //     filename: '/fuck/index.html',
  //     // 当使用 title 选项时，
  //     // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
  //     title: 'hello world',
  //     // 在这个页面中包含的块，默认情况下会包含
  //     // 提取出来的通用 chunk 和 vendor chunk。
  //     chunks: ['chunk-vendors', 'chunk-common', 'index']
  //   }
  //   // 当使用只有入口的字符串格式时，
  //   // 模板会被推导为 `public/subpage.html`
  //   // 并且如果找不到的话，就回退到 `public/index.html`。
  //   // 输出文件名会被推导为 `subpage.html`。
  //   // subpage: 'src/subpage/main.js'
  // }
}
