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
      redirect: '/order/orderpage',
      children: [
        {
          path: 'orderpage',
          name: 'orderpage',
          component: () => import('../views/order/OrderPage.vue')
        },
        {
          path: 'fillAddress',
          name: 'fillAddress',
          component: () => import('../views/address/FillAddress.vue')
        },
        {
          path: 'remark',
          name: 'remark',
          component: () => import('../views/order/ReMark.vue')
        }, 
        {
          path: 'invoice',
          name: 'invoice',
          component: () => import('../views/order/Invoice.vue')
        }
      ]
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/login/Index.vue'),
      redirect: '/signup/login',
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/login/Login.vue')
        },
        {
          path: 'resetpassword',
          name: 'resetpassword',
          component: () => import('../views/login/ResetPassword.vue')
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/user/Index.vue'),
      redirect: '/user/userpage',
      meta: {
        showFoot: true
      },
      children: [
        {
          path: 'userpage',
          name: 'userpage',
          component: () => import('../views/user/IndexPage.vue')
        },
        {
          path: 'download',
          name: 'download',
          component: () => import('../views/user/Download.vue')
        }
      ]
    }
  ]
})

export default router