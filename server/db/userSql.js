var User = {
	//查询用户名
	queryUserName( param ){
		//phone = 应该是手机号这个变量[属性],为了后面好操作所有名称改为:userName
		return "select * from user where userName = '"+param.userName+"' or phone = '"+param.userName+"' ";
	},
	//验证用户名和密码
	queryUserPwd( param ){
		return "select * from user where (userName = '"+param.userName+"' or phone = '"+param.userName+"') and userPwd = '"+param.userPwd+"' ";
	},
	//增加一条用户数据
	insertData( param ){
		const jwt = require('jsonwebtoken');
		let payload = {name:param.userName}; //用户名
		let secret = 'xiaoxin';//口令
		let token = jwt.sign(payload,secret);
		return 'insert into user (userName,userPwd,phone,avatar,nickName,token) values ("","1234567","'+param.userName+'","../../static/imgs/logo.jpg","默认昵称","'+token+'")';
	}
}

exports = module.exports = User;
