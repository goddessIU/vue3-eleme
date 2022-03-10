import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {
        showFoot: true
      },
      component: () => import('../views/home/index.vue')
    }, 
    {
      path: '/address',
      name: 'address',
      meta: {
        showFoot: true
      },
      component: () => import('../views/address/address.vue')
    },
    {
      path: '/addAddress',
      name: 'addAddress',meta: {
        showFoot: true
      },
      component: () => import('../views/AddAddress.vue')
    },
    {
      path: '/shopIndex',
      name: 'shopIndex',
      meta: {
        showFoot: false
      },
      component: () => import('../views/shop/ShopIndex.vue'),
      redirect: '/shopIndex/shopItems',
      children: [
        {
          path: 'shopItems',
          name: 'shopItems',
          component: () => import('../views/shop/ShopItems.vue')
        },
        {
          path: 'shopEvaluation',
          name: 'shopEvaluation',
          component: () => import('../views/shop/ShopEvaluation.vue')
        }
      ]
    }, 
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/order/OrderIndex.vue'),
      meta: {
        showFoot: false
      },
    },
    {
      path: '/fillAddress',
      name: 'fillAddress',
      component: () => import('../views/address/FillAddress.vue'),
      meta: {
        showFoot: false
      },
    }
  ]
})

export default router