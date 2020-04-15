import Vue from 'vue';
import store from '../../../src/store/modules/actors';

describe('store/actors.js', () => {
  beforeEach(() => {
    Vue.anhqvClient = {};
  });

  describe('actions', () => {
    const { actions } = store;

    describe('getAll', () => {
      it('it should call getActors method and setAll mutation', (done) => {
        const expectedActors = [
          {
            name: 'John Doe',
          },
        ];

        const commit = jest.fn();

        Vue.anhqvClient.getActors = jest.fn().mockResolvedValue({
          data: expectedActors,
        });

        actions.getAll({ commit })
          .then(() => {
            expect(Vue.anhqvClient.getActors).toHaveBeenCalled();

            expect(commit).toHaveBeenCalledWith('setAll', expectedActors);
            done();
          });
      });
    });
  });

  describe('mutations', () => {
    const { mutations, state } = store;

    describe('setAll', () => {
      it('it should modify all state property', () => {
        const actors = [
          {
            name: 'John Doe',
          },
        ];

        mutations.setAll(state, actors);

        expect(state.all).toEqual(actors);
      });
    });
  });
});
