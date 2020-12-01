<template>
	<view class="page-person">
		<view class="person-content">
			<image class="person-logo" :src="person.img"></image>
			<view class="person-text">
				<text class="label">姓名：{{person.name}}</text>
				<text class="label text">职位：{{person.post}}</text>
			</view>
		</view>
		<view class="logout">
			<button type="primary" @click="logout">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				person: {
					post: "司机",
					name: "刘晓器",
					img: '../../static/logo.png'
				}
			}
		},
		onLoad(event) {

		},
		methods: {
			logout() {
				uni.showModal({
					title: '提示',
					content: '是否退出',
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: "/pages/login"
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
		height:calc(100vh - 200rpx);
		overflow-y: hidden;
		position: relative;

		.person-content {
			width: 100%;
			text-align: center;
			padding-top: 100rpx;

			.person-logo {
				width: 150rpx;
				height: 150rpx;
				border-radius:100rpx;
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
