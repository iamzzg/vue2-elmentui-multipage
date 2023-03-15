import Vue from 'vue'
const requireComponent = require.context('./', true, /\.vue$/)

requireComponent.keys().forEach(filename => {
  const componentConfig = requireComponent(filename)

  const componentName = filename.replace(/^\.\//, '').replace(/\/index\.\w+$/, '')

  Vue.component(componentName, componentConfig.default || componentConfig)
})
