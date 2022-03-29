import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '',
    component: () => import('../views/Front/HomeView.vue'),
    children: [
      {
        path: 'about',
        component: () => import('../views/Front/AboutView.vue')
      },
      // {
      //   path: 'products',
      //   component: () => import('../views/Front/ProductsView.vue')
      // },
      {
        path: 'product', // id
        component: () => import('../views/Front/ProductView.vue')
      }
    ]
  },
  {
    path: '/products',
    component: () => import('../views/Front/ProductsView.vue')
  }
  // {
  //   path: '/about',
  //   component: () => import('../views/Front/AboutView.vue'),
  //   children: [
  //     {
  //       path: '/about',
  //       component: () => import('../views/Front/AboutView.vue')
  //     },
  //     {
  //       path: 'products',
  //       component: () => import('../views/Front/ProductsView.vue')
  //     },
  //     {
  //       path: 'product',
  //       component: () => import('../views/Front/ProductView.vue')
  //     }
  //   ]
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
