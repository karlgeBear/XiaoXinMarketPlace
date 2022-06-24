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
components ----------- 组件(存放一些页面组件，公共组件)
common --------------- 公共文件：全局的css文件
``
## 开发采用
- .vue文件、rpx尺寸