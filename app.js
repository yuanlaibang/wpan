var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs'); 

var mysqlConf = require('./conf/mysql.conf.json')

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(mysqlConf);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 禁用头 X-Powered-By 
app.disable('x-powered-by');

//静态资源使用目录
app.use(express.static(path.join(__dirname, 'build_views')));
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'img/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('wpan_secret'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    key: 'wpan',
    secret: 'wpan_secret',
    store: sessionStore,
    cookie: {
      maxAge:180*60*1000,//设置maxAge是600000ms，即10分钟后session和相应的cookie失效过期
      path:'/',
      httpOnly:true, //确保 cookie 只通过 HTTP(S)（而不是客户机 JavaScript）发送，这有助于防御跨站点脚本编制攻击。
    },
    // resave: true,
    // saveUninitialized: true
    resave: false, // 当此参数为 true 时，每次请求 都会生成一份新的 session 信息? // 必须为true
    saveUninitialized: false, //保存初始化,无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid
    useConnectionPooling:false,
    name:'wpan.sid'
}));

app.use(bodyParser.raw({
    type: 'text/plain'
}),function(req, res, next){
    if(Buffer.isBuffer(req.body)){
        try{
          req.body = req.body.toString('utf8',0,req.body.length);
          req.body = JSON.parse(req.body);
        }catch(e){}
    }
    next();
});
app.use(bodyParser.text({type: 'text/html'}));

// 路由加载
require('./routes/routes')(app);

if(process.env&&process.env.NODE_ENV === 'dev'){
    // 这里是前端开发调用API开发执行
    var webpack = require('webpack'),
      webpackDevMiddleware  = require('webpack-dev-middleware'),
      webpackHotMiddleware  = require('webpack-hot-middleware'),
      webpackDevConfig      = require('./conf/webpack.development');
    // webpack
    var compiler   = webpack(webpackDevConfig);
    var middleware = webpackDevMiddleware(compiler, {
      publicPath: webpackDevConfig.output.publicPath,
      noInfo: true,
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      },
    })
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    // 开发模式 react-router browserHistory 服务端响应前端路由
    app.get('/*', function (req, res){
      var html = middleware.fileSystem.readFileSync(path.join(webpackDevConfig.output.path, 'index.html'));
      res.end(html);
    })
}else{

  // 生产环境执行
  var webpackDevConfig = require('./conf/webpack.development');
  // webpack url 开发模式和 生成返回静态页面
  // 这里使用了 react-router browserHistory
  var html = '',
      static_index_html_url = path.resolve(webpackDevConfig.output.path, 'index.html');

  if(fs.existsSync(static_index_html_url)){
      html = fs.readFileSync(static_index_html_url, {encoding: 'utf8'});
  }

  app.get('/*', function (req, res, next){
    if(html) res.send(html);
    else next();
  })
}
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
