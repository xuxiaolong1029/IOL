<template>
	<view class="page-tabs">
		<scroll-view ref="tabbar1" id="tab-bar" class="tab-bar" :scroll="false" :scroll-x="true" :show-scrollbar="false">
			<view style="flex-direction: row;display: flex;">
				<view class="uni-tab-item" v-for="(tab,index) in tabList" :key="tab.id" :id="tab.id" :ref="'tabitem'+index"
				 :data-id="index" :data-current="index" @click="ontabtap(index)">
					<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
				</view>
			</view>
			<view class="scroll-view-indicator">
				<view ref="underline" class="scroll-view-underline" :class="isTap ? 'scroll-view-animation':''" :style="{left:(33.3333*tabIndex)+'%'}"></view>
			</view>
		</scroll-view>
		<view class="tab-bar-line"></view>
		<swiper class="page-tab-box" ref="swiper1" :current="tabIndex" @change="onswiperchange">
			<blockv-for="(page, index) in tabList" :key="index">
				<swiper-item class="swiper-item" v-for="(page, index) in tabList" :key="index">
					<view style="flex: 1;">
						<scroll-view class="listview" style="flex: 1;" enableBackToTop="true" scroll-y @scrolltolower="loadMore()">
							<view class="uni-list">
								<block v-for="(value, ind) in pageList" :key="index+'ss'+ind">
									<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="goDetail(value,index)">
										<view class="uni-media-list">
											<image class="uni-media-list-logo" :src="value.img"></image>
											<view class="uni-media-list-body">
												<view class="uni-media-list-text-top">
													<text>
														{{ value.title }}
													</text>
													<text class="time">
														预达：{{ value.time}}
													</text>
												</view>
												<view class="uni-media-list-text-bottom">
													<text>司机：{{ value.driver }}</text>
													<text>车队：{{ value.team }}</text>
												</view>
												<view class="uni-media-list-text-bottom">
													<text>车型：{{ value.type }}</text>
													<text>车牌：{{ value.licensePlate }}</text>
												</view>
											</view>
										</view>
										<view class="uni-media-reject" v-if="value.refuse">
											<text class="text">驳回人：{{value.refuse.person}}</text>
											<text class="text" style="margin-top: 4px;">驳回原因：{{value.refuse.reason}}</text>
										</view>
									</view>
								</block>
							</view>
						</scroll-view>
					</view>
				</swiper-item>
				</block>
		</swiper>
		<!-- 	<uni-load-more :status="status" :icon-size="16" :content-text="contentText" @clickLoadMore='clickLoadMore' /> -->
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				status: 'more',
				tabList: [{
					id: "tab01",
					name: '待审批'
				}, {
					id: "tab02",
					name: '已审批'
				}, {
					id: "tab03",
					name: '未通过'
				}],
				swipePageList: {
					0: [{
							img: '../../static/ban1.png',
							title: "待审批01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 0,
						},
						{
							img: '../../static/ban2.png',
							title: "待审批01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 0,
						},
						{
							img: '../../static/ban3.png',
							title: "待审批01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 0,
						}, {
							img: '../../static/ban2.png',
							title: "待审批01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 0,
						},
						{
							img: '../../static/ban3.png',
							title: "待审批01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 0,
						}, {
							img: '../../static/ban2.png',
							title: "待审批01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 0,
						}, {
							img: '../../static/ban3.png',
							title: "待审批01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 0,
						}, {
							img: '../../static/ban2.png',
							title: "待审批01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 0,
						}, {
							img: '../../static/ban3.png',
							title: "待审批01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 0,
						}, {
							img: '../../static/ban2.png',
							title: "待审批01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 0,
						}, {
							img: '../../static/ban3.png',
							title: "待审批01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 0,
						}, {
							img: '../../static/ban2.png',
							title: "待审批01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 0,
						}, {
							img: '../../static/ban3.png',
							title: "待审批01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 0,
						}, {
							img: '../../static/ban2.png',
							title: "待审批01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 0,
						}, {
							img: '../../static/ban3.png',
							title: "待审批01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 0,
						}, {
							img: '../../static/ban2.png',
							title: "待审批01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 0,
						}, {
							img: '../../static/ban3.png',
							title: "待审批01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 0,
						}, {
							img: '../../static/ban2.png',
							title: "待审批01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 0,
						},
						{
							img: '../../static/ban3.png',
							title: "待审批01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 0,
						}
					],
					1: [{
							img: '../../static/ban2.png',
							title: "已审批01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 1,
						},
						{
							img: '../../static/ban1.png',
							title: "已审批01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 1,
						},
						{
							img: '../../static/ban3.png',
							title: "已审批01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 1,
						}
					],
					2: [{
							img: '../../static/ban3.png',
							title: "未通过01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 2,
							refuse: {
								person: "厂级主管王五",
								reason: '还可以继续使用一个月'
							}
						},
						{
							img: '../../static/ban1.png',
							title: "未通过01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 2,
							refuse: {
								person: "厂级主管王五",
								reason: '还可以继续使用一个月'
							}
						},
						{
							img: '../../static/ban2.png',
							title: "未通过01",
							licensePlate: '粤B001',
							driver: "吴晓刚",
							type: "重型卡车",
							time: "2020.06.08",
							team: "油田A队",
							status: 2,
							refuse: {
								person: "厂级主管王五",
								reason: '还可以继续使用一个月'
							}
						}
					]
				},
				pageList: [],
				tabIndex: 0,
				isTap: true
			}
		},
		onLoad(event) {
			this.tabIndex = Number(event.status) || 0;
			//this.pageList = this.swipePageList[this.tabIndex]
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			this.getTableData()
		},
		onReachBottom() {
			console.log('222d3d3')
			this.status = 'more';
		},
		methods: {
			loadMore(e) {
				console.log()
			},
			goDetail(row, index) {
				if (index === 2) return
				uni.navigateTo({
					url: "/pages/auditing/details?payload=" + encodeURIComponent(JSON.stringify(row))
				});
			},
			clickLoadMore(e) {
				console.log(e)
			},
			ontabtap(e) {
				this.tabIndex = e
				this.getTableData()
			},
			onswiperchange(e) {
				let index = e.target.current || e.detail.current;
				this.tabIndex = index;
				this.getTableData()
			},
			getTableData() {
				this.pageList = this.swipePageList[this.tabIndex];
				this.status = 'noMore';
				uni.startPullDownRefresh();
			}
		}
	}
