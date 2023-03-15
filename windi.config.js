module.exports = {
  /* 配置项... */
  // 接受相对于项目根目录的 globs 和文件路径
  // 默认情况下，它会扫描在 src/ 目录下扩展名为 vue, html, mdx, pug, jsx, tsx 的文件。
  extract: {
    include: ['src/**/*.{vue,jsx,tsx,svelte}', 'shared/**/*.{vue,ts}']
  },
  theme: {
    extend: {
      colors: {
        primary: '#fdd860',
        success: '#21d214',
        warning: '#fcb205',
        'warning-light': '#ffead7',
        danger: '#f04848',
        'danger-light': '#ffeeee',
        white: '#fff',
        drak: '#000',
        gray: '#999999',
        purple: '#906ffe',
        blue: '#6b9dfe',
        cyan: '#17c3a5',
        orange: '#fca835',
        gold: '#ffc406'
      }
    }
  }
}
