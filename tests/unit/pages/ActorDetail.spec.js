import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import ActorDetail from '../../../pages/actors/_slug/index.vue';

jest.mock('../../../utils');
// eslint-disable-next-line import/first
import utils from '../../../utils';

describe('ActorDetail.vue', () => {
  let localVue;
  let store;
  let actions;
  let state;

  let configsState;
  let configsMutations;

  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(ElementUI);

    state = {
      current: {
        name: 'John Doe',
      },
    };

    actions = {
      getBySlug: jest.fn(),
      destroyCurrent: jest.fn(),
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
          state,
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

      const wrapper = shallowMount(ActorDetail, {
        localVue,
        store,
        mocks: {
          $t: () => {},
          $route: {
            params: {
              slug: 'john-doe',
            },
          },
        },
        stubs: ['el-card', 'el-row', 'el-col', 'el-avatar'],
        methods,
      });

      expect(wrapper.vm.avatarSize).toEqual(250);
    });

    it('it should execute created hook in browser', () => {
      process.browser = true;

      const methods = {
        handleResize: jest.fn(),
      };

      // eslint-disable-next-line no-unused-vars
      const wrapper = shallowMount(ActorDetail, {
        localVue,
        store,
        mocks: {
          $t: () => {},
          $route: {
            params: {
              slug: 'john-doe',
            },
          },
        },
        stubs: ['el-card', 'el-row', 'el-col', 'el-avatar'],
        methods,
      });

      expect(methods.handleResize).toHaveBeenCalled();
    });
  });

  describe('handleResize', () => {
    it('avatarSize for mobile', () => {
      utils.isMobile.mockReturnValue(true);

      const wrapper = shallowMount(ActorDetail, {
        localVue,
        store,
        mocks: {
          $t: () => {},
          $route: {
            params: {
              slug: 'john-doe',
            },
          },
        },
        stubs: ['el-card', 'el-row', 'el-col', 'el-avatar'],
      });

      wrapper.vm.handleResize();
      expect(wrapper.vm.avatarSize).toEqual(100);
    });

    it('avatarSize for desktop', () => {
      utils.isMobile.mockReturnValue(false);

      const wrapper = shallowMount(ActorDetail, {
        localVue,
        store,
        mocks: {
          $t: () => {},
          $route: {
            params: {
              slug: 'john-doe',
            },
          },
        },
        stubs: ['el-card', 'el-row', 'el-col', 'el-avatar'],
      });

      wrapper.vm.handleResize();
      expect(wrapper.vm.avatarSize).toEqual(250);
    });
  });

  it('check beforeDestroy function is called', () => {
    const wrapper = shallowMount(ActorDetail, {
      localVue,
      store,
      mocks: {
        $t: () => {},
        $route: {
          params: {
            slug: 'john-doe',
          },
        },
      },
      stubs: ['el-card', 'el-row', 'el-col', 'el-avatar'],
    });

    window.removeEventListener = jest.fn();

    wrapper.destroy();

    expect(window.removeEventListener).toHaveBeenCalled();
  });
});
