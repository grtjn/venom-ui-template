'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'base',
    redirect: { name: 'base.home' },
    meta: {}
  },
  {
    path: '/login',
    name: 'base.login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      label: 'Login',
      showInHeader: false,
      showInUserMenu: false
    }
  },
  {
    path: '/logout',
    name: 'base.logout',
    // route level code-splitting
    // this generates a separate chunk (logout.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "logout" */ '../views/Logout.vue'),
    meta: {
      label: 'Logout',
      showInHeader: false,
      showInUserMenu: true
    }
  },
  {
    path: '/home',
    name: 'base.home',
    // route level code-splitting
    // this generates a separate chunk (home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      label: 'Home',
      showInHeader: true,
      requiresLogin: true
    }
  },
  {
    path: '/about',
    name: 'base.about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      label: 'About',
      showInHeader: true
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// Protect all protected routes, redirecting to login if needed
sync(store, router);

const checkLogin = (to, from, next) => {
  if (
    store.getters.isAuthenticated ||
    !to.meta ||
    !(to.meta.requiresLogin || to.meta.requiresUpdates)
  ) {
    next();
  } else {
    next({
      name: 'base.login',
      params: {}
    });
  }
};

router.beforeEach(checkLogin);

export default router;
