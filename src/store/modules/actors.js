import Vue from 'vue';

const state = {
  all: [],
  current: {},
};

const getters = {};

const actions = {
  getAll({ commit }) {
    return Vue.anhqvClient.getActors()
      .then((actors) => commit('setAll', actors.data));
  },
  getBySlug({ commit }, { slug }) {
    return Vue.anhqvClient.getActorBySlug(slug)
      .then((actor) => commit('setCurrent', actor));
  },
  destroyCurrent({ commit }) {
    return commit('setCurrent', {});
  },
};

const mutations = {
  setAll(state, actors) {
    Vue.set(state, 'all', actors);
  },
  setCurrent(state, actor) {
    Vue.set(state, 'current', actor);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
