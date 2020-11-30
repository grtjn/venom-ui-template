import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import './styles/custom.scss';

sync(store, router);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
