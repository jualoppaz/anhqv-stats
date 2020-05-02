import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueMeta from 'vue-meta';
import ElementUI from 'element-ui';
import Season from '../../../pages/seasons/index.vue';

jest.mock('../../../utils');
// eslint-disable-next-line import/first
import utils from '../../../utils';

describe('Season.vue', () => {
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

    seoConfigState = {
      currentSeoConfig: {
        title: 'Chapters title',
        description: 'Chapters description',
        canonical_url: 'http://chapters.com',
        og_title: 'Chapters og:title',
        og_type: 'Chapters og:type',
        og_image: 'Chapters og:image',
        og_url: 'Chapters og:url',
        og_description: 'Chapters og:description',
        twitter_site: 'Chapters twitter:site',
        twitter_card: 'Chapters twitter:card',
      },
    };

    seoConfigActions = {
      getSeoConfigBySlug: jest.fn(),
    };

    localVue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        chapters: {
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
        stubs: ['el-row', 'social-sharing', 'font-awesome-icon', 'network'],
        methods,
      });

      expect(wrapper.vm.gutter).toEqual(50);
    });

    it('it should execute created hook in browser', () => {
      process.browser = true;

      const methods = {
        handleResize: jest.fn(),
      };

      // eslint-disable-next-line no-unused-vars
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
        stubs: ['el-row', 'social-sharing', 'font-awesome-icon', 'network'],
        methods,
      });

      expect(methods.handleResize).toHaveBeenCalled();
    });

    it('has correct <head> content', () => {
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
        stubs: ['el-row', 'social-sharing', 'font-awesome-icon', 'network'],
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

      expect(title).toEqual('Chapters title');
      expect(descriptionMeta.content).toEqual('Chapters description');
      expect(canonicalUrlLink.href).toEqual('http://chapters.com');
      expect(ogTitleMeta.content).toEqual('Chapters og:title');
      expect(ogTypeMeta.content).toEqual('Chapters og:type');
      expect(ogImageMeta.content).toEqual('Chapters og:image');
      expect(ogUrlMeta.content).toEqual('Chapters og:url');
      expect(ogDescriptionMeta.content).toEqual('Chapters og:description');
      expect(twitterSiteMeta.content).toEqual('Chapters twitter:site');
      expect(twitterCardMeta.content).toEqual('Chapters twitter:card');
    });
  });

  describe('handleResize', () => {
    it('gutter for mobile', () => {
      utils.isMobile.mockReturnValue(true);

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
        stubs: ['el-row', 'social-sharing', 'font-awesome-icon', 'network'],
      });

      wrapper.vm.handleResize();
      expect(wrapper.vm.gutter).toEqual(20);
    });

    it('gutter for desktop', () => {
      utils.isMobile.mockReturnValue(false);

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
        stubs: ['el-row', 'social-sharing', 'font-awesome-icon', 'network'],
      });

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
      stubs: ['el-row', 'social-sharing', 'font-awesome-icon', 'network'],
    });

    window.removeEventListener = jest.fn();

    wrapper.destroy();

    expect(window.removeEventListener).toHaveBeenCalled();
  });
});
