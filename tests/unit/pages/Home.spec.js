import { createLocalVue, shallowMount } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Home from '../../../pages/index.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('Home.vue', () => {
  it('check initial data', () => {
    const wrapper = shallowMount(Home, {
      localVue,
      stubs: ['nuxt-link', 'router-view', 'font-awesome-icon', 'Adsense', 'el-row', 'el-col', 'el-card'],
      mocks: {
        $t: () => {},
      },
    });

    expect(wrapper.find('#welcome-image').exists()).toBe(true);
  });
});
