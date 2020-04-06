import Vue from 'vue';
import store from '../../../src/store/modules/chapters';

describe('store/chapters.js', () => {
  beforeEach(() => {
    Vue.anhqvClient = {};
  });

  describe('actions', () => {
    const { actions } = store;

    describe('getAll', () => {
      it('it should call getChapters method and setAll mutation', (done) => {
        const expectedChapters = [
          {
            name: 'Érase un X',
            slug: '0x01',
          },
        ];

        const commit = jest.fn();

        Vue.anhqvClient.getChapters = jest.fn().mockResolvedValue({
          data: expectedChapters,
        });

        const params = {
          season: '0',
        };

        actions.getAll({ commit }, params)
          .then(() => {
            expect(Vue.anhqvClient.getChapters).toHaveBeenCalledWith(params);

            expect(commit).toHaveBeenCalledWith('setAll', expectedChapters);
            done();
          });
      });
    });
  });

  describe('mutations', () => {
    const { mutations, state } = store;

    describe('setAll', () => {
      it('it should modify all state property', () => {
        const chapters = [
          {
            name: 'John Doe',
          },
        ];

        mutations.setAll(state, chapters);

        expect(state.all).toEqual(chapters);
      });
    });
  });
});
