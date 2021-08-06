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
    component: () => import('@/views/Article'),
    props: (route) => ({
      id: Number(route.params.id)
    })
  },
  {
    path: '/edit',
    component: () => import('@/views/WriteArticle'),
    props: (route) => ({
      id: route.query.id
    }),
    meta: {
      requiredLogin: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/tag/:id',
    component: () => import('@/views/TagArticle.vue'),
    props: true
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