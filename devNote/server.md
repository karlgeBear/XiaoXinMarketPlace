## 搭建后端
- 步骤如下：
	1. npm install express-generator -g
	2. express --view=ejs server
	3. 进入express目录安装相应的依赖：npm i
	4. 启动后端项目：npm run start
	5. 在浏览器窗口打开localhost:3000
- 注意事项：
	- 1.改了后端的路由等信息，需要重新npm start
	- 前端请求要用ip地址，不能用localhost

## 连接数据库
```
// db/sql.js
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'unimarkout'
});
module.exports =  connection;

// routes/index.js
var connection = require('../db/sql.js');
router.get("/api/goods/search", function(req, res, next){
	connection.query('select * from goods_search', function (error, results, fields) {
	  if (error) throw error;
	  console.log('The solution is: ', results);
	});

})
```
## user login
- 建表 user
- 字段： userName phone userPwd nickName avatar token
- 在公共文件下暴露一个user对象，统一维护userSql语句
- 在需要查询的时候直接导入使用user.queryUserName(param)直接查询
```
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
```
