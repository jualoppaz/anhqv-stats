import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import CharacterCard from '../../../src/components/CharacterCard.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);

const router = new VueRouter();

describe('CharacterCard.vue', () => {
  it('check initial data', () => {
    const wrapper = shallowMount(CharacterCard, {
      localVue,
      router,
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
    router.push = jest.fn();

    const wrapper = shallowMount(CharacterCard, {
      localVue,
      mocks: {
        $t: () => {},
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
      name: 'CharacterDetail',
      params: {
        slug: 'john-doe',
      },
    });
  });
});
