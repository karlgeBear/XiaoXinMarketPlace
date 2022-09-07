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
	import $http from '@/common/api/request.js'
	export default {
		data() {
			return {
				//倒计时到时间
				codeNum:30,
				//显示到文本
				codeMsg:"",
				//按钮是否禁用
				disabled:false,
				//用户输入的内容
				userCode:'',
				// 获取的验证码
				code:'',
				// 用户的手机号
				phone:''
			}
		},
		components:{
			Lines
		},
		onReady() {
			this.codeMsg = '重新发送（'+this.codeNum+'）';
			this.sendCode();
		},
		onLoad(e) {
			this.phone = e.phone; 
		},
		methods: {
			//点击验证码发送
			sendCode(){
				$http.request({
					url:"/code",
					method:"GET"
				}).then((res)=>{
					
					this.code = res.code
					console.log('请求验证码：',res.code,this.code)
				}).catch(()=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
				})
				// 随机6位验证码
				let randomNum = Math.floor(Math.random()*(1000000-0+1)+0)
				console.log()
				this.disabled = true;
				let timer = setInterval(()=>{
					--this.codeNum;
					this.codeMsg = '重新发送（'+this.codeNum+'）';
				},1000);
				setTimeout(()=>{
					clearInterval(timer);
					this.codeNum=30;
					this.disabled = false;
					this.codeMsg = '重新发送';
					// this.code = ''
				},30000)
			},
			//点击下一步
			goNextIndex(){
				console.log('验证码对比：',parseInt(this.userCode),this.code,parseInt(this.userCode)==this.code)
				if(parseInt(this.userCode) !== this.code) {
					uni.showToast({
						title:'验证码输入错误',
						icon:'none'
					})
					return;
				}
				console.log('验证通过',this.phone,this.userCode,this.code)
				$http.request({
					url:"/addUser",
					method:"POST",
					data:{
						userName:this.phone,
						code:this.userCode
					}
				}).then((res)=>{
					//注册成功
					console.log('yanzheng:',res)
					if( res.success ){
						
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
						uni.redirectTo({
							url:"../index/index"
						})
						
					}
				}).catch(()=>{
					uni.showToast({
						title:'请求失败',
						icon:'none'
					})
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
