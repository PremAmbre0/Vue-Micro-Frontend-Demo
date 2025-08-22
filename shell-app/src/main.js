import './assets/main.scss';
import { createApp, markRaw } from 'vue';

import { createPinia } from 'pinia';

// Note: CSS loading disabled - micro frontends should be self-contained
// Each micro frontend will load its own CSS when imported
console.log('🎨 CSS loading: Micro frontends will load their own styles')

import App from './App.vue';
import router from './router';

const pinia = createPinia();
pinia.use(({ store }) => {
  store.$router = markRaw(router); // This is added so that $router is available on this in pinia store
});

const app = createApp(App);
app.use(pinia);
app.use(router);
console.log("mounting")
app.mount('#app');
