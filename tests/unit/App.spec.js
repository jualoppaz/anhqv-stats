import { createLocalVue, mount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import App from '../../src/App.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);

const router = new VueRouter();

describe('App.vue', () => {
  it('check header border-bottom', () => {
    const wrapper = mount(App, {
      localVue,
      router,
      stubs: ['router-link', 'router-view'],
      mocks: {
        $t: () => {},
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
