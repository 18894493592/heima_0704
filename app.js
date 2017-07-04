// 导入 http 内置模块
// 导入 express 模块
var express = require('express');

// 创建 express 的服务器实例
var app = express();

// 导入  解析 post  表单数据中的在 中间体
var bodyParser = require('body-parser');
// 注册  解析表单  post  数据的  表单
app.use(bodyParser.urlencoded({extended: false}));

// 导入自定义模板
var IndexRoouter = require('./router/indexRouter.js');

// 注册模板
app.use(IndexRoouter);

var UserRouter = require('./router/userRouter.js')

app.use(UserRouter)



// 托管静态资源
app.use('/node_modules',express.static('node_modules'));

// 设置模板引擎
app.set('view engine', 'ejs');

// 模板页面的存放路径
app.set('views', './views');

// app.get('/', (req,res)=>{
//     res.render('index');
// })

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3001, function () {
    console.log('Express server running at http://127.0.0.1:3001');
});