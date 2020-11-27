<template>
	<view class="page">
		<view class="login-logo">
			<text class="logo">
				<image src="../../static/logo.png" mode=""></image>
			</text>
		</view>
		<view class="login-form">
			<view class="accout uni-input-wrapper">
				<input type="text" v-model="inputForm.username" placeholder="请输入账号">
			</view>
			<view class="password uni-input-wrapper">
				<input type="password" v-model="inputForm.password" placeholder="请输密码">
			</view>
			<view>
				<button @click="loginButton">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '../../plugins/network/index.js'
	export default {
		data() {
			return {
				inputForm:{
					username:'',
					password:''
				}
			};
		},
		methods:{
			loginButton(){
				http.server({
					url: '/sys-auth/user/login',
					method: 'POST',
					data: this.inputForm
				}).then(res => {
					if(res.code === 200){
						uni.showToast({
							title: res.message,
							icon:'none',//不要图标
							duration: 1000//1后消失
						});
					}else{
						uni.showToast({
							title: res.message,
							icon:'none',//不要图标
							duration: 1000//1后消失
						});
					}
				});
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
				background: #fff;width: 120rpx;height: 120rpx;margin-top: 100rpx;
				display:inline-block;padding:10rpx;border-radius: 50%;box-sizing: content-box;
				image{
					width: 100rpx;height: 100rpx;margin-top:10rpx;
				}
			}
		}
		.login-form{
			padding: 40rpx 50rpx;
			input{
				height: 70rpx;border-bottom: 1rpx solid #ccc;margin-top: 25rpx;caret-color:#5777FE;
				padding-left: 20rpx;
				&:focus{
					border-bottom:1rpx solid #5777FE;
				}
			}
			button{
				background-color:#5777FE;color: #fff;margin-top:180rpx;
			}
		}
	}
</style>
