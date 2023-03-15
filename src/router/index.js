import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const multiPageRoutes = pageNames.map(page => {
  return {
    path: '/' + page,
    beforeEnter: () => {
      window.location = `/${page}.html`
    }
  }
})

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  ...multiPageRoutes
]

const router = new VueRouter({
  routes
})

export default router
