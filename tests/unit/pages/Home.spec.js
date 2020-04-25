import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import Home from '../../../pages/index.vue';

describe('Home.vue', () => {
  let localVue;
  let store;
  let configsState;
  let configsMutations;

  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(ElementUI);

    configsState = {
      currentTitle: '',
    };

    configsMutations = {
      setCurrentTitle: jest.fn(),
    };

    localVue.use(Vuex);

    store = new Vuex.Store({
      modules: {
        configs: {
          namespaced: true,
          state: configsState,
          mutations: configsMutations,
        },
      },
    });
  });

  it('check initial data', () => {
    const wrapper = shallowMount(Home, {
      localVue,
      store,
      stubs: ['nuxt-link', 'router-view', 'font-awesome-icon', 'Adsense', 'el-row', 'el-col', 'el-card', 'adsbygoogle'],
      mocks: {
        $t: () => {},
      },
    });

    expect(wrapper.find('#welcome-image').exists()).toBe(true);
  });
});
