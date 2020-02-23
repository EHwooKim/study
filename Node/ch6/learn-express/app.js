var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express(); // express 패키지를 호출하여 app 변수 객체를 만들었습니다. 이 변수에 각종 기능을 연결하여 사용합니다.

// view engine setup
app.set('views', path.join(__dirname, 'views')); // app.set 메서드로 익스프레스 앱을 설정할 수 있습니다.
app.set('view engine', 'pug');

app.use(logger('dev'));   // app.use로 시작하는 코드들은 미들웨어를 연결하는 부분으로  미들웨어는 익스프레스의 핵심이라고 할 수 있습니다.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app; // app 객체를 모듈로 만들었고 이것이 bin/www 에서 사용된 app 모듈입니다.
