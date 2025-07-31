import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeWrapper.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/demo-one',
    name: 'demo-one',
    component: () => import('demoOneApp/DemoOneCanvas')
  },
  {
    path: '/demo-two',
    name: 'demo-two',
    component: () => import('demoTwoApp/DemoTwoCanvas')
  },
  {
    path: '/demo-three',
    name: 'demo-three',
    component: () => import('demoThreeApp/DemoThreeCanvas')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router