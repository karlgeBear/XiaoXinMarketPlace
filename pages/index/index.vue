<template>
	<view class="index">
		<IndexSwiper></IndexSwiper>
	</view>
</template>

<script>
	import IndexSwiper from '../../components/index/IndexSwiper.vue'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		components:{
			IndexSwiper
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
</style>
