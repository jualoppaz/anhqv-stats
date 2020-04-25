import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import Actors from '../../../pages/actors/index.vue';

jest.mock('../../../utils');
// eslint-disable-next-line import/first
import utils from '../../../utils';

describe('Actors.vue', () => {
  let localVue;
  let store;
  let actions;

  let configsState;
  let configsMutations;

  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(ElementUI);

    actions = {
      getAll: jest.fn(),
      destroyAll: jest.fn(),
    };

    configsState = {
      currentTitle: '',
    };

    configsMutations = {
      setCurrentTitle: jest.fn(),
    };

    localVue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        actors: {
          namespaced: true,
          actions,
        },
        configs: {
          namespaced: true,
          state: configsState,
          mutations: configsMutations,
        },
      },
    });
  });

  beforeEach(() => {
    process.browser = false;
  });

  describe('check initial data', () => {
    it('it should load default data', () => {
      const methods = {
        handleResize: jest.fn(),
      };

      // eslint-disable-next-line no-unused-vars
      const wrapper = shallowMount(Actors, {
        localVue,
        store,
        mocks: {
          $t: () => {},
        },
        stubs: ['nuxt-link', 'router-view', 'el-row'],
        methods,
      });
    });

    it('it should execute created hook in browser', () => {
      process.browser = true;

      const methods = {
        handleResize: jest.fn(),
      };

      // eslint-disable-next-line no-unused-vars
      const wrapper = shallowMount(Actors, {
        localVue,
        store,
        mocks: {
          $t: () => {},
        },
        stubs: ['nuxt-link', 'router-view', 'el-row'],
        methods,
      });

      expect(methods.handleResize).toHaveBeenCalled();
    });
  });

  describe('handleResize', () => {
    it('gutter for mobile', () => {
      utils.isMobile.mockReturnValue(true);

      const wrapper = shallowMount(Actors, {
        localVue,
        store,
        mocks: {
          $t: () => {},
        },
        stubs: ['nuxt-link', 'router-view', 'el-row'],
      });

      wrapper.vm.handleResize();
      expect(wrapper.vm.gutter).toEqual(20);
    });

    it('gutter for desktop', () => {
      utils.isMobile.mockReturnValue(false);

      const wrapper = shallowMount(Actors, {
        localVue,
        store,
        mocks: {
          $t: () => {},
        },
        stubs: ['nuxt-link', 'router-view', 'el-row'],
      });

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
      stubs: ['nuxt-link', 'router-view', 'el-row'],
    });

    window.removeEventListener = jest.fn();

    wrapper.destroy();

    expect(window.removeEventListener).toHaveBeenCalled();
  });
});
