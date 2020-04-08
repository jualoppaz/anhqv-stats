import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import Season from '../../../src/views/Season.vue';

const initialWidth = window.innerWidth;

describe('Season.vue', () => {
  let localVue;
  let router;
  let store;
  let actions;
  beforeAll(() => {
    window.innerWidth = initialWidth;
    localVue = createLocalVue();
    localVue.use(ElementUI);

    router = new VueRouter();


    actions = {
      getAll: jest.fn(),
    };

    localVue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        chapters: {
          namespaced: true,
          actions,
        },
      },
    });
  });

  it('check initial data', () => {
    const methods = {
      handleResize: jest.fn(),
    };

    // eslint-disable-next-line no-unused-vars
    const wrapper = shallowMount(Season, {
      localVue,
      router,
      store,
      mocks: {
        $t: () => {},
        $route: {
          params: {
            season_number: () => '0',
          },
        },
      },
      methods,
    });

    expect(methods.handleResize).toHaveBeenCalled();
    expect(actions.getAll).toHaveBeenCalled();
  });

  describe('handleResize', () => {
    it('gutter for mobile', () => {
      const wrapper = shallowMount(Season, {
        localVue,
        store,
        mocks: {
          $t: () => {},
          $route: {
            params: {
              season_number: () => '0',
            },
          },
        },
        stubs: ['router-link', 'router-view'],
      });

      window.innerWidth = 767;
      wrapper.vm.handleResize();
      expect(wrapper.vm.gutter).toEqual(20);
    });

    it('gutter for desktop', () => {
      const wrapper = shallowMount(Season, {
        localVue,
        store,
        mocks: {
          $t: () => {},
          $route: {
            params: {
              season_number: () => '0',
            },
          },
        },
        stubs: ['router-link', 'router-view'],
      });

      window.innerWidth = 800;
      wrapper.vm.handleResize();
      expect(wrapper.vm.gutter).toEqual(50);
    });
  });

  it('check beforeDestroy function is called', () => {
    const wrapper = shallowMount(Season, {
      localVue,
      store,
      mocks: {
        $t: () => {},
        $route: {
          params: {
            season_number: () => '0',
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