</script>

<style lang="less" scoped>
	/* #ifndef APP-PLUS-NVUE */
	.page-tabs {
		width: 100%;
		flex: 1;
		flex-direction: column;
		background-color: #ffffff;

		.tab-bar {
			/* #ifdef APP-PLUS */
			width: 750rpx;
			/* #endif */
			height: 42px;
			flex-direction: row;
			/* #ifndef APP-PLUS */
			white-space: nowrap;
			/* #endif */
			.scroll-view-indicator {
				position: relative;
				height: 2px;
				background-color: transparent;

				.scroll-view-underline {
					position: absolute;
					top: 0;
					bottom: 0;
					width: 33.3333%;
					background-color: #5777FE;
				}

				.scroll-view-animation {
					transition-duration: 0.2s;
					transition-property: left;
				}
			}

			.uni-tab-item {
				flex-wrap: nowrap;
				flex: 1;
				text-align: center;

				.uni-tab-item-title {
					color: #555;
					font-size: 15px;
					height: 40px;
					line-height: 40px;
					flex-wrap: nowrap;
					/* #ifndef APP-PLUS */
					white-space: nowrap;
					/* #endif */
				}

				.uni-tab-item-title-active {
					color: #5777FE;
				}
			}
		}

		.tab-bar-line {
			height: 1px;
			background-color: #cccccc;
		}

		.page-tab-box {
			height: calc(100vh - 278rpx);
			/* #ifdef APP-PLUS */
			height: calc(100vh - 84rpx);
			/* #endif */
			width: 100vw;
			overflow: auto;
			flex: 1;

			.listview {
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				display: -webkit-box;
				display: -webkit-flex;
				display: flex;
				flex-direction: column;
				flex-direction: column;
			}

			.uni-list {
				background-color: #FFFFFF;
				position: relative;
				width: 100%;
				overflow: auto;
				height: 100%;

				&:before {
					position: absolute;
					height: 1px;
					transform: scaleY(.5);
					z-index: 10;
					right: 0;
					top: 0;
					left: 0;
					content: '';
					background-color: #c8c7cc;
				}
			}

			.uni-list-cell {
				position: relative;
				padding: 22rpx 30rpx;

				&:after {
					position: absolute;
					z-index: 10;
					right: 0;
					bottom: 0;
					left: 0;
					height: 1px;
					content: '';
					transform: scaleY(.5);
					background-color: #c8c7cc;
				}

				.uni-media-list {
					box-sizing: border-box;
					display: flex;
					width: 100%;
					flex-direction: row;

					.uni-media-list-logo {
						height: 150rpx;
						width: 220rpx;
						margin-right: 20rpx;

						image {
							height: 100%;
							width: 100%;
						}
					}

					.uni-media-list-body {
						display: flex;
						height: 150rpx;
						overflow: hidden;
						flex: 1;
						flex-direction: column;

						.uni-media-list-text-top {
							width: 100%;
							display: flex;
							justify-content: space-between;
							flex-direction: row;
							height: 56rpx;
							line-height: 50rpx;
							font-size: 32rpx;

							.time {
								font-size: 26rpx;
								color: #8f8f94;
							}
						}

						.uni-media-list-text-bottom {
							width: 100%;
							height: 40rpx;
							margin-top: 10rpx;
							line-height: 40rpx;
							display: flex;
							justify-content: space-between;
							flex-direction: row;
							font-size: 28rpx;
							color: #333;
						}
					}

				}

				.uni-media-reject {
					width: 100%;
					margin-top: 10rpx;
					color: red;
					font-size: 26rpx;

					.text {
						width: 100%;
						display: inline-block;
					}
				}
			}

			.uni-list-cell-hover {
				//background-color: #eee;
			}
		}
	}

	/* #endif */
</style>
