import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/ProductView.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/CartView.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/AdminProducts.vue')
      },
      {
        path: 'coupon',
        component: () => import('../views/AdminCoupon.vue')
      },
      {
        path: 'order',
        component: () => import('../views/AdminOrder.vue')
      },
      {
        path: 'login',
        component: () => import('../views/AdminLogin.vue')
      },
      {
        // 有做 但是暫時沒用到
        // 要啟用才能查看，那乾脆看編輯資訊就好or看前台的產品細項 處理不能這後端才能處理
        path: 'adminproduct/:id',
        component: () => import('../views/AdminProductView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active' // 啟用的連結 要追加的 class 名稱 Bootstrap的樣式 = active
})

export default router
