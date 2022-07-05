<template>
	<view class='index'>
		
		<!-- <IndexSwiper></IndexSwiper>
		<Recommend></Recommend>
		<Card cardTitle='猜你喜欢'></Card>
		<CommodityList></CommodityList> -->
		
		<Banner></Banner>
		<Icons></Icons>
		<Card cardTitle='热销爆品'></Card>
		
		<Hot></Hot>
		
		<CommodityList></CommodityList>
		
	</view>
</template>

<script>
	import IndexSwiper from '@/components/index/IndexSwiper.vue'
	import Recommend from '@/components/index/Recommend.vue'
	import Card from '@/components/common/Card.vue'
	import CommodityList from '@/components/common/CommodityList.vue'
	import Banner from '@/components/index/Banner.vue'
	import Icons from '@/components/index/Icons.vue'
	import Hot from '@/components/index/Hot.vue'
	export default {
		data() {
			return {
			
			}
		},
		components:{
			IndexSwiper,
			Recommend,
			Card,
			CommodityList,
			Banner,
			Icons,
			Hot
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style scoped>

</style>
