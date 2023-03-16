import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/icons/index'
import '@/components/index'
import { Util } from '@/utils'

import 'normalize.css'
import '@/styles/index.scss'
import 'windi.css'

Vue.use(ElementUI)

// 工具方法合并
Object.assign(Vue.prototype, Util)
