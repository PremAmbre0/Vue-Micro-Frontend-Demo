import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

console.log("mounting demo-counter app")
app.mount('#demo-counter-app')
