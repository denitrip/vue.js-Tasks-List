import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import tasks from './tasks/Tasks';

export const store = new Vuex.Store({
  modules: {
    tasks
  },
  //strict: process.env.NODE_ENV !== 'production'
});
