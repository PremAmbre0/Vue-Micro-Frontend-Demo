import { createApp } from 'vue'
import App from './App.vue'
import "material-design-icons-iconfont/dist/material-design-icons.css";

const app = createApp(App)

console.log("mounting demo-counter app")
app.mount('#demo-counter-app')
