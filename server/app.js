const express = require('express');
const app = express();
const httpServer = require('http').Server(app)
var logger = require('morgan')
const session = require('express-session')
const cors = require('cors')
const authRouter = require('./routes/auth')
const environmentProperties = require('./config/env')
const initPassport = require('./lib/passport')
const initMongo = require('./lib/mongo')
const initSocketIO = require('./lib/socket-io')

/**
 * GraphQL imports
 */
const graphql = require('express-graphql')

/**
 * Trying to connect to mongo db
 */
initMongo(environmentProperties)

app.use(cors())

/**
 * Setting up sockets
 */
const { io, namespaces: ioNamespaces } = initSocketIO(httpServer)
app.set('io', io)
app.set('ioNamespaces', ioNamespaces)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Setting up passport
 */
app.use(initPassport())

/**
 * saveUninitialized: true allows us to attach the socket id to the session
 * before we have athenticated the user
 * TODO: connect session to mongo db 
 */
app.use(session({
  secret: environmentProperties.expressSessionSecret,
  resave: true,
  saveUninitialized: true,
}))

app.use('/auth', authRouter)

/**
 * Setting up graphql
 
app.use('/graphql', graphql({
  graphiql: true
}))
*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({
    error: "Resource not found"
  })
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = httpServer;
