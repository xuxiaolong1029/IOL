<template>
	<view class="page-oil">
		<view class="page-oil-content">
			<form @submit="formSubmit">
				<view class="form-column">
					<view class="form-column-list">
						<text>车型</text>
						<input class="form-column-input" v-model="oilForm.vehicleType" name="vehicleType" placeholder="请输入车型" />
					</view>
					<view class="form-column-list">
						<text>车牌</text>
						<input class="form-column-input" v-model="oilForm.plate" name="plate" placeholder="请输入车牌" />
					</view>
					<view class="form-column-list">
						<text>到达时间</text>
						<picker class="form-column-input" mode="date" :value="oilForm.applyTime" :start="startDate" :end="endDate"
						 @change="bindDateChange">
							<view class="uni-input">{{oilForm.applyTime}}</view>
						</picker>
					</view>
					<view class="form-column-list">
						<text>司机姓名</text>
						<input class="form-column-input" v-model="oilForm.applicant" name="applicant" placeholder="请输入司机姓名" />
					</view>
					<view class="form-column-list">
						<text>联系电话</text>
						<input class="form-column-input" v-model="oilForm.phone" name="phone" placeholder="请输入联系电话" />
					</view>
				</view>
				<view class="form-auditing-steps">
					<view class="form-auditing-steps-title"><text>审批流程</text></view>
					<uni-steps :options="auditList" active-color="#5777FE" :active="active" direction="column" />
				</view>
				<view class="form-btn">
					<button type="primary" form-type="submit">提交申请</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import UniSteps from "../../components/uni-steps.vue"
	import http from '../../plugins/network/index.js'
	import {mapState} from 'vuex'
	function getDate(type) {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (type === 'start') {
			year = year;
		} else if (type === 'end') {
			year = year + 5;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;

		return `${year}-${month}-${day}`;
	}
	export default {
		computed: {
			...mapState(['userInfo'])
		},
		components: {
			'uni-steps': UniSteps
		},
		data() {
			return {
				active: -1,
				oilForm: {
					vehicleType: '',
					plate: '',
					applyTime: '',
					applicant: '',
					phone: ''
				},
				auditList: [],
				startDate: getDate('start'),
				endDate: getDate('end')
			}
		},
		onShow() {
			if (this.userInfo.roleName === '司机') {
				this.auditList = [{
					title: '审批人-小队副职'
				}, {
					title: '审批人-矿机动员'
				}, {
					title: '审批人-主管部门'
				}, {
					title: '审批人-厂级主管'
				}]
			} else {
				this.auditList = [{
					title: '审批人-矿机动员'
				}, {
					title: '审批人-主管部门'
				}, {
					title: '审批人-厂级主管'
				}]
			}
		},
		methods: {
			formSubmit: function(e) {
				//定义表单规则
				var rules = [{
						name: "vehicleType",
						checkType: "string",
						errorMsg: "请输入车型"
					},
					{
						name: "plate",
						checkType: "string",
						errorMsg: "请输入车牌"
					},
					{
						name: "applyTime",
						checkType: "string",
						errorMsg: "请输入到达时间"
					}, {
						name: "applicant",
						checkType: "string",
						errorMsg: "请输入司机姓名"
					}, {
						name: "phone",
						checkType: "string",
						errorMsg: "请输入联系电话"
					},
				];
				for (let item of rules) {
					if (!this.oilForm[item.name]) {
						uni.showToast({
							title: item.errorMsg,
							icon: "none"
						});
						return
					}
				}
				this.setAudit()
			},
			setAudit() {
				let par = {
					userId: this.userInfo.userId,
					...this.oilForm
				}
				http.server({
					url: '/api/auth/appointment',
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
									url: '/pages/home/index'
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
			},
			bindDateChange(v) {
				this.oilForm.applyTime = v.detail.value;
			}
		}
	}
</script>

<style lang="less" scoped>
	.page-oil {
		width: 100%;

		.page-oil-content {
			.form-column {
				padding: 20rpx;

				.form-column-list {
					width: 100%;
					height: 80rpx;
					line-height: 80rpx;
					display: flex;
					border-bottom: 1rpx solid #c8c7cc;

					>text {
						display: inline-block;
						width: 180rpx;
						color: #666;
						font-size: 28rpx;
					}

					.form-column-input {
						height: 80rpx;
						line-height: 80rpx;
						flex: 1;
					}
				}
			}

			.form-auditing-steps {
				padding-left: 20rpx;

				.form-auditing-steps-title {
					font-size: 36rpx;
					color: #000;
					font-weight: bold;
					height: 80rpx;
					line-height: 80rpx;
					margin-bottom: 20rpx;
				}
			}

			.form-btn {
				padding: 20rpx;
				margin-top: 40rpx;
			}
		}
	}
</style>
