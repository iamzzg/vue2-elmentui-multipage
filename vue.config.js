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
  // test: {
  //   entry: './src/pages/test/main.js',
  //   template: './public/test.html',
  //   title: '测试'
  // },
  // 'attendance-report': {
  //   entry: './src/pages/attendance-report/main.js',
  //   template: './public/attendance-report.html',
  //   title: '考勤报表'
  // }
}

function getPages() {
  const dirnames = fs.readdirSync('./src/pages')
  dirnames.map(dirname => {
    pages[dirname] = {
      entry: `./src/pages/${dirname}/main.js`,
      template: `./public/${dirname}.html`,
      title: dirname
    }
  })
}

getPages()

module.exports = {
  devServer: {
    open: true,
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
          proxyReq.setHeader('cookie', 'JSESSIONID=C3390F7561653957A0F78C6EA2AADA6E')
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
    ]
  },
  chainWebpack(config) {
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
