import Vue from 'vue'
import App from './App'
//import http from 'plugins/network/index.js'
//引入vuex
import store from './store/index.js'
//把vuex定义成全局组件
Vue.prototype.$store = store
Vue.config.productionTip = false
//Vue.prototype.$http = http;
App.mpType = 'app'

const app = new Vue({
    ...App,
	 store
})
app.$mount()
