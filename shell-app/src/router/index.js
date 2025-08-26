import { createRouter, createWebHistory } from 'vue-router'
import DynamicCanvas from '../components/DynamicCanvas.vue'
import AllDemos from '../components/AllDemos.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: DynamicCanvas
  },
  {
    path: '/all-demos',
    name: 'all-demos',
    component: AllDemos
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
  },
  {
    path: '/demo-counter',
    name: 'demo-counter',
    component: () => import('demoCounterApp/CounterDemo')
  },
  {
    path: '/interface-demo',
    name: 'interface-demo',
    component: () => import('../views/InterfaceDemo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to the top
    return { left: 0, top: 0 }
  }
})

export default router