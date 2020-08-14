var createError = require('http-errors');
var express = require('express');
var path = require('path');
var passport = require('passport')
var session = require('express-session')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var passportConfig = require('./passport')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var todoRouter = require('./routes/todo')
var sequelize = require('./models').sequelize

var app = express();
sequelize.sync()
passportConfig()

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('cookiesecret'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'cookiesecret',
  cookie: {
    httpOnly: true,
    secure: false
  }
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize())
app.use(passport.session())


app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/todo', todoRouter)

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

console.log('Server is running')
module.exports = app;
