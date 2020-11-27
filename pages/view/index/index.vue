<template>
	<view class="content">
		<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<template v-for="(item,index) in bannerList">
				<swiper-item :key="index+'img'">
					<view class="swiper-item">
						<image :src="item.img" mode=""></image>
					</view>
				</swiper-item>
			</template>
		</swiper>
		<view class="btn-area">
			<template v-for="(item,index) in subMenu">
				<navigator :url="item.path" hover-class="navigator-hover" :key="index">
					<image class="img" :src="item.img" mode=""></image>
					<view class="title">{{item.title}}</view> 
				</navigator>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerList:[
					{img:'../../../static/ban1.png'},
					{img:'../../../static/ban2.png'},
					{img:'../../../static/ban3.png'}
				],
				subMenu:[
					{path:"subView/oil",title:"换油预约",img:"../../../static/oil.png"},
					{path:"subView/car",title:"车辆管理",img:"../../../static/car.png"},
					{path:"subView/record",title:"换油记录",img:"../../../static/record.png"},
				],
				indicatorDots: true,
				autoplay:true,
				interval:4000,
				duration:500
			}
		},
		onLoad(option) {
			console.log(option.id); //打印出上个页面传递的参数。
			console.log(option.name); //打印出上个页面传递的参数。
		},
		methods: {
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.detail.value
			},
			durationChange(e) {
				this.duration = e.detail.value
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		.swiper {
			width: 100%;
			height:300rpx;
			.swiper-item {
				display: block;
				height: 400rpx;
				line-height:400rpx;
				text-align: center;
				image{
					width: 100%;height:400rpx;
				}
			}
		}
		.btn-area {
			padding:60rpx 40rpx;
			display: flex;
			justify-content: space-between;
			text-align: center;
			.img{
				width:120rpx;height:120rpx;
			}
			.title{
				margin-top: 10rpx;color: #333;font-size:36rpx;
			}
		}
	}
</style>
