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

在pages-json中的当前页面路由的中配置
"style" : {
				"app-plus":{
					"titleNView":false,
					"scrollIndicator":"none"
				}
			}
```
## 页面通讯
#### 场景：在确认订单时，修改默认地址，
- 1.在确定订单页 点击地址 跳转到 我的地址，在我的地址中点击一个随机地址，直接回退，触发全局自定义事件
```
//返回确认订单页面
	goConfirmOrder(item){
		//如果是从确认订单过来的执行以下代码:
		if(this.isSelectedPath){
			//自定义事件：页面通讯
			uni.$emit('selectPathItem',item);
			//返回上一页
			uni.navigateBack({
				delta:1
			})
		}
	}
```
- 1. 回退到确定订单页，监听全局自定义事件，从自定义事件传过来的参数，直接改变地址
```
	onLoad() {
		//如果有默认地址的一个赋值
		if(this.defaultPath.length){
			this.path = this.defaultPath[0];
		}
		
		//如果出发自定义事件，on去接受值
		uni.$on("selectPathItem",(res)=>{
			this.path = res;
		})
	},
	onUnload() {
		uni.$off('selectPathItem',()=>{
			console.log('移除了selectPathItem');
		})
	},
```
## 针对vuex保存中的数据问题？
- 购物车？
```
1. 针对不同用户的操作，要保存到改用户的id账号中，
	那是不是意味着当用户对自己账号进行购物车的增删改查操作时，‘
	要对应数据库里的那份数据库表进行增删改查？
	那么数据表怎么设计？id为账户？其它字段为用户的数据信息？
```
## 登录
- 给input绑定v-model
- 设计正则验证规则
- 点击登陆，正则验证
- 发post请求，把前端的input作为参数传给后端，后端进行sql查询，返回相应的数据
- 点击登录成功，直接将数据库中的用户数据赋值给vuex(user)的state,作为全局状态管理，
- 根据user.state.loginStatus判断用户是否登录，直接将户用数据赋值到页面
## 持久化储存
- 需求：再次打开app,没有显示登入状态，未保存用户数据
- 可以利用uni.setStorageSync('key',JSON.stringify(value))和uni.getStorageSync('key')实现
- 过程：
	- 打开app点击登录，在vuex的user中读取用户信息，储存用户信息（由于每次刷新页面都会在执行App.js中的方法，在里边执行一下initUser.js就好了）；
	- 再次点开app,...mapGetter()直接在vuex中读取数据，赋值用户数据到页面
```user.js
mutations:{
		//一旦进入了app,就需要执行这个方法,把用户信息读出来
		initUser(state){
			let userInfo = uni.getStorageSync('userInfo');
			if( userInfo ){
				userInfo = JSON.parse( userInfo );
				state.userInfo = userInfo;
				state.loginStatus = true;
				state.token = userInfo.token;
			}
		},
		//登录后保存用户信息
		login(state,userInfo){
			state.userInfo = userInfo;
			state.loginStatus = true;
			state.token = userInfo.token;
			//持久化存储 ===>把对象转换成字符串
			uni.setStorageSync('userInfo',JSON.stringify(userInfo));
		}
		//退出登录
		loginOut(state){
			state.loginStatus = false;
			state.userInfo = {};
			state.token = null;
			//删除本地存储的信息
			uni.removeStorageSync('userInfo');
		}
	},
```
## 自定义tabbar（就是btmNav, 页面路由pages.json 中提供 tabBar 配置）
- 需求：点击tababr，跳到tababr页面，需要判断是否登录，需要做事件拦截
- 自己写一个底部导航栏公共组件，进行跳转拦截
- 用三方插件也可实现

## 权限跳转
- 需求：点击页面内容，需要是否确定是否登录。未登录就跳到登录界面
- main.js中设置Vue.prototype.navigateTo = (option) ={}
```main.js
//权限跳转
Vue.prototype.navigateTo = (options)=>{
	if( !store.state.user.loginStatus ){
		uni.showToast({
			title:"请先登录",
			icon:"none"
		})
		return	uni.navigateTo({
				url:"/pages/login/login"
			})
	}
	uni.navigateTo(options)
}
```
## 注册手机号&&接入短信SDK
- 正则验证，请求数据库接口，查询手机号是否在数据库存在，存在则发送验证码

## 前端使用token
- 登录成功，后端会返给前端一个token,存在state中，
- 如果没有登录，给所有需要判断是否登录且调用接口的操作，做一个鉴权，
- 在请求封装中做统一处理
```
	request( options={} ){
		options.url = this.common.baseUrl + options.url;
		options.data = 	options.data || this.common.data;
		options.header = options.header || this.common.header;
		options.method = options.method || this.common.method;
		options.dataType = 	options.dataType || this.common.dataType;
		
		//判断是否传入了header头的token进行用户是否登录的验证
		if(options.header.token){
			options.header.token = store.state.user.token;
			if(!options.header.token){
				uni.showToast({
					title:"请先登录",
					icon:"none"
				})
				return uni.navigateTo({
					url:"/pages/login/login"
				})
			}
		}
		
		return new Promise((res,rej)=>{
			uni.request({
				...options,
				success: (result) => {
					if(result.statusCode != 200){
						return rej();
					}
					// setTimeout(function () {
					//     uni.hideLoading();
					// }, 500);
					let data = result.data.data;
					res(data);
				}
			})
		})
	}
```