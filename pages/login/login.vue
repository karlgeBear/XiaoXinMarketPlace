<template>
	<view class='login'>
		
		<swiper vertical='true' style="height: 100vh;">
			<swiper-item>
				<scroll-view>
					<view class='login-tel'>
						<view class='tel-main'>
							<view class='close'>
								<image class='close-img' src="../../static/imgs/close.png" mode=""></image>
							</view>
							<view class='logo'>
								<image class='logo-img' src="../../static/imgs/logo.jpg" mode=""></image>
							</view>
							<view class='tel'>手机号注册</view>
							<LoginOther></LoginOther>
							<view class='login-go'>
								<view>已有账号，去登录</view>
								<image src="../../static/imgs/down.png" mode=""></image>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" >
					<view class='login-tel'>
						<view class='tel-main'>
							<view class='close close-center'>
								<view>
									<image class='close-img' src="../../static/imgs/close.png" mode=""></image>
								</view>
								<view class='login-go'>
									<image class='close-img' src="../../static/imgs/up.png" mode=""></image>
									<view>没有账号，去注册</view>
								</view>
								<view></view>
							</view>
							<view class='login-from'>
								<view class='login-user'>
									<text class='user-text'>账号</text>
									<input type="text" value="" placeholder="请输入手机号/昵称"/>
								</view>
								<view class='login-user'>
									<text class='user-text'>密码</text>
									<input type="text" value="" placeholder="6-16位字符"/>
								</view>
							</view>
							<view class='login-quick'>
								<view>忘记密码?</view>
								<view>免密登录</view>
							</view>
							<view class='tel'>登录</view>
							<view class='reminder'>温馨提示：您可以选择免密登录，更加方便</view>
							<LoginOther></LoginOther>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	import LoginOther from '@/components/login/login-other.vue'
	export default {
		data() {
			return {
				
			}
		},
		components:{
			LoginOther
		},
		methods: {
			
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
.close{
	padding:120rpx 0;
}
.close-img{
	width:60rpx;
	height: 60rpx;
}
.logo{
	padding-bottom: 100rpx;
	display: flex;
	justify-content: center;
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
.login-go{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.login-go image{
	width:60rpx;
	height: 60rpx;
}
/*第二*/
.close-center{
	display: flex;
}
.close-center >view{
	flex:1;
}
.login-from{
	padding-top:100rpx;
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
.login-quick{
	display: flex;
	justify-content: space-between;
	padding: 20rpx 0;
}
.reminder{
	color:#CCCCCC;
	padding:20rpx 0;
	text-align: center;
}
</style>
