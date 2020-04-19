import { createLocalVue, mount } from '@vue/test-utils';
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
    const wrapper = mount(App, {
      localVue,
      stubs: ['nuxt-link', 'router-view', 'nuxt'],
      mocks: {
        $t: () => {},
        $i18n: {},
        $route: {
          meta: {
            title: () => 'dummy',
          },
        },
      },
    });

    expect(wrapper.find('.el-header').exists()).toBe(true);
  });
});
