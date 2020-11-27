<template>
	<view class="page">
		<view class="login-logo">
			<text class="logo">
				<image src="../../static/logo.png" mode=""></image>
			</text>
		</view>
		<view class="radius"></view>
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
				uni.request({
				    url: '/sys-auth/user/login', //仅为示例，并非真实接口地址。
				    data:this.inputForm,
					header: {
					    'Content-Type': "application/json;charset=UTF-8"
					},
					method:'POST',
				    success: (res) => {
				        console.log(res.data);
						//this.$router.push({path:'/pages/view/index/index'})
				        //this.text = 'request success';
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
			width: 100%;position: relative;height:300rpx;
			background-color:#5777FE;
			text-align: center;
			.logo{
				background: #fff;width: 120rpx;height: 120rpx;margin-top: 100rpx;
				display:inline-block;padding:10rpx;border-radius: 50%;box-sizing: content-box;
				image{
					width: 100rpx;height: 100rpx;margin-top:10rpx;
				}
			}
		}
		.radius{
			width: 100%;height:100rpx;
			border-bottom-right-radius:400rpx;
			background-color:#5777FE;
			border-bottom-left-radius:400rpx;
		}
		.login-form{
			padding: 40rpx 50rpx;
			input{
				height: 70rpx;border-bottom: 1rpx solid #ccc;margin-top: 25rpx;caret-color:#5777FE;
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
