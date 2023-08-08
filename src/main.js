// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";
import VueAxios from "vue-axios";
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import { getAuthToken } from './auth';

Vue.config.productionTip = false
axios.defaults.withCredentials = true;

const baseURL = 'http://localhost:80/api/'
axios.defaults.baseURL = baseURL;

axios.interceptors.request.use(config => {
  const token = getAuthToken();

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Add response interceptor to handle unauthorized responses
axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    // Handle unauthorized access (e.g., redirect to login)
    // You can also refresh tokens or perform other actions here
  }
  return Promise.reject(error);
});

Vue.prototype.$http = axios;
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
