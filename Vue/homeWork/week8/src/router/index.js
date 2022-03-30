import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '',
    // path: '', 這個 / 好像 可有可無?
    component: () => import('../views/Front/HomeView.vue'),
    children: [
      {
        path: 'about',
        component: () => import('../views/Front/AboutView.vue')
      }
    ]
  },
  {
    path: '/products',
    component: () => import('../views/Front/ProductsView.vue')
  },
  {
    path: '/product/:id', // id
    component: () => import('../views/Front/ProductView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
