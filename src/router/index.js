import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Home from '@/views/Home'

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
    component: () => import('@/views/WriteArticle.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router