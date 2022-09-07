import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import store from 'store'
Vue.prototype.$store = store;

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

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
