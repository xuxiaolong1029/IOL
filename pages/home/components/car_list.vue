<template>
	<view class="page-car">
		<view class="car-content">
			<block v-for="(value, ind) in carList" :key="'ss'+ind">
				<view class="car-list" hover-class="uni-list-cell-hover">
					<image class="car-list-logo" :src="value.img"></image>
					<view class="car-list-text">
						<text class="label">{{value.type}}</text>
						<text class="label text">{{value.licensePlate}}</text>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				carList: [{
						licensePlate: "粤B0001",
						type: "小轿车",
						img: '../../../static/ban1.png'
					},
					{
						licensePlate: "粤B0004",
						type: "轻型货车",
						img: '../../../static/ban2.png'
					},
					{
						licensePlate: "粤B0002",
						type: "重型卡车",
						img: '../../../static/ban3.png'
					}
				]
			}
		},
		onLoad(event) {

		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
	.page-car {
		width: 100%;
		height: calc(100vh - 90rpx);
		overflow-y: hidden;
		position: relative;
		.car-content {
			padding: 20rpx;
			.car-list {
				width: 100%;font-size:30rpx;display: flex;padding:20rpx 0;
				justify-content: space-between;position: relative;
				&:before {
					position: absolute;height: 1px;transform: scaleY(.5);
					z-index: 10;right: 0;bottom: 0;left: 0;
					content: '';background-color: #c8c7cc;
				}
				.car-list-logo {
					height: 120rpx;width:200rpx;margin-right:30rpx;
					image {
						height: 100%;width: 100%;
					}
				}
				.car-list-text{
					flex: 1;
					.label{
						width: 100%;display: block;line-height:50rpx;font-size: 32rpx;
					}
					.text{
						font-size: 28rpx;color: #666;
					}
				}
			}
			.uni-list-cell-hover {
				background-color: #eee;
			}
		}
	}
</style>
