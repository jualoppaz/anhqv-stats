import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import CharacterDetail from '../../../src/views/CharacterDetail.vue';

const initialWidth = window.innerWidth;

describe('CharacterDetail.vue', () => {
  let localVue;
  let router;
  let store;
  let actions;
  let state;
  beforeAll(() => {
    window.innerWidth = initialWidth;
    localVue = createLocalVue();
    localVue.use(ElementUI);

    router = new VueRouter();

    state = {
      current: {
        name: 'John Doe',
      },
    };

    actions = {
      getBySlug: jest.fn(),
      destroyCurrent: jest.fn(),
    };

    localVue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        characters: {
          namespaced: true,
          state,
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
    const wrapper = shallowMount(CharacterDetail, {
      localVue,
      router,
      store,
      mocks: {
        $t: () => {},
        $route: {
          params: {
            slug: 'john-doe',
          },
        },
      },
      methods,
    });

    expect(methods.handleResize).toHaveBeenCalled();
    expect(actions.getBySlug).toHaveBeenCalled();
    expect(actions.getBySlug.mock.calls[0][1]).toEqual({
      slug: 'john-doe',
    });
  });

  describe('handleResize', () => {
    it('avatarSize for mobile', () => {
      const wrapper = shallowMount(CharacterDetail, {
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
        stubs: ['router-link', 'router-view'],
      });

      window.innerWidth = 767;
      wrapper.vm.handleResize();
      expect(wrapper.vm.avatarSize).toEqual(100);
    });

    it('avatarSize for desktop', () => {
      const wrapper = shallowMount(CharacterDetail, {
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
        stubs: ['router-link', 'router-view'],
      });

      window.innerWidth = 800;
      wrapper.vm.handleResize();
      expect(wrapper.vm.avatarSize).toEqual(250);
    });
  });

  it('check beforeDestroy function is called', () => {
    const wrapper = shallowMount(CharacterDetail, {
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
      stubs: ['router-link', 'router-view'],
    });

    window.removeEventListener = jest.fn();

    wrapper.destroy();

    expect(window.removeEventListener).toHaveBeenCalled();
  });
});
