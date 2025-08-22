import './assets/main.scss';
import { createApp, markRaw } from 'vue';

import { createPinia } from 'pinia';

if (import.meta.env.PROD) {
  const demoApps = [
    { name: 'demo-one', url: import.meta.env.VITE_DEMO_ONE_CSS_URL },
    { name: 'demo-two', url: import.meta.env.VITE_DEMO_TWO_CSS_URL },
    { name: 'demo-three', url: import.meta.env.VITE_DEMO_THREE_CSS_URL },
    { name: 'demo-counter', url: import.meta.env.VITE_DEMO_COUNTER_CSS_URL }
  ];

  demoApps.forEach(app => {
    if (app.url) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = app.url
      link.onload = () => console.log(`✅ ${app.name} CSS loaded successfully`)
      link.onerror = () => console.error(`❌ Failed to load ${app.name} CSS`)
      document.head.appendChild(link)
    } else {
      console.warn(`⚠️ No CSS URL configured for ${app.name}`)
    }
  });
}

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
