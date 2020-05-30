import { createLocalVue, shallowMount } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import ChapterScenesList from '../../../../components/chapters/ChapterScenesList.vue';

describe('ChapterScenesList.vue', () => {
  let localVue;
  let store;
  let actions;
  let state;

  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(ElementUI);

    state = {
      current: {
        scenes: [
          {
            events: [
              {
                type: 'DIALOG',
              },
            ],
          },
        ],
      },
    };

    actions = {

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
    const wrapper = shallowMount(ChapterScenesList, {
      localVue,
      store,
      mocks: {
        $t: () => {},
        $i18n: {
          locale: 'es',
        },
      },
      stubs: ['el-card', 'el-row', 'el-button', 'nuxt-link'],
    });
    expect(wrapper.find('#chapter-scenes-list').exists()).toBeTruthy();
    expect(wrapper.vm.tabPosition).toEqual('left');
  });
});
