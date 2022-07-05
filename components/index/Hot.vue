<template>
	<view class='hot'>
		
		<Commodity :dataList='hotList' itemW='250rpx' bigH='220rpx'></Commodity>
		
	</view>
</template>

<script>
import Commodity from '../common/Commodity.vue'
export default{
	data () {
		return {
			hotList:[
				{
					id:1,
					imgUrl:"../../static/imgs/hot1.jpg",
					name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice:"299",
					oprice:"659",
					discount:"5.2"
				},
				{
					id:2,
					imgUrl:"../../static/imgs/hot2.jpg",
					name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice:"299",
					oprice:"659",
					discount:"5.2"
				},
				{
					id:3,
					imgUrl:"../../static/imgs/hot3.jpg",
					name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
					pprice:"299",
					oprice:"659",
					discount:"5.2"
				}
			]
		}
	},
	components:{
		Commodity
	}
}
</script>

<style>
</style>
