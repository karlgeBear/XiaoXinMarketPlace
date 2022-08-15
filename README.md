## 结构目录
![avatar](/devNote/imgs/picture/1.png)
```
mainifest.json ------ 配置文件：appid、应用的logo、版本等打包信息等
pages.json    ------- 配置文件：导航、tabbar、底部导航的文字颜色等等
uni.scss ------------  方便整体控制应用的风格。比如按钮颜色、边框风格，uni.scss文件里预置了一批scss变量预置。
unpackage -----------  存放所有打包生成的后的文件
main.js -------------  vue初始化入口文件入口
App.vue -------------- 全局配置：样式，全局监听
static --------------- 静态资源：图片、字体图标等
page ----------------- 内部存放所有的页面
server --------------- express搭建的后台
components ----------- 组件(存放一些页面组件，公共组件)
common --------------- 公共文件：全局的css文件
```
## 开发采用
- .vue文件、rpx尺寸(1px = 1rpx)
## 启动项目：
- 请用Hbuild安装微信开发者工具 || 连接真机USB启动开发者模式 || 下载手机模拟器启动开发者模式
- 后端: 
	- 进入server目录，cmd中输入命令：npm start
	- 注意：手机和电脑的ip地址要一致，前端请求不是locahost而是采用ip地址(http://你的ip地址:3000/api/goods/list)
 