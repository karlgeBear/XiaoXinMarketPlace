<template>
	<view>
		<Lines />
		
		<view class='list'>
			
			<!--左侧滑动-->
			<scroll-view scroll-y="true" class='list-left' :style="'height:'+clentHeight+'px;'">
				<view v-for='i in 50' class='left-item' @tap="changeLeftTab(i)">
					<view class='left-name' 
						:class=' activeIndex ===i ?"left-name-active":"" '
					>{{i}}</view>
				</view>
			</scroll-view>
			
			<!--右侧滑动-->
			<scroll-view scroll-y="true" class='list-right' :style="'height:'+clentHeight+'px;'">
				<view class='righ-list'>
					<view class='list-title'>家纺</view>
					<view class='right-content'>
						<view class='right-item'>
							<image class='right-img' src="../../static/imgs/list1.jpg" mode=""></image>
							<view class='right-name'>毛巾</view>
						</view>
						<view class='right-item'>
							<image class='right-img' src="../../static/imgs/list1.jpg" mode=""></image>
							<view class='right-name'>毛巾</view>
						</view>
						<view class='right-item'>
							<image class='right-img' src="../../static/imgs/list1.jpg" mode=""></image>
							<view class='right-name'>毛巾</view>
						</view>
						<view class='right-item'>
							<image class='right-img' src="../../static/imgs/list1.jpg" mode=""></image>
							<view class='right-name'>毛巾</view>
						</view>
					</view>
				</view>
				<view class='righ-list'>
					<view class='list-title'>家纺</view>
					<view class='right-content'>
						<view class='right-item'>
							<image class='right-img' src="../../static/imgs/list1.jpg" mode=""></image>
							<view class='right-name'>毛巾</view>
						</view>
						<view class='right-item'>
							<image class='right-img' src="../../static/imgs/list1.jpg" mode=""></image>
							<view class='right-name'>毛巾</view>
						</view>
						<view class='right-item'>
							<image class='right-img' src="../../static/imgs/list1.jpg" mode=""></image>
							<view class='right-name'>毛巾</view>
						</view>
					</view>
				</view>
				<view class='righ-list'>
					<view class='list-title'>家纺</view>
					<view class='right-content'>
						<view class='right-item'>
							<image class='right-img' src="../../static/imgs/list1.jpg" mode=""></image>
							<view class='right-name'>毛巾</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Lines from '@/components/common/Lines.vue'
	export default {
		data() {
			return {
				clentHeight:0,
				activeIndex:1
			}
		},
		//获取可视高度
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					this.clentHeight = res.windowHeight - this.getClientHeight();
				}
			})
		},
		components:{
			Lines
		},
		methods: {
			//获取可视区域高度【兼容】
			getClientHeight(){
				const res = uni.getSystemInfoSync();
				const system = res.platform;
				if( system ==='ios' ){
					return 44+res.statusBarHeight;
				}else if( system==='android' ){
					return res.statusBarHeight - 44;
				}else{
					return 0;
				}
			},
			//左侧点击事件
			changeLeftTab(index){
				this.activeIndex = index;
			}
		},
		//input输入框点击事件
		onNavigationBarSearchInputClicked(){
			uni.navigateTo({
				url:'../search/search'
			})
		}
	}
</script>

<style scoped>
.list{
	display: flex;
}
.list-left{
	width: 200rpx;
}
.left-item{
	border-bottom:2rpx solid #FFFFFF;
	font-size:28rpx;
	font-weight: bold;
	background-color: #F7F7F7;
}
.left-name{
	padding:30rpx 6rpx;
	text-align: center;
}
.left-name-active{
	border-left:8rpx solid #49BDFB;
	background-color: #FFFFFF;
}
.list-right{
	flex:1;
	padding-left:30rpx;
}
.list-title{
	font-weight: bold;
	padding:30rpx 0;
}
.right-content{
	display: flex;
	flex-wrap: wrap;
}
.right-item{
	width: 150rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding:10rpx;
}
.right-name{
	padding:16rpx 0;
}
.right-img{
	width: 150rpx;
	height: 150rpx;
}


</style>
