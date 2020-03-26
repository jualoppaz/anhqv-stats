import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import Menu from '../../../src/components/Menu.vue';
import router from '../../../src/router';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(ElementUI);

describe('Menu.vue', () => {
  it('check initial data', () => {
    const wrapper = shallowMount(Menu, {
      localVue,
      router,
      mocks: {
        $t: () => {},
      },
    });
    expect(JSON.stringify(wrapper.vm.defaultOpeneds)).toBe(JSON.stringify(['3']));
    expect(wrapper.vm.isCollapsed).toBe(false);
  });

  describe('handleResize', () => {
    it('isCollapsed must be true', () => {
      const wrapper = shallowMount(Menu, {
        localVue,
        router,
        mocks: {
          $t: () => {},
        },
      });

      window.innerWidth = 767;
      wrapper.vm.handleResize();
      expect(wrapper.vm.isCollapsed).toBe(true);
    });
  });

  it('check beforeDestroy function is called', () => {
    const wrapper = shallowMount(Menu, {
      localVue,
      router,
      mocks: {
        $t: () => {},
      },
    });

    window.removeEventListener = jest.fn();

    wrapper.destroy();

    expect(window.removeEventListener).toHaveBeenCalled();
  });
});
