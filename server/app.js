var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public/clientBuild/')));


app.get('/graphql', (req, res)=>{
  res.json({status: "ok"})
})

app.get('*', (req, res)=>{
  console.log(path.join(__dirname, 'public/clientBuild/index.html'))
    res.sendFile(path.join(__dirname, 'public/clientBuild/index.html'))
})

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

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
