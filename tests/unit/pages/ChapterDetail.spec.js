import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueMeta from 'vue-meta';
import ElementUI from 'element-ui';
import ChapterDetail from '../../../pages/seasons/_season_number/chapters/_slug/index.vue';

jest.mock('../../../utils');
// eslint-disable-next-line import/first
import utils from '../../../utils';

describe('ChapterDetail.vue', () => {
  let localVue;
  let store;
  let actions;
  let state;

  let configsState;
  let configsMutations;

  let seoConfigState;
  let seoConfigActions;

  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(ElementUI);
    localVue.use(VueMeta, { keyName: 'head' });

    state = {
      current: {
        name: 'Érase un X',
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

    seoConfigState = {
      currentSeoConfig: {
        title: 'Chapter title',
        description: 'Chapter description',
        canonical_url: 'http://chapter.com',
        og_title: 'Chapter og:title',
        og_type: 'Chapter og:type',
        og_image: 'Chapter og:image',
        og_url: 'Chapter og:url',
        og_description: 'Chapter og:description',
        twitter_site: 'Chapter twitter:site',
        twitter_card: 'Chapter twitter:card',
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
          state,
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
      const wrapper = shallowMount(ChapterDetail, {
        localVue,
        store,
        mocks: {
          $t: () => {},
          $route: {
            params: {
              chapter_slug: '0x01',
            },
          },
        },
        stubs: ['el-card', 'el-row', 'el-col', 'el-avatar', 'social-sharing', 'font-awesome-icon', 'network'],
        methods,
      });
    });

    it('it should execute created hook in browser', () => {
      process.browser = true;

      const methods = {
        handleResize: jest.fn(),
      };

      // eslint-disable-next-line no-unused-vars
      const wrapper = shallowMount(ChapterDetail, {
        localVue,
        store,
        mocks: {
          $t: () => {},
          $route: {
            params: {
              chapter_slug: '0x01',
            },
          },
        },
        stubs: ['el-card', 'el-row', 'el-col', 'el-avatar', 'social-sharing', 'font-awesome-icon', 'network'],
        methods,
      });

      expect(methods.handleResize).toHaveBeenCalled();
    });

    it('has correct <head> content', () => {
      const mockedMetas = {
        link: [
          {
            href: 'http://chapter.com',
            rel: 'canonical',
          },
        ],
        meta: [
          {
            content: 'Chapter description',
            hid: 'description',
            name: 'description',
          }, {
            content: 'Chapter og:title',
            hid: 'og:title',
            property: 'og:title',
          }, {
            content: 'Chapter og:type',
            hid: 'og:type',
            property: 'og:type',
          }, {
            content: 'Chapter og:image',
            hid: 'og:image',
            property: 'og:image',
          }, {
            content: 'Chapter og:url',
            hid: 'og:url',
            property: 'og:url',
          }, {
            content: 'Chapter og:description',
            hid: 'og:description',
            property: 'og:description',
          }, {
            content: 'Chapter twitter:site',
            hid: 'twitter:site',
            name: 'twitter:site',
          }, {
            content: 'Chapter twitter:card',
            hid: 'twitter:card',
            name: 'twitter:card',
          },
        ],
        title: 'Chapter title',
      };

      utils.getCommonMetas.mockReturnValue(mockedMetas);

      const wrapper = shallowMount(ChapterDetail, {
        localVue,
        store,
        stubs: ['nuxt-link', 'router-view', 'font-awesome-icon', 'Adsense', 'el-row', 'el-col', 'el-card', 'adsbygoogle', 'social-sharing', 'network'],
        mocks: {
          $t: () => {},
        },
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

      expect(title).toEqual('Chapter title');
      expect(descriptionMeta.content).toEqual('Chapter description');
      expect(canonicalUrlLink.href).toEqual('http://chapter.com');
      expect(ogTitleMeta.content).toEqual('Chapter og:title');
      expect(ogTypeMeta.content).toEqual('Chapter og:type');
      expect(ogImageMeta.content).toEqual('Chapter og:image');
      expect(ogUrlMeta.content).toEqual('Chapter og:url');
      expect(ogDescriptionMeta.content).toEqual('Chapter og:description');
      expect(twitterSiteMeta.content).toEqual('Chapter twitter:site');
      expect(twitterCardMeta.content).toEqual('Chapter twitter:card');
    });
  });


  describe('handleResize', () => {
    it('avatarSize for mobile', () => {
      utils.isMobile.mockReturnValue(true);

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
        stubs: ['el-card', 'el-row', 'el-col', 'el-avatar', 'social-sharing', 'font-awesome-icon', 'network'],
      });

      wrapper.vm.handleResize();
      expect(wrapper.vm.avatarSize).toEqual(100);
    });

    it('avatarSize for desktop', () => {
      utils.isMobile.mockReturnValue(false);

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
        stubs: ['el-card', 'el-row', 'el-col', 'el-avatar', 'social-sharing', 'font-awesome-icon', 'network'],
      });

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
      stubs: ['el-card', 'el-row', 'el-col', 'el-avatar', 'social-sharing', 'font-awesome-icon', 'network'],
    });

    window.removeEventListener = jest.fn();

    wrapper.destroy();

    expect(window.removeEventListener).toHaveBeenCalled();
  });
});
