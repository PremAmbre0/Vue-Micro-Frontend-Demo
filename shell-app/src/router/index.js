import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeWrapper.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/test-app/:pathMatch(.*)*',
    name: 'test-app',
    component: () => import('testApp/App')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router