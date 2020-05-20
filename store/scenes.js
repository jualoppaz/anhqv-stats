import Vue from 'vue';

export const state = () => ({
  current: {},
});

export const getters = {};

export const actions = {
};

export const mutations = {
  setCurrent(state, scene) {
    Vue.set(state, 'current', scene);
  },
};
