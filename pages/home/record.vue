<template>
	<view class="page-record">
		<view class="record-content">
			<block v-for="(value, ind) in recordList" :key="'ss'+ind">
				<view class="record-team" hover-class="uni-list-cell-hover" @click="goDetail(value)">
					<view class="record-row">
						<text class="text">申请司机：{{value.deiver}}</text>
						<text class="text label">换油日期：{{value.time}}</text>
					</view>
					<view class="record-row">
						<text class="text">换油公里数：{{value.kilometer}}</text>
						<text class="text label">油品类型：{{value.iol_type}}</text>
					</view>
					<view class="record-row">
						<text class="text">单位数量：{{value.iol_unit}}</text>
						<text class="text label">数量：{{value.iol_num}}</text>
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
				recordList: [{
						time: "2020-11-23",
						deiver: "吴晓刚",
						kilometer: "100",
						iol_type: '95#',
						iol_unit: "L",
						iol_num: 10,
					},
					{
						time: "2020-11-23",
						deiver: "吴晓刚",
						kilometer: "100",
						iol_type: '95#',
						iol_unit: "L",
						iol_num: 10,
					},
					{
						time: "2020-11-23",
						deiver: "吴晓刚",
						kilometer: "100",
						iol_type: '95#',
						iol_unit: "L",
						iol_num: 10,
					},
					{
						time: "2020-11-23",
						deiver: "吴晓刚",
						kilometer: "100",
						iol_type: '95#',
						iol_unit: "L",
						iol_num: 10,
					}
				]
			}
		},
		onShow(event) {

		},
		methods: {
			goDetail(row) {
				uni.navigateTo({
					url: "/pages/home/components/car_list?team_num=" + row.team_num
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.page-record {
		width: 100%;position: relative;padding:20rpx 0;box-sizing: border-box;overflow-y: hidden;height:auto;
		.record-content {
			height:100%;overflow-y: auto;padding:0 20rpx;
			.record-team {
				width: 100%;margin-bottom: 20rpx;border: 1rpx #c8c7cc solid;
				padding:20rpx 25rpx;box-sizing: border-box;border-radius:30rpx;
				.record-row{
					width: 100%;line-height: 50rpx;display: flex;
					.text{
						display: inline-block;flex: 1;font-size: 32rpx;
					}
					.label{
						font-size: 26rpx;color: #666;
					}
				}
			}

			.uni-list-cell-hover {
				background-color: #eee;
			}
		}
	}
</style>
