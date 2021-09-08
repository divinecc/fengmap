import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
axios.defaults.baseURL = 'http://192.168.101.12:8082';
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
