import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Home from '@/views/Home'
import store from '@/store'

const routes = [{
    path: '',
    component: Home
  },
  {
    path: '/article/:id',
    component: () => import('@/components/Article'),
    props: (route) => ({
      id: Number(route.params.id)
    })
  },
  {
    path: '/edit',
    component: () => import('@/views/WriteArticle.vue'),
    meta: {
      requiredLogin: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiredLogin && !store.state.isLogin) {
    next('/login')
  }

  next()
})

export default router