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
      component: () => import('@/views/Home'),
      children: [],
      meta: {
        title: () => i18n.t('VIEWS.HOME.TITLE'),
      },
    }, {
      path: '/personajes',
      component: () => import('@/views/Characters'),
      children: [],
      meta: {
        title: () => i18n.t('VIEWS.CHARACTERS.TITLE'),
      },
    }, {
      path: '/seasons/:season_number',
      component: () => import('@/views/Season'),
      children: [],
      meta: {
        title: ({ route }) => i18n.t('VIEWS.SEASONS.DETAIL.TITLE', { number: route.params.season_number }),
      },
    },
  ],
});
