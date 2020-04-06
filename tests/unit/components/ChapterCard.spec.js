import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import ChapterCard from '../../../src/components/ChapterCard.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);

const router = new VueRouter();

describe('ChapterCard.vue', () => {
  it('check initial data', () => {
    const wrapper = shallowMount(ChapterCard, {
      localVue,
      router,
      mocks: {
        $t: () => {},
      },
      propsData: {
        chapter: {
          name: 'Érase un X',
          image_url: 'http://path/to/image',
        },
      },
    });
    expect(wrapper.props().chapter.name).toBe('Érase un X');
    expect(wrapper.props().chapter.image_url).toBe('http://path/to/image');
  });

  it('it should navigate to detail page', () => {
    router.push = jest.fn();

    const wrapper = shallowMount(ChapterCard, {
      localVue,
      mocks: {
        $t: () => {},
        $router: {
          push: jest.fn(),
        },
      },
      propsData: {
        chapter: {
          name: 'Érase un X',
          slug: '0x01',
          image_url: 'http://path/to/image',
        },
      },
    });

    wrapper.vm.goToDetail();

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'ChapterDetail',
      params: {
        slug: '0x01',
      },
    });
  });
});
