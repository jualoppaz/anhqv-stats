import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import Menu from '../../../src/components/Menu.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);

const router = new VueRouter();

describe('Menu.vue', () => {
  it('check initial data', () => {
    const wrapper = shallowMount(Menu, {
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
      stubs: ['router-link', 'router-view'],
    });
    expect(JSON.stringify(wrapper.vm.defaultOpeneds)).toBe(JSON.stringify(['3']));
    expect(wrapper.vm.isCollapsed).toBeFalsy();
  });

  describe('handleResize', () => {
    it('isCollapsed must be true', () => {
      const wrapper = shallowMount(Menu, {
        localVue,
        mocks: {
          $t: () => {},
          $route: {
            meta: {
              title: () => 'dummy',
            },
          },
        },
        stubs: ['router-link', 'router-view'],
      });

      window.innerWidth = 767;
      wrapper.vm.handleResize();
      expect(wrapper.vm.isCollapsed).toBeTruthy();
    });
  });

  it('check beforeDestroy function is called', () => {
    const wrapper = shallowMount(Menu, {
      localVue,
      mocks: {
        $t: () => {},
        $route: {
          meta: {
            title: () => 'dummy',
          },
        },
      },
      stubs: ['router-link', 'router-view'],
    });

    window.removeEventListener = jest.fn();

    wrapper.destroy();

    expect(window.removeEventListener).toHaveBeenCalled();
  });
});
