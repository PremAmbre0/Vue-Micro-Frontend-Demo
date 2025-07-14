import './assets/main.scss';

import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';

import FederatedApp from './FederatedApp.vue';

import i18n from './i18n';

const pinia = createPinia();

const app = createApp(FederatedApp);

app.use(i18n);
app.use(pinia);


app.mount('#test-app');

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
