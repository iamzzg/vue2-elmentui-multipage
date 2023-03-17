const path = require('path')
const fs = require('fs')

const webpack = require('webpack')
// const Components = require('unplugin-vue-components/webpack')
// const { ElementUiResolver } = require('unplugin-vue-components/resolvers')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

const port = process.env.VUE_APP_PORT || process.env.npm_config_port || 666

// 多页配置
const pages = {
  // 默认首页
  index: {
    entry: './src/main.js',
    template: './public/index.html',
    title: '首页'
  }
}

// 设置多页配置
function getPages() {
  const dirnames = fs.readdirSync('./src/pages')
  dirnames.map(dirname => {
    pages[dirname] = {
      entry: `./src/pages/${dirname}/main.js`,
      template: `./public/${dirname}.html`,
      filename: `${dirname}.html`,
      title: dirname
    }
  })
}

getPages()

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  devServer: {
    // open: true,
    port: port,
    overlay: {
      errors: false,
      warnings: false
    },
    proxy: {
      '/api': {
        target: 'http://192.168.0.74:8000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
        // 转发请求时设置cookie
        onProxyReq(proxyReq) {
          proxyReq.setHeader('cookie', 'JSESSIONID=2AEE2EEB321F139DD87C98F0CD0B48A3')
        }
      }
    }
  },
  pages,
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      // Components({
      //   // 默认解析 src/components/**.vue,深层
      //   resolvers: [ElementUiResolver()]
      // }),
      new webpack.DefinePlugin({
        pageNames: JSON.stringify(fs.readdirSync('./src/pages'))
      })
    ],
    devtool: process.env.VUE_APP_SOURCE_MAP
  },
  chainWebpack(config) {
    // 注入全局scss变量 global scss variables
    const _variables = config.module.rule('scss').oneOfs.store
    _variables.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [
            resolve('src/styles/_variables.scss'),
            resolve('src/styles/_mixin.scss'),
            resolve('src/styles/_colors.scss')
          ]
        })
        .end()
    })
    // svg-icon 图标
    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
