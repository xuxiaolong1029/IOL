<template>
	<view class="content" :style="{height:height+'px'}">
		<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<block v-for="(item,index) in bannerList">
				<swiper-item :key="index+'img'">
					<view class="swiper-item">
						<image :src="item.img" mode=""></image>
					</view>
				</swiper-item>
			</block>
		</swiper>
		<view class="btn-area">
			<block v-for="(item,index) in subMenu">
				<view class="navigator-item" v-if="userInfo.roleName==='司机'?item.path!=='car':item.path">
					<navigator :url="item.path" hover-class="navigator-hover" :key="index">
						<image class="img" :src="item.img" mode=""></image>
						<view class="title">{{item.title}}</view>
					</navigator>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		computed: {
			...mapState(['userInfo'])
		},
		data() {
			return {
				height: 0,
				bannerList: [{
						img: '../../static/ban1.png'
					},
					{
						img: '../../static/ban2.png'
					},
					{
						img: '../../static/ban3.png'
					}
				],
				subMenu: [],
				indicatorDots: true,
				autoplay: true,
				interval: 4000,
				duration: 500,
			}
		},
		onShow() {
			if(Object.keys(this.userInfo).length===0){
				uni.navigateTo({
					url: "/pages/login"
				});
			}else{
				if (this.userInfo.roleName === '司机') {
					this.subMenu = [{
							path: "oil",
							title: "换油预约",
							img: "../../static/oil.png"
						},
						{
							path: "record",
							title: "换油记录",
							img: "../../static/record.png"
						}
					];
				} else if (this.userInfo.roleName === '队长') {
					this.subMenu = [{
							path: "oil",
							title: "换油预约",
							img: "../../static/oil.png"
						},
						{
							path: "car",
							title: "车辆管理",
							img: "../../static/car.png"
						},
						{
							path: "record",
							title: "换油记录",
							img: "../../static/record.png"
						}
					];
				} else {
					this.subMenu = [{
							path: "car",
							title: "车辆管理",
							img: "../../static/car.png"
						},
						{
							path: "record",
							title: "换油记录",
							img: "../../static/record.png"
						}
					];
				}
				uni.getStorage({
					key: 'screenHeight',
					success: (res) => {
						this.height = res.data
					}
				});
			}
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.content {
		width: 100%;

		.swiper {
			width: 100%;
			height: 400rpx;

			.swiper-item {
				display: block;
				height: 400rpx;
				line-height: 400rpx;
				text-align: center;

				image {
					width: 100%;
					height: 400rpx;
				}
			}
		}

		.btn-area {
			padding: 60rpx 40rpx;
			display: flex;
			flex-flow: wrap;
			text-align: center;

			.navigator-item {
				width: 33.33%;

				.img {
					width: 120rpx;
					height: 120rpx;
				}

				.title {
					margin-top: 10rpx;
					color: #333;
					font-size: 36rpx;
				}

				.navigator-hover {
					background-color: #fff;
				}
			}
		}
	}
</style>
