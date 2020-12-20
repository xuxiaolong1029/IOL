import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import http from '../plugins/network/index.js'
const store = new Vuex.Store({
	state: {
		userInfo:{},
		portIP: {}
	},
	mutations: {
		setLoginData(state, data) {
			state.userInfo = data;
		}
	},
	actions: {
		async getLoginData({commit,state},req) {
			await http.server({
				url: '/api/auth/login',
				method: 'POST',
				data:req
			}).then(res => {
				if (res.code === 0) {
					commit('setLoginData', res.data)
					uni.setStorage({
						key: 'storage_user',
						data: JSON.stringify(res.data),
						success: function() {
							uni.switchTab({
								url: '/pages/home/index'
							});
						}
					});
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none', //不要图标
						duration: 1000 //1后消失
					});
				}
			});
		},
	}
})
export default store
