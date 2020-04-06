import Vue from 'vue';

const state = {
  all: [],
};

const getters = {};

const actions = {
  getAll({ commit }, params) {
    return Vue.anhqvClient.getChapters(params)
      .then((characters) => commit('setAll', characters.data));
  },
};

const mutations = {
  setAll(state, characters) {
    Vue.set(state, 'all', characters);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
