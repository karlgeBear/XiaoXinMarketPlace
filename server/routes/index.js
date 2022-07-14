var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/api/index_list/data",function(req,res,next){
	
	res.json({
		"code":1,
		"data":{
			topBar:[
				{id:1,name:'推荐'},
				{id:2,name:'运动户外'},
				{id:3,name:'服饰内衣'},
				{id:4,name:'鞋靴箱包'},
				{id:5,name:'美妆个护'},
				{id:6,name:'家居数码'},
				{id:7,name:'食品母婴'}
			],
			data:[
				{
					type:"swiperList",
					data:[
						{imgUrl:'../../static/imgs/swiper1.jpg'},
						{imgUrl:'../../static/imgs/swiper2.jpg'},
						{imgUrl:'../../static/imgs/swiper3.jpg'}
					]
				},
				{
					type:"recommendList",
					data:[
						{
							bigUrl:"../../static/imgs/children.jpg",
							dataL: [
								{imgUrl:"../../static/imgs/children.jpg"},
								{imgUrl:"../../static/imgs/children.jpg"},
								{imgUrl:"../../static/imgs/children.jpg"}
							]
						},
						{
							bigUrl:"../../static/imgs/children.jpg",
							dataL: [
								{imgUrl:"../../static/imgs/children.jpg"},
								{imgUrl:"../../static/imgs/children.jpg"},
								{imgUrl:"../../static/imgs/children.jpg"}
							]
						}
					]
				},
				{
					type:"commodityList",
					data:[
						{
							id:1,
							imgUrl:"../../static/imgs/commodity1.jpg",
							name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice:"299",
							oprice:"659",
							discount:"5.2"
						},
						{
							id:2,
							imgUrl:"../../static/imgs/commodity2.jpg",
							name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice:"299",
							oprice:"659",
							discount:"5.2"
						},
						{
							id:3,
							imgUrl:"../../static/imgs/commodity3.jpg",
							name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice:"299",
							oprice:"659",
							discount:"5.2"
						},
						{
							id:4,
							imgUrl:"../../static/imgs/commodity4.jpg",
							name:"大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008大姨绒毛大款2020年必须买,不买你就不行了,爆款疯狂GG008",
							pprice:"299",
							oprice:"659",
							discount:"5.2"
						}
					]
				}
			]
		}
	})
	
});
module.exports = router;
