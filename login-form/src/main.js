import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'
import App from './App.vue'

Vue.use(VueAxios, axios)
Vue.use(Vuelidate)
Vue.config.productionTip = false

export const bus = new Vue();

new Vue({
  render: h => h(App)
}).$mount('#app')
