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
	- 注意事项：
		- 要设置高度
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
## 原生标题栏
- 通过pages.json文件中的中style中进行配置
- 通过uni-app的生命周期进行事件监听
```
onNavigationBarButtonTap(e){
	// 可以借e判断点击的哪个，用uni.navigateTo(OBJECT) 进行路由跳转
}
```
## @tag和@click的区别：
- @click是组件被点击时触发，会有约300ms的延迟（内置处理优化了）；
- @tap是手指触摸离开时触发，没有300ms的延迟，但是会有事件穿透;
- 编译到小程序端，@click会被转换成@tap；
## uni-app在App端动态修改原生导航栏
- 在App端可以通过得到webview对象，
- 通过当前 webview 对象的 
- setTitleNViewButtonBadge，setTitleNViewButtonStyle， setTitleNViewSearchInputFocus，setTitleNViewSearchInputText 分别对
 - TitleNView 上的按钮角标，按钮，输入框等组件的样式进行修改。
```
// #ifdef APP-PLUS  
var webView = this.$mp.page.$getAppWebview();  

// 修改buttons  
// index: 按钮索引, style {WebviewTitleNViewButtonStyles }  
webView.setTitleNViewButtonStyle(0, {  
    text: 'hello',  
});  

// 修改按钮上的角标  
// index: 按钮索引, text: 角标文本内容  
webView.setTitleNViewButtonBadge({  
    index: 0,  
    text: 10,  
});  

// 设置 searchInput的 focus  
// focus: true | false  
webView.setTitleNViewSearchInputFocus(true)  

// 设置 searchInput的 text  
webView.setTitleNViewSearchInputText(text)  

// searchInput 通过 webview 的 setStyle 方法进行更新  
var tn = currentWebview.getStyle().titleNView;  
if (tn.buttons) {    
uni.getSystemInfo({    
    success:function(res){    
        if (res.platform=="ios") { // 这里在HBuilderX 1.9.9版本有个bug，searchInput的I变小写了 ，临时绕过下。更高版本会修复此bug    
            tn.searchinput.placeholder = 'test';    
            currentWebview.setStyle({    
                titleNView: tn    
            });    
        } else{    
            tn.searchInput.placeholder = 'test'; //这里有个已知bug，HBuilderX 1.9.9上，当searchInput位于首页时，动态设置placehold会导致buttons的点击事件消失。更高版本会修复此bug    
            currentWebview.setStyle({    
                titleNView: tn    
            });    
        }    
    }    
})    
}    

// #endif
```
## onload(e)页面周期
```
// 页面加载完成，别的路由跳转过来带的？name=zxf&age=12,利用这个生命周期可以获取到
onLoad(e) {
	//e是一个对象
	// e中包含url中query参数值（？name=zxf&age=12）
	this.getData(e.id);
},
```
## uni-nav-bar 自定义导航栏
- 不想用原生的自定义导航栏，则用自定义的原生导航栏
```
<uni-nav-bar height="120rpx" title="自定义高度" />
```