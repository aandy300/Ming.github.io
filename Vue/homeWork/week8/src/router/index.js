import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '',
    // path: '', 這個 / 好像 可有可無?
    component: () => import('../views/Front/HomeView.vue'),
    children: [
      {
        path: 'aabout',
        component: () => import('../views/Front/AboutView.vue')
      }
    ]
  },
  {
    path: '/about',
    component: () => import('../views/Front/AboutView.vue')
  },
  {
    path: '/products',
    component: () => import('../views/Front/ProductsView.vue')
  },
  {
    path: '/product/:id', // id
    component: () => import('../views/Front/ProductView.vue')
  },
  {
    path: '/cart',
    component: () => import('../views/Front/CartView.vue')
  },
  {
    path: '/swiper',
    component: () => import('../views/Front/SwiperView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active' // 啟用的連結 要追加的 class 名稱 Bootstrap的樣式 = active
})

export default router
