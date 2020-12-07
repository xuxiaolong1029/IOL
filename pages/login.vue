<template>
	<view class="page">
		<view class="login-logo">
			<view class="logo">
				<image src="../static/logo.png" mode=""></image>
			</view>
		</view>
		<view class="login-form">
			<view class="accout uni-input-wrapper">
				<input type="text" placeholder-style="color:#ccc" v-model="inputForm.username" placeholder="请输入账号">
			</view>
			<view class="password uni-input-wrapper">
				<input type="password" placeholder-style="color:#ccc" v-model="inputForm.password" placeholder="请入密码">
			</view>
			<view>
				<button @click="loginButton">登录</button>
				<view class="set-password">
					<view @click="confirmDialog"><text>设置IP</text></view>
					<view><checkbox value="cb" @click="changeChecked" :checked="checked" />记住密码</view>
				</view>
			</view>
		</view>
		<uni-popup id="dialogInput" ref="dialogInput" type="dialog">
			<view class="dialog-input">
				<view class="dialog-input-title"><text>设置IP和端口</text></view>
				<view class="dialog-input-input">
					<input type="text" :class="focusIndex===1?'input focus':'input'" @focus="focusIndex=1" 
					placeholder-style="color:#ccc" v-model="setInput.ip" placeholder="请输入IP">
					<input type="password" style="margin-top: 10rpx;" :class="focusIndex===2?'input focus':'input'"  @focus="focusIndex=2"
					placeholder-style="color:#ccc" v-model="setInput.port" placeholder="请入端口">
				</view>
				<view class="dialog-input-button">
					<text class="text" @click="closeDialog">取消</text>
					<text class="text" @click="setIP">确定</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import http from '../plugins/network/index.js'
	import UniPopup from '../components/uni-popup/uni-popup.vue'
	export default {
		components:{
			UniPopup
		},
		data() {
			return {
				inputForm:{
					username:'admin',
					password:'admin'
				},
				setInput:{
					ip:'',
					port:''
				},
				focusIndex:0,
				checked:true
			};
		},
		methods:{
			changeChecked(v){
				this.checked!=this.checked;
			},
			setIP(){
				this.closeDialog()
			},
			confirmDialog(){
				this.$refs.dialogInput.open()
			},
			closeDialog(){
				this.$refs.dialogInput.close()
			},
			loginButton(){
				if(!this.inputForm.username){
					uni.showToast({
						title: "请输入账号",
						icon:'none',//不要图标
						duration: 1000//1后消失
					});
					return
				}
				if(!this.inputForm.password){
					uni.showToast({
						title: "请输入密码",
						icon:'none',//不要图标
						duration: 1000//1后消失
					});
					return
				}
				uni.switchTab({
				  url: '/pages/home/index'
				});
				http.server({
					url: '/sys-auth/user/login',
					method: 'POST',
					data: this.inputForm
				}).then(res => {
					if(res.code === 200){
						uni.switchTab({
						  url: '/pages/home/index'
						});
					}else{
						uni.showToast({
							title: res.message,
							icon:'none',//不要图标
							duration: 1000//1后消失
						});
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.page{
		width: 100vw;
		.login-logo{
			width: 100%;position: relative;height:400rpx;
			background-color:#5777FE;text-align: center;
			border-bottom-right-radius:100rpx;
			border-bottom-left-radius:100rpx;
			.logo{
				background: #fff;width: 160rpx;height: 160rpx;margin-top: 100rpx;
				display:inline-block;padding:10rpx;border-radius: 50%;box-sizing: content-box;
				image{
					width: 140rpx;height: 140rpx;margin-top:10rpx;border-radius: 50%;
				}
			}
		}
		.login-form{
			padding: 40rpx 50rpx;
			input{
				height: 70rpx;border-bottom: 1rpx solid #eee;margin-top: 25rpx;caret-color:#5777FE;
				padding-left: 20rpx;
			}
			button{
				background-color:#5777FE;color: #fff;margin-top:180rpx;
			}
			.set-password{
				display: flex;justify-content: space-between;margin-top: 20rpx;
			}
		}
		.dialog-input{
			background-color: #fff;width:550rpx;border-radius:10rpx;box-sizing: border-box;
			padding:40rpx;
			.dialog-input-title{
				font-size: 36rpx;margin-bottom: 20rpx;
			}
			.dialog-input-input{
				.input{
					border-bottom: 1px solid #ddd;height:70rpx;caret-color:#5777FE;
				}
				.focus{
					border-bottom: 1px solid #5777FE;
				}
			}
			.dialog-input-button{
				margin-top: 50rpx;text-align: right;color: #5777FE;
				.text{
					width: 100rpx;display: inline-block;text-align: center;
				}
			}
		}
	}
</style>
