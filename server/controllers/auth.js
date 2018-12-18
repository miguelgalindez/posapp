const debug = require('debug')('server:authController')
const io = require('socket.io')

exports.handleGoogleCallback = (req, res, next) => {
    const io = req.app.get("io")
    debug(req.user)
    const { displayName, emails, photos } = req.user
    const user = {
        name: displayName,
        email: emails ? emails.find(email => email.type.toLowerCase() === "account") : null,
        photo: photos ? photos[0] : null
    }

    io.to(req.session.socketId).emit('userAuthenticated', user)

    res.status(200).json({
        action: "Google authentication",
        status: "OK"
    })
}

exports.handleTwitterCallback = (req, res) => {

}