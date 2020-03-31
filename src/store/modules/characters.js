import Vue from 'vue';

const state = {
  all: [],
  current: {},
};

const getters = {};

const actions = {
  getAll({ commit }) {
    return Vue.anhqvClient.getCharacters()
      .then((characters) => commit('setAll', characters.data));
  },
  getBySlug({ commit }, { slug }) {
    return Vue.anhqvClient.getCharacterBySlug(slug)
      .then((character) => commit('setCurrent', character));
  },
  destroyCurrent({ commit }) {
    return commit('setCurrent', {});
  },
};

const mutations = {
  setAll(state, characters) {
    Vue.set(state, 'all', characters);
  },
  setCurrent(state, character) {
    Vue.set(state, 'current', character);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
