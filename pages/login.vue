<template>
	<view class="page">
		<view class="login-logo">
			<view class="logo">
				<image src="../static/logo.png" mode=""></image>
			</view>
		</view>
		<view class="login-form">
			<view class="accout uni-input-wrapper">
				<input type="text" placeholder-style="color:#ccc" v-model="inputForm.username" placeholder="请输入账号">
			</view>
			<view class="password uni-input-wrapper">
				<input type="password" placeholder-style="color:#ccc" v-model="inputForm.password" placeholder="请输密码">
			</view>
			<view>
				<button @click="loginButton">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '../plugins/network/index.js'
	export default {
		data() {
			return {
				inputForm:{
					username:'admin',
					password:'admin'
				}
			};
		},
		methods:{
			loginButton(){
				if(!this.inputForm.username){
					uni.showToast({
						title: "请输入账号",
						icon:'none',//不要图标
						duration: 1000//1后消失
					});
					return
				}
				if(!this.inputForm.password){
					uni.showToast({
						title: "请输入密码",
						icon:'none',//不要图标
						duration: 1000//1后消失
					});
					return
				}
				uni.switchTab({
				  url: '/pages/home/index'
				});
				/* http.server({
					url: '/sys-auth/user/login',
					method: 'POST',
					data: this.inputForm
				}).then(res => {
					if(res.code === 200){
						uni.switchTab({
						  url: '/pages/home/index'
						});
					}else{
						uni.showToast({
							title: res.message,
							icon:'none',//不要图标
							duration: 1000//1后消失
						});
					}
				}); */
			}
		}
	}
</script>

<style lang="less" scoped>
	.page{
		width: 100vw;
		.login-logo{
			width: 100%;position: relative;height:400rpx;
			background-color:#5777FE;text-align: center;
			border-bottom-right-radius:100rpx;
			border-bottom-left-radius:100rpx;
			.logo{
				background: #fff;width: 160rpx;height: 160rpx;margin-top: 100rpx;
				display:inline-block;padding:10rpx;border-radius: 50%;box-sizing: content-box;
				image{
					width: 140rpx;height: 140rpx;margin-top:10rpx;border-radius: 50%;
				}
			}
		}
		.login-form{
			padding: 40rpx 50rpx;
			input{
				height: 70rpx;border-bottom: 1rpx solid #eee;margin-top: 25rpx;caret-color:#5777FE;
				padding-left: 20rpx;
			}
			button{
				background-color:#5777FE;color: #fff;margin-top:180rpx;
			}
		}
	}
</style>
