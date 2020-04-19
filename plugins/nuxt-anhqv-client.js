import Vue from 'vue';
import anhqvClient from './vueAnhqvClient';

Vue.use(anhqvClient, {
  endpoint: process.env.VUE_APP_API_URL,
});
