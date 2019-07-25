import {
  handlerResponse,
  setNotifyData
} from '../../helpers/commonHelpers.js';
import {
  serverUrl
} from '../../config/config.js';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    tasks: [],
    projects: []
  },
  mutations: {
    setProjects(state, data) {
      state.projects = data;
    },
    setTasks(state, data) {
      state.tasks = data;
    }
  },
  actions: {
    getProjects(store) {
      Vue.http.get(`${serverUrl}/api/projects`)
        .then(response => response.json()).then(data => {
        store.commit('setProjects', data);
      });
    },
    getTasks(store) {
      Vue.http.get(`${serverUrl}/api/tasks`)
        .then(response => response.json()).then(data => {
        store.commit('setTasks', data);
      });
    }
  }
}
