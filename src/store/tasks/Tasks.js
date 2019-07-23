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
    tasks: [{id: 1, status: 'active', title: 'Seating', project: 'Seating time'},
      {id: 2, status: 'active', title: 'Chilling', project: 'Chilling time'},
      {
        id: 3, status: 'completed', title: 'Drinking', project: 'Drinking hours'
      }],
    projects: []
  },
  getters: {
    tasks(state) {
      return state.tasks;
    }
  },
  mutations: {
    addTask(state, data) {
      data.id = state.tasks.length + 1;
      state.tasks.push(data);
    },
    changeStatus(state, data) {
      state.tasks.map((e) => {
        if (e.id === data.id) {
          e.status = data.status;
        }
      })
    },
    deleteTask(state, data) {
      state.tasks = state.tasks.filter(e => e.id !== data);
      Vue.notify(setNotifyData('Success', 'Task has been deleted!', 'success'))
    },
    setProjects(state, data) {
      state.projects = data;
    }
  },
  actions: {
    getProjects(store) {
      Vue.http.get(`${serverUrl}/api/projects`)
        .then(response => response.json()).then(data => {
        store.commit('setProjects', data);
    });
    }
  }
}
