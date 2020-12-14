<template>
	<view class="page-auditing-details">
		<view class="details-content">
			<view class="list">
				<text class="list-label">司机：</text><text class="list-view">{{detailDate.applicant}}</text>
			</view>
			<view class="list">
				<text class="list-label">车队：</text><text class="list-view">{{detailDate.fleetLeader}}</text>
			</view>
			<view class="list">
				<text class="list-label">车牌：</text><text class="list-view">{{detailDate.plate}}</text>
			</view>
			<view class="list">
				<text class="list-label">车型：</text><text class="list-view">{{detailDate.vehicleType}}</text>
			</view>
			<view class="list">
				<text class="list-label">申请时间：</text><text class="list-view">{{detailDate.applyTime}}</text>
			</view>
			<view class="list">
				<text class="list-label">预达：</text><text class="list-view">{{detailDate.applyOilchangeTime}}</text>
			</view>
			<view class="list" v-if='["矿机","主管","厂长"].includes(this.userInfo.roleName)'>
				<text class="list-label">小队副职：</text><text class="list-view">{{detailDate.fleetLeader}}</text>
			</view>
			<view class="list" v-if='["主管","厂长"].includes(this.userInfo.roleName)'>
				<text class="list-label">矿机动员：</text><text class="list-view">{{detailDate.machineLeader}}</text>
			</view>
			<view class="list" v-if='this.userInfo.roleName==="厂长"'>
				<text class="list-label">主管：</text><text class="list-view">{{detailDate.deptLeader}}</text>
			</view>
		</view>
		<view class="list-button" v-if='status===0'>
			<button @click="submit" type="primary">审核</button>
		</view>
	</view>
</template>

<script>
	import http from '../../plugins/network/index.js'
	export default {
		data() {
			return {
				userInfo: {},
				detailDate: {},
				status: 0
			}
		},
		onLoad(event) {
			const payload = event.payload;
			this.status = Number(event.index)
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.detailDate = JSON.parse(decodeURIComponent(payload));
			} catch (error) {
				this.detailDate = JSON.parse(payload);
			}
			uni.getStorage({
				key: 'storage_user',
				success: (res) => {
					this.userInfo = JSON.parse(res.data);
				}
			});
			uni.setNavigationBarTitle({
				title: this.detailDate.title
			});

		},
		methods: {
			submit() {
				uni.showModal({
					title: '提示',
					content: '是否开始审核',
					success: (res) => {
						if (res.confirm) {
							this.setAuditModal();
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				});
			},
			setAuditModal() {
				uni.showModal({
					title: '提示',
					content: '是否通过审核',
					cancelText: "驳回", // 取消按钮的文字  
					confirmText: "确定", // 确认按钮文字  
					success: (res) => {
						if (res.confirm) {
							this.setAudit("1");
						} else if (res.cancel) {
							this.setAudit("0");
						}
					}
				});
			},
			setAudit(type) {
				let par = {
					id: this.detailDate.id,
					userId: this.userInfo.userId,
					type: type
				}
				uni.getStorage({
				    key: 'storage_ip',
				    success: (res) => {
						let setInput = JSON.parse(res.data);
						http.server({
							url:`http://${setInput.ip}:${setInput.port}/api/auth/audit`,
							method: 'POST',
							data: par
						}).then(res => {
							if (res.code === 0) {
								uni.showToast({
									title: res.msg,
									icon: 'none', //不要图标
									duration: 1000, //1后消失
									success: () => {
										uni.switchTab({
											url:`/pages/auditing/index?status=${type==='0'?2:1}`
										});
									}
								});
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none', //不要图标
									duration: 1000 //1后消失
								});
							}
						});
				    }		
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.page-auditing-details {
		width: 100%;
		overflow-y: hidden;
		position: relative;

		.details-content {
			padding: 20rpx;

			.list {
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				font-size: 32rpx;
				position: relative;

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
			}
		}

		.list-button {
			padding: 0 20rpx;
			width: 100%;
			box-sizing: border-box;
			margin-top: 100rpx;
		}
	}
</style>
