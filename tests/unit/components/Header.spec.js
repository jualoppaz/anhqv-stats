import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import Header from '../../../src/components/Header.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);

const router = new VueRouter();

describe('Header.vue', () => {
  it('check initial data', () => {
    const wrapper = shallowMount(Header, {
      localVue,
      router,
      mocks: {
        $t: () => {},
        $route: {
          meta: {
            title: () => 'dummy',
          },
        },
      },
    });
    expect(wrapper.vm.title).toBe('DUMMY');
  });
});
