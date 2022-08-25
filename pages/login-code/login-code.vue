<template>
	<view>
		<Lines></Lines>
		<view class='login-tel'>
			<view class='tel-main'>
				<view class='login-from'>
					<view class='login-user'>
						<text class='user-text'>验证码</text>
						<input type="text" placeholder="请输入验证码" v-model="userCode"/>
						<button plain='true' size='mini' :disabled="disabled" @tap='sendCode'> {{codeMsg}} </button>
					</view>
				</view>
				<view class='tel' @tap='goNextIndex'>下一步</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Lines from '@/components/common/Lines.vue'
	export default {
		data() {
			return {
				//倒计时到时间
				codeNum:10,
				//显示到文本
				codeMsg:"",
				//按钮是否禁用
				disabled:false,
				//用户输入的内容
				userCode:''
			}
		},
		components:{
			Lines
		},
		onReady() {
			this.codeMsg = '重新发送（'+this.codeNum+'）';
			this.sendCode();
		},
		methods: {
			//点击验证码发送
			sendCode(){
				this.disabled = true;
				let timer = setInterval(()=>{
					--this.codeNum;
					this.codeMsg = '重新发送（'+this.codeNum+'）';
				},1000);
				setTimeout(()=>{
					clearInterval(timer);
					this.codeNum=10;
					this.disabled = false;
					this.codeMsg = '重新发送';
				},10000)
			},
			//点击下一步
			goNextIndex(){
				uni.switchTab({
					url:"../index/index"
				})
			}
		}
	}
</script>

<style scoped>
.login-tel{
	width: 100vw;
	height: 100vh;
}
.tel-main{
	padding:0 20rpx;
}
.login-from{
	padding:30rpx 0;
}
.login-user{
	font-size:32rpx;
	padding:10rpx 0;
	display: flex;
	align-items: center;
	border-bottom:2rpx solid #f7f7f7;
}
.user-text{
	padding-right:10rpx;
}
.tel{
	width:100%;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	color:#FFFFFF;
	background-color: #49BDFB;
	border-radius: 40rpx;
}
</style>
