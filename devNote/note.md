## page.json配置
- page:构建页面的结构(新建页面，在此自动生成页面结构)
	- app-plus : 配置编译到H5 + App 平台时的特定样式
	- navigationStyle: 当值为custom时，默认的导航失效（如在H5app中设置了导航栏，那么微信小程序就会出现两个导航栏，这时微信小程序只需要一个导航栏）
- tabbar:通过 tabBar 配置项指定一级导航栏，以及 tab 切换时显示的对应页(设置selected的icon和字体以及字体颜色等)
## 判断在wx还是appH5
```
		<!-- #ifdef MP-WEIXIN -->  //在wx中生效
			<view class="wx-nav">
				....
			</view>
		<!-- #endif -->
		<!-- #ifdef H5 --> // 除了 H5 平台，其它平台均存在的代码
			<view class="H5-nav">
				.....
			</view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS --> // 仅出现在 App 平台下的代码
			<view class="H5-nav">
				.....
			</view>
		<!-- #endif -->
```
## 内置组件
- swiper:
	- 不可把swiper组件的组件名设置为swiper
- scroll-view:
	- scroll-into-view： 滚动到固定位置，舍去多余的位置
		- 在scroll-view设置:scroll-into-view='string+dynamicNum'
		- 子盒子设置:id='string+dynamicNum'
## 隐藏滚动条
- 在scroll-view隐藏滚动条：
	- 设置属性show-scrollbar为false,在ios下失效
- 应用中隐藏竖向滚动条
	- 在pages.json中配置: (在ios失效)
```
	"app-plus": {  // 配置编译到H5 + App 平台时的特定样式
				"scrollIndicator": "none",
			}
```
	- 设置全局样式：
```

::-webkit-scrollbar{
	display: none;
	width: 0 !important;
	height: 0 !important;
	-webkit-appearance: none;
	background: transparent;
}
```
## 获取节点的高度
- uni.createSelectorQuery()  
```
		// 监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
		onReady() {
			
			let view = uni.createSelectorQuery().select(".home-data");
			view.boundingClientRect(data => {
			    this.clentHeight = data.height;
			}).exec();
			
		},
```
- uni.getSystemInfo(OBJECT)
```
	//使用 uni.createSelectorQuery()获取节点高/***报错***/ 
	// 问题可能出现在：需要在生命周期 mounted 后进行调用
	uni.getSystemInfo({
		success(res =>{
			// 需要展示的高度=windowHeight - 顶部tab栏 -手机刘海-手机状态栏的高度
			this.clentHeight = res.windowHeight - uni.upx2px(80) -this.getClientHeight();
		})
	})
``` 
- uni.getSystemInfoSync();
```
//获取可视区域高度【兼容】
// 返回值：手机刘海+手机状态栏的高度
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
}
```
## 封装request
- 在common中新建api文件夹下的request.js，export default{}导出,返回值为一个promise
- 在页面组件导入
- 可以利用uni.showLoading()方法，在请求前显示加载数据，在请求成功后隐藏加载数据
```
export default{
	common:{
		baseUrl:"http://192.168.1.7:3000/api",
		data:{},
		header:{
			"Content-Type":"application/json",
			"Content-Type":"application/x-www-form-urlencoded"
		},
		method:"GET",
		dataType:"json"
	},
	request( options={} ){
		uni.showLoading({
		    title: '加载中'
		});
		options.url = this.common.baseUrl + options.url;
		options.data = 	options.data || this.common.data;
		options.header = options.header || this.common.header;
		options.method = options.method || this.common.method;
		options.dataType = 	options.dataType || this.common.dataType;
		return new Promise((res,rej)=>{
			uni.request({
				...options,
				success: (result) => {
					if(result.statusCode != 200){
						return rej();
					}
					setTimeout(function () {
					    uni.hideLoading();
					}, 2000);
					let data = result.data.data;
					res(data);
				}
			})
		})
	}
}
```