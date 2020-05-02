import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueMeta from 'vue-meta';
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

  let seoConfigState;
  let seoConfigActions;

  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(ElementUI);
    localVue.use(VueMeta, { keyName: 'head' });

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

    seoConfigState = {
      currentSeoConfig: {
        title: 'Actors title',
        description: 'Actors description',
        canonical_url: 'http://actors.com',
        og_title: 'Actors og:title',
        og_type: 'Actors og:type',
        og_image: 'Actors og:image',
        og_url: 'Actors og:url',
        og_description: 'Actors og:description',
        twitter_site: 'Actors twitter:site',
        twitter_card: 'Actors twitter:card',
      },
    };

    seoConfigActions = {
      getSeoConfigBySlug: jest.fn(),
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
        'seo-configs': {
          namespaced: true,
          state: seoConfigState,
          actions: seoConfigActions,
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
        stubs: ['nuxt-link', 'router-view', 'el-row', 'social-sharing', 'font-awesome-icon', 'network'],
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
        stubs: ['nuxt-link', 'router-view', 'el-row', 'social-sharing', 'font-awesome-icon', 'network'],
        methods,
      });

      expect(methods.handleResize).toHaveBeenCalled();
    });

    it('has correct <head> content', () => {
      const wrapper = shallowMount(Actors, {
        localVue,
        store,
        mocks: {
          $t: () => {},
        },
        stubs: ['nuxt-link', 'router-view', 'el-row', 'social-sharing', 'font-awesome-icon', 'network'],
      });

      const { title } = wrapper.vm.$metaInfo;
      const descriptionMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'description',
      );
      const canonicalUrlLink = wrapper.vm.$metaInfo.link.find(
        (item) => item.rel === 'canonical',
      );
      const ogTitleMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'og:title',
      );
      const ogTypeMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'og:type',
      );
      const ogImageMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'og:image',
      );
      const ogUrlMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'og:url',
      );
      const ogDescriptionMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'og:description',
      );
      const twitterSiteMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'twitter:site',
      );
      const twitterCardMeta = wrapper.vm.$metaInfo.meta.find(
        (item) => item.hid === 'twitter:card',
      );

      expect(title).toEqual('Actors title');
      expect(descriptionMeta.content).toEqual('Actors description');
      expect(canonicalUrlLink.href).toEqual('http://actors.com');
      expect(ogTitleMeta.content).toEqual('Actors og:title');
      expect(ogTypeMeta.content).toEqual('Actors og:type');
      expect(ogImageMeta.content).toEqual('Actors og:image');
      expect(ogUrlMeta.content).toEqual('Actors og:url');
      expect(ogDescriptionMeta.content).toEqual('Actors og:description');
      expect(twitterSiteMeta.content).toEqual('Actors twitter:site');
      expect(twitterCardMeta.content).toEqual('Actors twitter:card');
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
        stubs: ['nuxt-link', 'router-view', 'el-row', 'social-sharing', 'font-awesome-icon', 'network'],
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
        stubs: ['nuxt-link', 'router-view', 'el-row', 'social-sharing', 'font-awesome-icon', 'network'],
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
      stubs: ['nuxt-link', 'router-view', 'el-row', 'social-sharing', 'font-awesome-icon', 'network'],
    });

    window.removeEventListener = jest.fn();

    wrapper.destroy();

    expect(window.removeEventListener).toHaveBeenCalled();
  });
});
