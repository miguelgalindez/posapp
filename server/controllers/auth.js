const debug = require('debug')(`server:${__filename}`)
const mongoose = require('mongoose')
let User

const notifyClient = async (req, res, user) => {
    try {
        if(!User){
            User = mongoose.model('User')
        }
        user = await User.signUp(user, true)
        debug("Authenticated user: ")
        console.dir(user)
        const io = await req.app.get("io")
        const authNameSpace = await req.app.get("ioNamespaces").auth.name
        await io.of(authNameSpace).to(`${authNameSpace}#${req.session.socketId}`).emit('userAuthenticated', user)

        res.status(200).json({
            action: "Google authentication",
            status: "OK"
        })
    } catch (error) {
        debug(error)
    }
}

exports.handleGoogleCallback = (req, res) => {
    const { displayName, emails, photos } = req.user
    const user = {
        name: displayName,
        email: emails ? emails.find(email => email.type.toLowerCase() === "account").value : undefined,
        photo: photos ? photos[0].value : undefined,
        signedUpWithOauth: true
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
        photo: photos ? photos[0].value : undefined,
        signedUpWithOauth: true
    }

    notifyClient(req, res, user)
}