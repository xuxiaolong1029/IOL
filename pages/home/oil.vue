<template>
	<view class="page-oil">
		<view class="page-oil-content">
			<form @submit="formSubmit">
				<view class="form-column">
					<view class="form-column-list">
						<text>车型</text>
						<input class="form-column-input" v-model="oilForm.cart_type" name="cart_type" placeholder="请输入车型" />
					</view>
					<view class="form-column-list">
						<text>车牌</text>
						<input class="form-column-input" v-model="oilForm.cart_type" name="cart_num" placeholder="请输入车牌" />
					</view>
					<view class="form-column-list">
						<text>到达时间</text>
						<picker class="form-column-input" mode="date" :value="oilForm.date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{oilForm.date}}</view>
						</picker>
					</view>
					<view class="form-column-list">
						<text>司机姓名</text>
						<input class="form-column-input" v-model="oilForm.cart_name" name="cart_name" placeholder="请输入司机姓名" />
					</view>
					<view class="form-column-list">
						<text>联系电话</text>
						<input class="form-column-input" v-model="oilForm.cart_mobile" name="cart_mobile" placeholder="请输入联系电话" />
					</view>
				</view>	
				<view class="form-auditing-steps">
					<view class="form-auditing-steps-title"><text>审批流程</text></view>
					<uni-steps :options="list2" active-color="#5777FE" :active="active" direction="column" />
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
	var  graceChecker = require("../../common/graceChecker.js");
	function getDate(type) {
		const date = new Date();
	
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
	export default {
		components: {
			'uni-steps':UniSteps
		},
		data() {
			return {
				active:0,
				oilForm:{
					date: getDate({
						format: true
					}),
				},
				list2: [{
					title: '审批人-小队副职',
					desc: '2018-11-11'
				}, {
					title: '审批人-矿机动员',
					desc: '2018-11-12'
				}, {
					title: '审批人-主管部门',
					desc: '2018-11-13'
				}, {
					title: '审批人-厂级主管',
					desc: '2018-11-14'
				}],
				startDate:getDate('start'),
				endDate:getDate('end'),
			}
		},
		methods: {
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				//定义表单规则
				var rule = [{
						name: "cart_type",
						checkType: "string",
						errorMsg: "请输入车型"
					},
					{
						name: "cart_num",
						checkType: "string",
						errorMsg: "请输入车牌"
					},
					{
						name: "date",
						checkType: "string",
						errorMsg: "请输入到达时间"
					},{
						name: "cart_name",
						checkType: "string",
						errorMsg: "请输入司机姓名"
					},{
						name: "cart_mobile",
						checkType: "string",
						errorMsg: "请输入联系电话"
					},
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "验证通过!",
						icon: "none"
					});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			formReset: function(e) {
				console.log('清空数据')
			}
		}
	}
</script>

<style lang="less" scoped>
	.page-oil{
		width: 100%;height: calc(100vh - 110rpx);
		.page-oil-content{
			.form-column{
				padding: 20rpx;
				.form-column-list{
					width: 100%;height:80rpx;line-height:80rpx;display: flex;border-bottom: 1rpx solid #c8c7cc;
					text{
						display: inline-block;width: 150rpx;
					}
					.form-column-input{
						height:80rpx;line-height:80rpx;flex: 1;
					}
				}
			}
			.form-auditing-steps{
				padding-left: 20rpx;
				.form-auditing-steps-title{
					font-size: 36rpx;color: #000;font-weight: bold;height: 80rpx;line-height: 80rpx;margin-bottom: 20rpx;
				}
			}
			.form-btn{
				padding: 20rpx;margin-top: 40rpx;
			}
		}
	}
</style>
