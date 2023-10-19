// Composables
import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../layouts/default/Default.vue';
import Dashboard from '../views/Dashboard.vue';
import Product from '../views/Product/index.vue';
import Material from '../views/Material/index.vue';
import Warehous from '../views/Warehous/index.vue';
import Order from '../views/Order/index.vue';

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
        path: 'material',
        name: 'app.material',
        component: Material
      },
      {
        path: 'product',
        name: 'app.product',
        component: Product
      },
      {
        path: 'warehous',
        name: 'app.warehous',
        component: Warehous
      },
      {
        path: 'order',
        name: 'app.order',
        component: Order
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
