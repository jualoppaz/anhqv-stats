import Vue from 'vue';

const state = {
  all: [],
};

const getters = {};

const actions = {
  getAll({ commit }) {
    return Vue.anhqvClient.getActors()
      .then((actors) => commit('setAll', actors.data));
  },
};

const mutations = {
  setAll(state, actors) {
    Vue.set(state, 'all', actors);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
