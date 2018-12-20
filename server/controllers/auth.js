const debug = require('debug')('server:authController')

const notifyClient = (req, res, user) => {
    const io = req.app.get("io")
    const authNameSpace = req.app.get("ioNamespaces").auth.name
    io.of(authNameSpace).to(`${authNameSpace}#${req.session.socketId}`).emit('userAuthenticated', user)

    res.status(200).json({
        action: "Google authentication",
        status: "OK"
    })
}

exports.handleGoogleCallback = (req, res) => {
    const { displayName, emails, photos } = req.user
    const user = {
        name: displayName,
        email: emails ? emails.find(email => email.type.toLowerCase() === "account").value : undefined,
        photo: photos ? photos[0].value : undefined
    }
    notifyClient(req, res, user)
}

exports.handleFacebookCallback = (req, res) => {
    notifyClient(req, res, null)
}

exports.handleGithubCallback = (req, res) => {
    const { displayName, emails, photos } = req.user
    const user = {
        name: displayName,
        email: emails ? emails[0].value : undefined,
        photo: photos ? photos[0].value : undefined
    }

    notifyClient(req, res, user)
}