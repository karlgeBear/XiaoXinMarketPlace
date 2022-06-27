<template>
	<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" style="height: 300rpx;">
		<swiper-item>
			<view class="swiper-item">
				<image class="image-swiper" src="../../static/imgs/swiper1.jpg" mode=""></image>
			</view>
		</swiper-item>
		<swiper-item>
			<view class="swiper-item">
				<image class="image-swiper" src="../../static/imgs/swiper2.jpg" mode=""></image>
			</view>
		</swiper-item>
		<swiper-item>
			<view class="swiper-item">
				<image class="image-swiper" src="../../static/imgs/swiper3.jpg" mode=""></image>
			</view>
		</swiper-item>
	</swiper>
</template>

<script>
</script>

<style scoped>
	.image-swiper{
		width: 100%;
		height: 300rpx;
	}
</style>