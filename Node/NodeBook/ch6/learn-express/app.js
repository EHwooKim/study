var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var flash = require('connect-flash')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express(); // express 패키지를 호출하여 app 변수 객체를 만들었습니다. 이 변수에 각종 기능을 연결하여 사용합니다.


// app.set 메서드로 익스프레스 앱을 설정할 수 있습니다.

// view engine setup
app.set('views', path.join(__dirname, 'views')); // views는 템플릿 파일들이 위치한 폴더를 지정하는 것입니다. res.render 메서드가 이 폴더 기준으로 템플릿 엔진을 찾아 렌더링 합니다.
                                                 // res.render('index')이면 views/index.pug를 렌더링 하고, res.render('admin/main')이면 views/admin/main.pug 를 렌더링합니다.
app.set('view engine', 'pug');

// 커스텀 미들웨어
app.use(function(req, res, next) {
  console.log(req.url, '커스텀 미들웨어입니다.')
  next() // 미들웨어 안에서 반드시 next()를 호출해야 다음 미들웨어로 넘어갑니다.
})


app.use(logger('dev'));   // app.use로 시작하는 코드들은 미들웨어를 연결하는 부분으로  미들웨어는 익스프레스의 핵심이라고 할 수 있습니다.
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());  // app.use 메서드의 인자로 들어가있는 함수가 미들웨어입니다. 
app.use(express.urlencoded({ extended: false })); // 내부적으로 next()를 호출하여 다음 미들웨어로 넘어가게 됩니다.
app.use(cookieParser('secret code'));
app.use(session({   // express-session 은 cookie-parser보다 뒤에 놓는 것이 안전합니다. (1.5버전 이전에는 express-session 내부적으로 cookie-parser를 사용했기떄문에)
  resave: false,    // 요청이 왔을 때 수정사항이 생기지 않더라도 세션을 다시 저장할지에 대한 설정
  saveUninitialized: false,   // 세션에 저장할 내역이 없더라도 세션을 저장할지에 대한 설정, 보통 방문자 추적시 사용
  secret: 'secret code',    // 필수 항목으로, cookie-parser의 비밀키와 같은 역할
  // express-session은 세션 관리 시 클라이언트에 쿠키를 보내고 이를 세션 쿠키라고 부릅니다. 안전하게 쿠키를 전송하려면 쿠키에 서명을 추가해야하고, 쿠키를 서명하는데 필요한 secret의 값이 필요합니다. 이는 cookie-parser의 secret과 같게 설정해야 합니다.
  cookie: {   // 세션 쿠키에 대한 설정으로, maxAge, domain, path, expires, sameSite, httpOnlyl, secure 등 일반적인 쿠키 옵션이 모두 제공됩니다.
    httpOnly: true, // 클라이언트에서 쿠키를 확인하지 못하도록 설정했습니다.
    secure: false, // https가 아닌 환경에서도 사용할 수 있게 했습니다.  
  }                // 배포시에는 https를 적용하고, secure도 true로 설정하는 것이 좋습니다.
}))
app.use(flash())


app.use('/', indexRouter); // 라  우터도 미들웨어의 일종이기 떄문에 연결해주어야 합니다.
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {  // 404 처리 미들웨어와 에러 핸들러 역시 미들웨어의 일종이기 떄문에 연결해주어야 합니다.
  next(createError(404)); // 위의 라우터에서 요청이 처리되지 않으면 (일치하는 주소가 없다면) 요청은 라우터 아음에 위치한 이 미들웨어로 오게 되어 404 에러를 만들고 next()에 담아 아래의 에러 핸들러로 보냅니다.
});

// error handler
app.use(function(err, req, res, next) { // err 매개변수에 next 함수에 넣어준 인자가 연결됩니다.
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app; // app 객체를 모듈로 만들었고 이것이 bin/www 에서 사용된 app 모듈입니다.
