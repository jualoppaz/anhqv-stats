import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import App from './App.vue';
import store from './store';

import 'element-ui/lib/theme-chalk/index.css';
import i18n from './i18n';

import router from './router';

Vue.use(VueRouter);

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
