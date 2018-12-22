import {
  handlerResponse,
  setNotifyData
} from '../../helpers/commonHelpers.js';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    tasks: [{id: 1, status: 'active', title: 'Seating', project: 'Seating time'},
      {id: 2, status: 'active', title: 'Chilling', project: 'Chilling time'},
      {id: 3, status: 'completed', title: 'Drinking', project: 'Drinking hours'
      }],
    projects: [{id: 1, name: 'project X'},
      {id: 2, name: 'Little Billie'},
      {id: 3, name: 'Big Bro'},
      {id: 4, name: 'Ninja Tortles Comeback'
    }]
  },
  getters: {
    tasks(state) {
      return state.tasks;
    },
    projects(state) {
      return state.projects;
    }
  },
mutations: {
  addTask(state, data) {
    data.id = state.tasks.length + 1;
    state.tasks.push(data);
  },
  changeStatus(state, data) {
    state.tasks.map((e) => {
      if(e.id == data.id)
    {
      e.status = data.status;
    }
  })
  },
  deleteTask(state, data) {
    state.tasks = state.tasks.filter(e => e.id !== data);
    Vue.notify(setNotifyData('Success', 'Task has been deleted!', 'success'))
  }
}
}
