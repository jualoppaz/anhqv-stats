import Vue from 'vue';
import ElementUI from 'element-ui';
import Adsense from 'vue-google-adsense/dist/Adsense.min';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import store from './store';
import VueAnhqvClient from './plugins/vueAnhqvClient';

import 'element-ui/lib/theme-chalk/index.css';
import i18n from './i18n';

import router from './router';

library.add(fas);
library.add(fab);

Vue.component('font-awesome-icon', FontAwesomeIcon);


Vue.use(require('vue-script2'));

Vue.use(Adsense);

Vue.use(ElementUI);
Vue.use(VueAnhqvClient, {
  endpoint: process.env.VUE_APP_API_URL,
});

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
