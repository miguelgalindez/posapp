const debug = require('debug')('server:authController')
const io = require('socket.io')

const handler = (req, res, next) => {
    debug(req.user)
    next()
}

exports.handleGoogleCallback = (req, res, next) => {
    const io=req.app.io
    debug(req.user)
    const user={
        name: req.user.username
    } 
    console.log(req.session.socketId)
    io.in(req.session.socketId).emit('authenticatedUser', user)
}

exports.handleTwitterCallback = (req, res) => {

}