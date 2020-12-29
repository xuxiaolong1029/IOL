<template>
	<view class="page-person">
		<view class="person-content">
			<image class="person-logo" src="../../static/logo.png"></image>
			<view class="person-text">
				<text class="label">姓名：{{userInfo.username}}</text>
				<text class="label text">职位：{{userInfo.roleName}}</text>
			</view>
		</view>
		<view class="logout">
			<button type="primary" @click="logout(1)">退出登录</button>
			<button style="margin-top:40rpx;" @click="logout(2)">退出APP</button>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		computed: {
			//...mapState(['userInfo'])
		},
		data(){
			return{
				userInfo:{}
			}
		},
		onLoad(event) {
			this.userInfo = JSON.parse(uni.getStorageSync('storage_user'));
		},
		methods: {
			...mapMutations(['setLoginData']),
			logout(type) {
				uni.showModal({
					title: '提示',
					content: type === 1 ? '是否退出登录' : '是否退出APP',
					success:(res)=>{
						if (res.confirm) {
							this.setLoginData({});
							uni.removeStorage({
								key: 'storage_user',
								success: (res)=>{
									if (type === 1) {
										uni.redirectTo({
											url: '/pages/login'
										})
									} else {
										if (uni.getSystemInfoSync().platform == 'ios') {
											plus.ios.import("UIApplication").sharedApplication().performSelector("exit")
										} else if (uni.getSystemInfoSync().platform == 'android') {
											plus.runtime.quit();
										}
									}

								}
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.page-person {
		width: 100%;
		height: calc(100vh - 240rpx);
		overflow-y: hidden;
		position: relative;

		.person-content {
			width: 100%;
			text-align: center;
			padding-top: 100rpx;

			.person-logo {
				width: 150rpx;
				height: 150rpx;
				border-radius: 100rpx;
				padding: 20rpx;

				image {
					height: 100%;
					width: 100%;
				}
			}

			.person-text {
				padding-top: 40rpx;
				text-align: left;
				padding-left: 250rpx;

				.label {
					width: 100%;
					display: block;
					line-height: 80rpx;
					font-size: 40rpx;
					height: 80rpx;
				}
			}

		}

		.logout {
			position: absolute;
			bottom: 40rpx;
			padding: 20rpx 80rpx;
			width: 100%;
			box-sizing: border-box;
		}
	}
</style>
