var createError = require('http-errors'); // http错误处理中间件
// express框架
var express = require('express');
// 内置path模块
var path = require('path');
// 解析前端的cookie 中间件
var cookieParser = require('cookie-parser');
// 日志中间件
var logger = require('morgan');

// 创建express 服务器
var app = express();

// view engine setup
// 模板引擎的设置
// ejs    jade freemarker (php模板引擎)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 使用日志中间件
app.use(logger('dev'));
// 解析json数据
app.use(express.json());
// 解析请求头和请求体
app.use(express.urlencoded({ extended: false }));
// 解析cookie中间件
app.use(cookieParser());
// 配置静态资源路径 中间件
app.use(express.static(path.join(__dirname, 'public')));
//设置跨域访问
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  // //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // 可以带cookies
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
})
// 路由中间件（自己配置）
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var effectiveRouter = require('./routes/effective')
// 挂载路由（使用）
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/effective', effectiveRouter);

// 处理前面没有人 管的路由，创建404错误，交给下一个路由去处理
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // 把错误信息 给 http响应
  // set locals, only providing error in development
  res.locals.message = err.message;
  // req.app.get('env')  获取当前的环境 （env）
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // 渲染模板
  res.render('error');
});

module.exports = app;
