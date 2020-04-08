import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import ChapterDetail from '../../../src/views/ChapterDetail.vue';

const initialWidth = window.innerWidth;

describe('ChapterDetail.vue', () => {
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
        name: 'Érase un X',
      },
    };

    actions = {
      getBySlug: jest.fn(),
      destroyCurrent: jest.fn(),
    };

    localVue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        chapters: {
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
    const wrapper = shallowMount(ChapterDetail, {
      localVue,
      router,
      store,
      mocks: {
        $t: () => {},
        $route: {
          params: {
            chapter_slug: '0x01',
          },
        },
      },
      methods,
    });

    expect(methods.handleResize).toHaveBeenCalled();
    expect(actions.getBySlug).toHaveBeenCalled();
    expect(actions.getBySlug.mock.calls[0][1]).toEqual({
      slug: '0x01',
    });
  });

  describe('handleResize', () => {
    it('avatarSize for mobile', () => {
      const wrapper = shallowMount(ChapterDetail, {
        localVue,
        store,
        mocks: {
          $t: () => {},
          $route: {
            params: {
              slug: '0x01',
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
      const wrapper = shallowMount(ChapterDetail, {
        localVue,
        store,
        mocks: {
          $t: () => {},
          $route: {
            params: {
              slug: '0x01',
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
    const wrapper = shallowMount(ChapterDetail, {
      localVue,
      store,
      mocks: {
        $t: () => {},
        $route: {
          params: {
            slug: '0x01',
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
