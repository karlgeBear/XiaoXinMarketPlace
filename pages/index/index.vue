<template>
	<view class="index">
		<view class="wx-nav">
			<view class="iconfont icon-Magnifier"></view>
			<text>小新商城</text>
			<view class="iconfont icon-xiaoxi"></view>
		</view>

		
		<view class="f-active">123{{title}}</view>
		<view class="iconfont icon-shouye">
			test icon
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.wx-nav{
		height: 200rpx;
		line-height: 200rpx;
		display: flex;
		text-align: center;
		justify-content: space-between;
		align-items: center;
	}
</style>
