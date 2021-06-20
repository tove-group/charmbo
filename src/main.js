import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

window.API_HOST = 'https://t4-dating-api.azurewebsites.net';
if(window.location.hostname == 'localhost') window.API_HOST = 'https://localhost:3030';
if(window.location.hostname == 'tove-group.github.io') window.API_HOST = 'https://charmbo.parsons125.in:3030';
// socket.io
import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';
import vuetify from './plugins/vuetify'
//const socket = io('https://t3-dating-api.azurewebsites.net', {
const socket = io(window.API_HOST, {
  // query: {
  //   chatID: 'user1',
  // },
});
Vue.use(VueSocketIOExt, socket);
store.commit('setUserinfo',window.$cookies.get("auth"));

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
