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
