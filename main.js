import Vue from 'vue'
import App from './App'
//import http from 'plugins/network/index.js'
Vue.config.productionTip = false
//Vue.prototype.$http = http;
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
