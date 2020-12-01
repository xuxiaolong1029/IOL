<template>
	<view class="page-car">
		<view class="car-content">
			<block v-for="(value, ind) in carTeamList" :key="'ss'+ind">
				<view class="car-team" hover-class="uni-list-cell-hover" @click="goDetail(value)">
					<text class="label">{{value.team_nume}}</text><text class="view">队长：{{value.team_leader}}</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

				carTeamList: [{
						team_num:'001',
						team_nume: "油田A队",
						team_leader: "队长一"
					},
					{
						team_num:'001',
						team_nume: "油田B队",
						team_leader: "队长二"
					},
					{
						team_num:'001',
						team_nume: "油田C队",
						team_leader: "队长三"
					},
					{
						team_num:'001',
						team_nume: "油田D队",
						team_leader: "队长四"
					},
					{
						team_num:'001',
						team_nume: "油田E队",
						team_leader: "队长五"
					},
					{
						team_num:'001',
						team_nume: "油田F队",
						team_leader: "队长六"
					}
				]
			}
		},
		onLoad(event) {

		},
		methods: {
			goDetail(row) {
				uni.navigateTo({
					url: "/pages/home/components/car_list?team_num="+row.team_num
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.page-car {
		width: 100%;
		overflow-y: hidden;
		position: relative;

		.car-content {
			padding: 20rpx;
			.car-team {
				width: 100%;
				height: 100rpx;
				line-height: 80rpx;
				font-size: 36rpx;
				display: flex;
				justify-content: space-between;
				margin-bottom: 20rpx;
				border: 1rpx #c8c7cc solid;
				padding: 10rpx 20rpx;
				box-sizing: border-box;
				border-radius: 20rpx;

				.view {
					color: #ccc;
					font-size: 28rpx;
				}
			}

			.uni-list-cell-hover {
				background-color: #eee;
			}
		}
	}
</style>
