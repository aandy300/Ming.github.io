import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '',
    // path: '', 這個 / 好像 可有可無?
    component: () => import('../views/Front/HomeView.vue'),
    meta: { title: '日玥書坊' },
    children: [
      {
        path: 'aabout',
        component: () => import('../views/Front/AboutView.vue')
      }
    ]
  },
  {
    path: '/about',
    component: () => import('../views/Front/AboutView.vue'),
    meta: { title: '日玥書坊-品牌特色' }
  },
  {
    path: '/products',
    component: () => import('../views/Front/ProductsView.vue'),
    meta: { title: '日玥書坊-商品列表' }
  },
  {
    path: '/product/:id', // id
    component: () => import('../views/Front/ProductView.vue'),
    meta: { title: '日玥書坊-商品' }
  },
  {
    path: '/myorders',
    component: () => import('../views/Front/OrdersView.vue'),
    meta: { title: '日玥書坊-我的訂單-這個沒使用' }
  },
  {
    path: '/pay/:id',
    component: () => import('../views/Front/PayView.vue'),
    meta: { title: '日玥書坊-付款頁面' }
  },
  {
    path: '/checkpay',
    component: () => import('../views/Front/CheckPayView.vue')
  },
  {
    path: '/cart',
    component: () => import('../views/Front/CartView.vue'),
    meta: { title: '日玥書坊-購物車' }
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
router.beforeEach((to, form, next) => {
  window.document.title = to.meta.title
  next()
})

export default router
