<template>
	<view class="page-auditing-details">
		<view class="details-content">
			<view class="list">
				<text class="list-label">司机：</text><text class="list-view">{{detailDate.driver}}</text>
			</view>
			<view class="list">
				<text class="list-label">车型：</text><text class="list-view">{{detailDate.type}}</text>
			</view>
			<view class="list">
				<text class="list-label">车队：</text><text class="list-view">{{detailDate.team}}</text>
			</view>
			<view class="list">
				<text class="list-label">车牌：</text><text class="list-view">{{detailDate.licensePlate}}</text>
			</view>
			<view class="list">
				<text class="list-label">申请时间：</text><text class="list-view">{{detailDate.time}}</text>
			</view>
			<view class="list">
				<text class="list-label">预达：</text><text class="list-view">{{detailDate.time}}</text>
			</view>
		</view>
		<view class="list-button" v-if='detailDate.status===0'>
			<button @click="submit" type="primary">审核</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailDate:{}
			}
		},
		onLoad(event) {
			const payload = event.payload;
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.detailDate = JSON.parse(decodeURIComponent(payload));
			} catch (error) {
				this.detailDate = JSON.parse(payload);
			}
			console.log(this.detailDate)
			uni.setNavigationBarTitle({
				title: this.detailDate.title
			});
			
		},
		methods: {
			submit(){
				uni.showModal({
				    title: '提示',
				    content: '是否通过审核',
				    success: function (res) {
				        if (res.confirm) {
				            uni.switchTab({
				              url: '/pages/auditing/index?status=1'
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
	.page-auditing-details{
		width: 100%;height:100vh;overflow-y: hidden;position: relative;
		.details-content{
			padding: 20rpx;
			.list{
				width: 100%;height: 100rpx;line-height: 100rpx;font-size: 32rpx;
				position: relative;
				&:after {
					position:absolute;z-index: 10;right: 0;bottom: 0;
					left: 0;height: 1px;content: '';transform: scaleY(.5);
					background-color: #c8c7cc;
				}
			}
		}
		.list-button{
			padding:0 20rpx;width: 100%;box-sizing: border-box;
			margin-top: 100rpx;
		}
	}
</style>
