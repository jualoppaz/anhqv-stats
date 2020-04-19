import { createLocalVue, shallowMount } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Footer from '../../../components/Footer.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('Footer.vue', () => {
  it('check initial data', () => {
    const wrapper = shallowMount(Footer, {
      localVue,
    });

    expect(wrapper.find('#copyright').exists()).toBe(true);
    expect(wrapper.find('#author').exists()).toBe(true);
    expect(wrapper.find('#copyright').text()).toBe('Copyright ©2020');
    expect(wrapper.find('#author').text()).toBe('👨‍💻 Juan Manuel López Pazos');
  });
});
