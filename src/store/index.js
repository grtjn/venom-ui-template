'use strict';

import Vue from 'vue';
import Vuex from 'vuex';

import { AuthClient } from '@/venom-api/stub-client';

Vue.use(Vuex);

const $store = new Vuex.Store({
  state: {
    username: undefined
  },
  mutations: {
    loggedIn(state, { username }) {
      state.username = username;
    },
    loggedOut(state) {
      state.username = undefined;
    }
  },
  actions: {
    validateLogin({ commit }, { username, password }) {
      let client = AuthClient();
      return client.login(username, password).then(response => {
        console.log(response);
        commit('loggedIn', { username });
        return response;
      });
    },
    logout({ commit }) {
      commit('loggedOut');
      return AuthClient().logout();
    }
  },
  getters: {
    isAuthenticated(state) {
      return !!state.username;
    }
  },
  modules: {}
});

export default $store;
