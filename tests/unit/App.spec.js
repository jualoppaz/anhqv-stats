import { createLocalVue, shallowMount } from '@vue/test-utils';
import ElementUI from 'element-ui';
import App from '../../layouts/default.vue';

jest.mock('vue-adblock-detect', () => ({
  methods: {
    detectAdBlock: jest.fn().mockResolvedValue(true),
  },
}));

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('App.vue', () => {
  it('check header border-bottom', () => {
    // eslint-disable-next-line no-unused-vars
    const wrapper = shallowMount(App, {
      localVue,
      mocks: {
        $t: () => {},
        $i18n: {},
        $route: {
          meta: {
            title: () => 'dummy',
          },
        },
      },
      stubs: ['nuxt-link', 'router-view', 'nuxt', 'el-container', 'el-header', 'el-main', 'el-footer', 'Menu'],
    });
  });
});
