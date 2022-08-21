import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//购物车
import cart from './modules/cart.js'
//我的地址
import path from './modules/path.js'

export default new Vuex.Store({
	
	modules:{
		cart,
		path
	}
	
})
