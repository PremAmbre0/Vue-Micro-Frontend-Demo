import './assets/main.scss';

import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';

// Load CSS from demo apps in production
if (import.meta.env.PROD) {
  const demoApps = [
    { name: 'demo-one', url: import.meta.env.VITE_DEMO_ONE_CSS_URL || 'http://localhost:3001/assets/style.css' },
    { name: 'demo-two', url: import.meta.env.VITE_DEMO_TWO_CSS_URL || 'http://localhost:3002/assets/style.css' },
    { name: 'demo-three', url: import.meta.env.VITE_DEMO_THREE_CSS_URL || 'http://localhost:3003/assets/style.css' }
  ];

  demoApps.forEach(app => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = app.url
    link.onload = () => console.log(`✅ ${app.name} CSS loaded successfully`)
    link.onerror = () => console.error(`❌ Failed to load ${app.name} CSS`)
    document.head.appendChild(link)
  });
}

import Provider from './Provider.vue';
import router from './router';
import i18n from './i18n';

import { Constants } from './Constants';
import images from './assets/getAssets.js';
import { remToPixels } from './composables/useRemToPixel.js';

const pinia = createPinia();
pinia.use(({ store }) => {
  store.$router = markRaw(router); // This is added so that $router is available on this in pinia store
});

const app = createApp(Provider);
app.provide('appImages', images);
app.provide('Constants', Constants);
app.provide('convertRemToPixels', remToPixels);
window.Constants = Constants;

app.use(i18n);
app.use(pinia);
app.use(router);
//test

app.mount('#shell-app');

function getQueryParams(query) {
  var params = new URL(document.location).searchParams;
  var value = params.get(query);

  if (!value) {
    params = new URL(document.location.origin + '?' + document.location.href.split('?')[1]).searchParams;
    value = params.get(query);
  }

  return value;
}

let language = getQueryParams('lang');

if (!language) {
  language = 'en';
}

function isMac() {
  if (navigator.userAgentData) {
    return navigator.userAgentData.platform.toUpperCase().includes('MAC');
  } else {
    return navigator.userAgent.toUpperCase().includes('MAC');
  }
}

window.IS_MAC = isMac();
