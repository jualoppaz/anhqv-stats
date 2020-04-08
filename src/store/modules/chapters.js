import Vue from 'vue';

const state = {
  all: [],
  current: {},
};

const getters = {};

const actions = {
  getAll({ commit }, params) {
    return Vue.anhqvClient.getChapters(params)
      .then((chapters) => commit('setAll', chapters.data));
  },
  getBySlug({ commit }, { slug }) {
    return Vue.anhqvClient.getChapterBySlug(slug)
      .then((chapter) => commit('setCurrent', chapter));
  },
  destroyCurrent({ commit }) {
    return commit('setCurrent', {});
  },
};

const mutations = {
  setAll(state, chapters) {
    Vue.set(state, 'all', chapters);
  },
  setCurrent(state, chapter) {
    Vue.set(state, 'current', chapter);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
