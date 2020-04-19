import { createLocalVue, shallowMount } from '@vue/test-utils';
import ElementUI from 'element-ui';
import ChapterCard from '../../../components/ChapterCard.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('ChapterCard.vue', () => {
  it('check initial data', () => {
    const wrapper = shallowMount(ChapterCard, {
      localVue,
      mocks: {
        $t: () => {},
      },
      propsData: {
        chapter: {
          name: 'Érase un X',
          image_url: 'http://path/to/image',
        },
      },
      stubs: ['el-card', 'el-row', 'el-button'],
    });
    expect(wrapper.props().chapter.name).toBe('Érase un X');
    expect(wrapper.props().chapter.image_url).toBe('http://path/to/image');
  });

  it('it should navigate to detail page', () => {
    const wrapper = shallowMount(ChapterCard, {
      localVue,
      mocks: {
        $t: () => {},
        $i18n: {
          locale: 'es',
        },
        $router: {
          push: jest.fn(),
        },
      },
      propsData: {
        chapter: {
          name: 'Érase un X',
          slug: '0x01',
          season: '0',
          image_url: 'http://path/to/image',
        },
      },
      stubs: ['el-card', 'el-row', 'el-button'],
    });

    wrapper.vm.goToDetail();

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'seasons-season_number-slug___es',
      params: {
        slug: '0x01',
        season_number: '0',
      },
    });
  });
});
