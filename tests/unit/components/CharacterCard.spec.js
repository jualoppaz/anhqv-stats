import { createLocalVue, shallowMount } from '@vue/test-utils';
import ElementUI from 'element-ui';
import CharacterCard from '../../../components/CharacterCard.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('CharacterCard.vue', () => {
  it('check initial data', () => {
    const wrapper = shallowMount(CharacterCard, {
      localVue,
      mocks: {
        $t: () => {},
      },
      propsData: {
        character: {
          shortname: 'John',
          image_url: 'http://path/to/image',
        },
      },
    });
    expect(wrapper.props().character.shortname).toBe('John');
    expect(wrapper.props().character.image_url).toBe('http://path/to/image');
  });

  it('it should navigate to detail page', () => {
    const wrapper = shallowMount(CharacterCard, {
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
        character: {
          shortname: 'John',
          slug: 'john-doe',
          image_url: 'http://path/to/image',
        },
      },
    });

    wrapper.vm.goToDetail();

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'characters-slug___es',
      params: {
        slug: 'john-doe',
      },
    });
  });
});
