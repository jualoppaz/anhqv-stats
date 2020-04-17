import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import ActorCard from '../../../src/components/ActorCard.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);

const router = new VueRouter();

describe('ActorCard.vue', () => {
  it('check initial data', () => {
    const wrapper = shallowMount(ActorCard, {
      localVue,
      router,
      mocks: {
        $t: () => {},
      },
      propsData: {
        actor: {
          shortname: 'John',
          image_url: 'http://path/to/image',
        },
      },
    });
    expect(wrapper.props().actor.shortname).toBe('John');
    expect(wrapper.props().actor.image_url).toBe('http://path/to/image');
  });

  it('it should navigate to detail page', () => {
    router.push = jest.fn();

    const wrapper = shallowMount(ActorCard, {
      localVue,
      mocks: {
        $t: () => {},
        $router: {
          push: jest.fn(),
        },
      },
      propsData: {
        actor: {
          shortname: 'John',
          slug: 'john-doe',
          image_url: 'http://path/to/image',
        },
      },
    });

    wrapper.vm.goToDetail();

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'ActorDetail',
      params: {
        slug: 'john-doe',
      },
    });
  });
});
