import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import Footer from '../../../src/components/Footer.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);

const router = new VueRouter();

describe('Footer.vue', () => {
  it('check initial data', () => {
    const wrapper = shallowMount(Footer, {
      localVue,
      router,
    });

    expect(wrapper.find('#copyright').exists()).toBe(true);
    expect(wrapper.find('#author').exists()).toBe(true);
    expect(wrapper.find('#copyright').text()).toBe('Copyright ©2020');
    expect(wrapper.find('#author').text()).toBe('👨‍💻 Juan Manuel López Pazos');
  });
});
