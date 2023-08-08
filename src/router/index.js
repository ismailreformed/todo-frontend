import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/AuthLayout'
import Login from '@/components/NoAuthLayout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: false
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresAuth: true
      },
    }
  ]
})
