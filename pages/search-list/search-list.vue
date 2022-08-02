<template>
	<view>
		<ShopList :keyword="keyword"></ShopList>
	</view>
</template>

<script>
	import ShopList from '@/components/common/ShopList.vue'
	export default {
		data() {
			return {
				keyword: ''
			}
		},
		onLoad(e) {
			// #ifdef APP-PLUS  
			var webView = this.$mp.page.$getAppWebview(); 
			webView.setTitleNViewSearchInputText(e.keyword); 
			// #endif
			this.keyword = e.keyword
		},
		components:{
			ShopList
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
