import { createRouter, createWebHistory } from 'vue-router'
import DynamicCanvas from '../components/DynamicCanvas.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: DynamicCanvas
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