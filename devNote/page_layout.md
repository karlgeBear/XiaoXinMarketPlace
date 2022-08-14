## index
```
// 顶部和底部在pages.json中有个配置项列表中的属性:
	// pages中可以设置设置页面路径及窗口表现
	// tabBar中可以设置底部 tab 的表现
<view class='index'>

	<scroll-view></scroll-view>
	<swiper>
		<swiper-item>
			<scroll-view>
				<block v-if="">
					<block v-for="">
						<conponent-one />
						
						<template v-if="">
							<conponent-two />
						<template>
						
						<conponent-three />
						<conponent-four />
					</block>
					<view v-else></view>
				</block>
			</scroll-view>
		</swiper>
	</swiper>
	
</view>
```
- 利用两个这个滑动组件(scroll-view和swiper)
	- 滑动scroll-view中的tabbar的item,swiper中的内容跟着滑动，反之同理
- 组件化，抽离相同模块，在固定位置展示
- 请求数据，点击scroll-view中的tabbar的item，随之发送请求拉取数据
- 下拉加载数据，利用了scroll-view的@scrolltolower属性(滚动到底部/右边，会触发 scrolltolower 事件)

## list
```
<view>
		<Lines />
		<view class='list'>
			
			<!--左侧滑动-->
			<scroll-view scroll-y="true" class='list-left' :style="'height:'+clentHeight+'px;'">
				<view v-for='(item,index) in leftData':key='index'@tap="changeLeftTab(index,item.id)">
					<view class='left-name' :class=' activeIndex ===index ?"left-name-active":"left-item" '>{{item.name}}</view>
				</view>
			</scroll-view>
			
			<!--右侧滑动-->
			<scroll-view scroll-y="true" class='list-right' :style="'height:'+clentHeight+'px;'">
				
				<view class='righ-list'v-for='(item,index) in rightData':key='index'>
					<block v-for='(k,i) in item'>
						<view class='list-title'>{{k.name}}</view>
						<view class='right-content'>
							<view class='right-item' v-for='(j,idx) in k.list' :key='idx'>
								<image class='right-img' :src="j.imgUrl" mode=""></image>
								<view class='right-name'>{{j.name}}</view>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
	</view>
```
- 主要是左右布局
- 利用scroll-view(一定要设置高度)
- 点击左侧item，请求api，对应item加载右侧数据