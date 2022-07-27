## index
```
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