import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import Home from '../../../src/views/Home.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);

const router = new VueRouter();

describe('Home.vue', () => {
  it('check initial data', () => {
    const wrapper = shallowMount(Home, {
      localVue,
      router,
      stubs: ['router-link', 'router-view', 'font-awesome-icon', 'Adsense'],
      mocks: {
        $t: () => {},
        $route: {
          meta: {
            title: () => 'dummy',
          },
        },
      },
    });

    expect(wrapper.find('#welcome-image').exists()).toBe(true);
  });
});
