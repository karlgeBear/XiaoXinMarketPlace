export default{
	state:{
		list:[
			{
				checked:false,
				id:1,
				name:"11的和非恶搞认为微软业务打客服的和非恶搞认为微软业务",
				color:"颜色：返回对方的过分的",
				imgUrl:"../../static/imgs/Children2.jpg",
				pprice:"27",
				num:1
			},
			{
				checked:false,
				id:2,
				name:"22打客服的和非恶搞认为微软业务打客服的和非恶搞认为微软业务",
				color:"颜色：返回对方的过分的",
				imgUrl:"../../static/imgs/Children2.jpg",
				pprice:"27",
				num:1
			}
		],
		selectedList:[]
	},
	getters:{
		//判断是否  全选
		checkedAll(state){
			return state.list.length  ===  state.selectedList.length;
		},
		//合计+结算数量
		totalCount(state){
			let total = {
				pprice:0,
				num:0
			}
			state.list.forEach(v=>{
				//是否选中
				if(state.selectedList.indexOf(v.id) > -1){
					//合计
					total.pprice += v.pprice*v.num;
					//结算数量
					total.num = state.selectedList.length;
				}
			})
			return total;
		}
	},
	mutations:{
		//全选
		checkAll(state){
			state.selectedList = state.list.map(v=>{
				v.checked = true;
				return v.id;
			})
		},
		//全不选
		unCheckAll(state){
			
			state.list.forEach(v=>{
				v.checked = false;
			})
			state.selectedList = [];
		},
		//单选
		selectedItem(state,index){
			let id = state.list[index].id;
			let i = state.selectedList.indexOf(id);
			//如果selectedList已经存在就代表他之前是选中状态, checked=false,并且在selectedList删除
			if(   i  >  -1  ){
				state.list[index].checked = false;
				return state.selectedList.splice(i,1);
			}
			//如果之前没有选中,checked=true , 把当前的id添加到selectedList
			state.list[index].checked = true;
			state.selectedList.push(id);
		},
		delGoods(state){
			state.list = state.list.filter(v=>{
				return state.selectedList.indexOf(v.id) === -1;
			})
		}
	},
	actions:{
		checkedAllFn({commit,getters}){
			
			getters.checkedAll  ?  commit("unCheckAll")  :  commit("checkAll");
		
		},
		delGoodsFn({commit}){
					
			commit('delGoods');
			commit('unCheckAll');
			
			uni.showToast({
				title:'删除成功',
				icon:"none"
			})
		}
	}
}