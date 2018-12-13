var express = require('express');
const passport=require('passport')
const session=require('express-session')
const passportSettingUp=require('./lib/passport-setting-up')
const environmentProperties=require('./config/env')
const authRouter=require('./routes/auth')
var logger = require('morgan')


//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize())
passportSettingUp()

// saveUninitialized: true allows us to attach the socket id to the session
// before we have athenticated the user
app.use(session({
  secret: environmentProperties.expressSessionSecret,
  resave: true,
  saveUninitialized: true
}))

// This custom middleware allows us to attach the socket id to the session
app.use((req, res, next) => {
  req.session.socketId = req.query.socketId
  next()
})


app.use('/auth', authRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({
    error: "Resource not found"
  })
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
