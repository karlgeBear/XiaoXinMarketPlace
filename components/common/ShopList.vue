<template>
	<view class='shop-list'>
		{{keyword}}
		<view class='shop-title f-color'>
			<view class='shop-item'
				v-for="(item,index) in shopList.data"
				:key='index'
				@tap='changTab(index)'
			>
				<view :class="  shopList.currentIndex==index?'f-active-color':'' ">{{item.name}}</view>
				<view class='shop-icon'>
					<view class='iconfont icon-shangjiantou up'
						:class=' item.status ===1 ? "f-active-color":"" '
					></view>
					<view class='iconfont icon-xiajiantou down'
						:class=' item.status ===2 ? "f-active-color":"" '
					></view>
				</view>
			</view>
		</view>
		<Lines />
		<CommodityList :dataList='dataList'></CommodityList>
	</view>
</template>

<script>
import Lines from '@/components/common/Lines.vue'
import CommodityList from './CommodityList.vue'
export default {
		data() {
			return {
				shopList:{
				    currentIndex:0,
					data:[
						{name:"价格",status:1},
						{name:"折扣",status:0},
						{name:"品牌",status:0}
					]
				},
				dataList:[
					{
						id:1,
						imgUrl:"../../static/imgs/commodity1.jpg",
						name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice:"299",
						oprice:"659",
						discount:"5.2"
					},
					{
						id:2,
						imgUrl:"../../static/imgs/commodity2.jpg",
						name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice:"299",
						oprice:"659",
						discount:"5.2"
					},
					{
						id:3,
						imgUrl:"../../static/imgs/commodity3.jpg",
						name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice:"299",
						oprice:"659",
						discount:"5.2"
					},
					{
						id:4,
						imgUrl:"../../static/imgs/commodity4.jpg",
						name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
						pprice:"299",
						oprice:"659",
						discount:"5.2"
					}
				]
			}
		},
		props:{
			keyword: String
		},
		components:{
			Lines,
			CommodityList
		},
		methods: {
			changTab(index){
				console.log(1)
				//索引值
				let idx = this.shopList.currentIndex;
				//具体哪一个对象
				let item = this.shopList.data[idx];
				if( idx == index ){
					return item.status = item.status === 1 ? 2:1;
				}
				//新的值
				let newItem = this.shopList.data[index];
				item.status = 0;
				this.shopList.currentIndex = index;
				newItem.status = 1;
				
			}
		}
	}
</script>

<style scoped>
.shop-title{
	display: flex;
}
.shop-item{
	flex:1;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80rpx;
}
.shop-icon{
	position: relative;
	margin-lef:10rpx;
}
.iconfont{
	width:16rpx;
	height: 8rpx;
	position: absolute;
	left:0;
}
.up{
	top:-30rpx;
}
.down{
	top:-18rpx;
}
</style>
