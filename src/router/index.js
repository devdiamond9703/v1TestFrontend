// Composables
import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../layouts/default/Default.vue';
import Dashboard from '../views/Dashboard.vue';
import Product from '../views/Product/index.vue';
const routes = [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    name: 'app',
    redirect: '/app/dashboard',
    component: AppLayout,
    children: [
      {
        path: 'dashboard',
        name: 'app.dashboard',
        component: Dashboard
      },
      {
        path: 'product',
        name: 'app.product',
        component: Product
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
