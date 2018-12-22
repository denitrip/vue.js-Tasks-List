import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Index from '../components/pages/Index';
import E404 from '../components/pages/E404';

const routes = [
  {
    name: 'Index',
    path: '/',
    component: Index,
    meta: {
      title: 'To Do List'
    }
  },
  {
    path: '*',
    component: E404,
    meta: {
      title: 'Page Not Found'
    }
  }
]

export const router = new VueRouter({
  routes,
  mode: 'history'
});
