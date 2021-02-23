import Vue from 'vue'
import App from './App.vue'

/* Router */
import router from './router'
/* ================================================================================ */

/* Bootstrap */
import 'bootstrap'
/* import 'bootstrap-fileinput'
import 'bootstrap-fileinput/css/fileinput.css' */
import './assets/css/main.css'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false
/* ================================================================================ */

/* VueFire */
import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)
/* ================================================================================ */

/* Notifications */
import Notifications from 'vue-notification'
Vue.use(Notifications)
/* ============= */
Vue.prototype.$prodCarrito=[];
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
