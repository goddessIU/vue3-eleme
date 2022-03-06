import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/home/index.vue')
    }, 
    {
      path: '/address',
      name: 'address',
      component: () => import('../views/address.vue')
    }
  ]
})

export default router