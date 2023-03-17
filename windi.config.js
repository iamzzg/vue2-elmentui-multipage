const scssColors = require('./getColors')

// 迁移颜色
const customeColors = {
  111: '#111',
  222: '#222',
  333: '#333',
  444: '#444',
  555: '#555',
  666: '#666',
  777: '#777',
  888: '#888',
  999: '#999',
  aaa: '#aaa',
  bbb: '#bbb',
  ccc: '#ccc',
  ddd: '#ddd',
  eee: '#eee',
  fff: '#fff'
}

module.exports = {
  /* 配置项... */
  // 接受相对于项目根目录的 globs 和文件路径
  // 默认情况下，它会扫描在 src/ 目录下扩展名为 vue, html, mdx, pug, jsx, tsx 的文件。
  extract: {
    // 设置 扫描 指定js文件,有些js中使用了类名
    include: ['src/**/*.{vue,jsx,tsx,svelte}', 'shared/**/*.{vue,ts}', 'src/utils/index.js']
  },
  theme: {
    colors: { ...scssColors, ...customeColors }
  }
}
