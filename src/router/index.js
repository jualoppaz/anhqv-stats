import Vue from 'vue';
import Router from 'vue-router';

import i18n from '../i18n';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home'),
      children: [],
      meta: {
        title: () => i18n.t('VIEWS.HOME.TITLE'),
      },
    }, {
      path: '/personajes',
      name: 'Characters',
      component: () => import('@/views/Characters'),
      children: [],
      meta: {
        title: () => i18n.t('VIEWS.CHARACTERS.TITLE'),
      },
    }, {
      path: '/temporadas/:season_number',
      name: 'SeasonDetails',
      component: () => import('@/views/Season'),
      children: [],
      meta: {
        title: ({ route }) => i18n.t('VIEWS.SEASONS.DETAIL.TITLE', { number: route.params.season_number }),
      },
    },
  ],
});
