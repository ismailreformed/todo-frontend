// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";
import VueAxios from "vue-axios";
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false
axios.defaults.withCredentials = true;

const baseURL = 'http://localhost/api/';

Vue.prototype.$http = axios;
axios.defaults.baseURL = baseURL;
Vue.prototype.baseURL = baseURL;

Vue.use(Vuetify);

const vuetify = new Vuetify();

/* eslint-disable no-new */
new Vue({
  router,
  VueAxios,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
