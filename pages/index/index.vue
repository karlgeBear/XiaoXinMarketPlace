<template>
	<view class='index'>
		
		<scroll-view scroll-x="true" class='scroll-content' :scroll-into-view='scrollIntoIndex'>
			<view
				:id="'top'+index"
				class='scroll-item'
				v-for='(item,index) in topBar'
				:key='index'
				@tap='changeTab(index)'
			>
				<text :class='topBarIndex===index? "f-active-color":"f-color"'>{{item.name}}</text>
			</view>
		</scroll-view>
		
		 
		<swiper @change='onChangeTab' :current="topBarIndex" :style="'height:'+clentHeight+'px;'">
			<swiper-item 
				v-for='(item,index) in newTopBar'
				:key='index'
			>
				<scroll-view scroll-y="true"  :style="'height:'+clentHeight+'px;'">
					<block v-if='item.data.length > 0 '>
						<block v-for='(k,i) in item.data' :key='i'>
							
							<!--推荐-->
							<IndexSwiper v-if='k.type==="swiperList"' :dataList='k.data'></IndexSwiper>
							<template v-if='k.type==="recommendList"' >
								<Recommend :dataList='k.data'></Recommend>
								<Card cardTitle='猜你喜欢'></Card>
							</template>
							
							<!--运动户外....-->
							<Banner v-if='k.type==="bannerList"' :dataList='k.imgUrl'></Banner>
							
							<template v-if='k.type==="iconsList"'>
								<Icons :dataList='k.data'></Icons>
								<Card cardTitle='热销爆品'></Card>
							</template>
							
							<template v-if='k.type==="hotList"'>
								<Hot :dataList='k.data'></Hot>
								<Card cardTitle='推荐店铺'></Card>
							</template>
							
							<template v-if='k.type==="shopList"'>
								<Shop :dataList='k.data'></Shop>
								<Card cardTitle='为您推荐'></Card>
							</template>
							
							<CommodityList v-if='k.type==="commodityList"' :dataList='k.data'></CommodityList>
							
						</block>
					</block>
					<view v-else>
						暂无数据...
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
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
	import Shop from '@/components/index/Shop.vue'
	export default {
		data() {
			return {
				//选中的索引
				topBarIndex:0,
				//顶栏跟随的索引id值
				scrollIntoIndex:'top0',
				//内容块的高度值
				clentHeight:0,
				//顶栏数据
				topBar:[],
				//承载数据
				newTopBar:[]
			}
		},
		components:{
			IndexSwiper,
			Recommend,
			Card,
			CommodityList,
			Banner,
			Icons,
			Hot,
			Shop
		},
		onLoad() {
			this.__init();
		},
		onReady() {
			
			uni.getSystemInfo({
				success: (res) => {
					this.clentHeight = res.windowHeight - uni.upx2px(80)-this.getClientHeight();
				}
			})
			
		},
		methods:{
			//请求首页数据
			__init(){
				uni.request({
					url:"http://192.168.100.70:3000/api/index_list/data",
					success: (res) => {
						let data = res.data.data;
						this.topBar = data.topBar;
						this.newTopBar = this.initData(data);
					}
				})
			},
			//添加数据
			initData(res){
				let arr = [];
				for(let i =0;i<this.topBar.length;i++){
					let obj = {
						data:[]
					}
					//获取首次数据
					if(i==0){
						obj.data = res.data;
					}
					arr.push(obj)
				}
				return arr;
			},
			//点击顶栏
			changeTab(index){
				if(this.topBarIndex === index){
					return ;
				}
				this.topBarIndex = index;
				this.scrollIntoIndex = 'top'+index;
				this.addData();
			},
			//对应滑动
			onChangeTab(e){
				this.changeTab(e.detail.current);
			},
			//获取可视区域高度【兼容】
			getClientHeight(){
				const res = uni.getSystemInfoSync();
				const system = res.platform;
				if( system ==='ios' ){
					return 44+res.statusBarHeight;
				}else if( system==='android' ){
					return 48+res.statusBarHeight;
				}else{
					return 0;
				}
			},
			//对应显示不同数据
			addData(){
				//拿到索引
				let index = this.topBarIndex;
				//拿到id
				let id = this.topBar[index].id;
				//请求不同的数据
				uni.request({
					url:'http://192.168.100.70:3000/api/index_list/'+id+'/data/1',
					success: (res) => {
						let data = res.data.data;
						this.newTopBar[index].data = [...this.newTopBar[index].data,...data];
					}
				})
			}
		}
	}
</script>

<style scoped>
.scroll-content{
	width: 100%;
	height: 80rpx;
	white-space: nowrap;
}
.scroll-item{
	display: inline-block;
	padding:10rpx 30rpx;
	font-size:32rpx;
}
.f-active-color{
	padding:10rpx 0;
	border-bottom:6rpx solid #49BDFB;
}
</style>
