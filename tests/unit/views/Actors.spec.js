import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import Actors from '../../../src/views/Actors.vue';

const initialWidth = window.innerWidth;

describe('Actors.vue', () => {
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
        actors: {
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
    const wrapper = shallowMount(Actors, {
      localVue,
      router,
      store,
      mocks: {
        $t: () => {},
      },
      methods,
    });

    expect(methods.handleResize).toHaveBeenCalled();
    expect(actions.getAll).toHaveBeenCalled();
  });

  describe('handleResize', () => {
    it('gutter for mobile', () => {
      const wrapper = shallowMount(Actors, {
        localVue,
        store,
        mocks: {
          $t: () => {},
        },
        stubs: ['router-link', 'router-view'],
      });

      window.innerWidth = 767;
      wrapper.vm.handleResize();
      expect(wrapper.vm.gutter).toEqual(20);
    });

    it('gutter for desktop', () => {
      const wrapper = shallowMount(Actors, {
        localVue,
        store,
        mocks: {
          $t: () => {},
        },
        stubs: ['router-link', 'router-view'],
      });

      window.innerWidth = 800;
      wrapper.vm.handleResize();
      expect(wrapper.vm.gutter).toEqual(50);
    });
  });

  it('check beforeDestroy function is called', () => {
    const wrapper = shallowMount(Actors, {
      localVue,
      store,
      mocks: {
        $t: () => {},
      },
      stubs: ['router-link', 'router-view'],
    });

    window.removeEventListener = jest.fn();

    wrapper.destroy();

    expect(window.removeEventListener).toHaveBeenCalled();
  });
});
