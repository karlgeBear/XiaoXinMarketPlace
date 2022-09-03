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
		return 'insert into user (userName,userPwd,phone,imgUrl,nickName,token) values ("","","","","","")';
	}
}

exports = module.exports = User;
