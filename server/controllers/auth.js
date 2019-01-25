const debug = require('debug')(`server:${__filename}`)
const mongoose = require('mongoose')
let User

// TODO: drop needless debug messages

const userSigning = async (req, res, user) => {
    try {
        if (!User) {
            User = await mongoose.model('User')
        }
        user = await User.signWithOAuth(user)

        debug("Authenticated user: ")
        console.dir(user)

        const io = await req.app.get("io")
        const authNameSpace = await req.app.get("ioNamespaces").auth.name
        await io.of(authNameSpace).to(`${authNameSpace}#${req.session.socketId}`).emit('userAuthenticated', user)

        await res.status(200).json({
            action: "OAuth process",
            status: "OK"
        })
    } catch (error) {
        debug(error)
    }
}

exports.handleGoogleCallback = async (req, res) => {
    const { displayName, emails, photos } = req.user
    const user = {
        name: displayName,
        email: emails && emails.length ? emails.find(email => email.type.toLowerCase() === "account").value : undefined,
        photo: photos && photos.length ? photos[0].value : undefined,
        oauthProvider: "google"
    }
    await userSigning(req, res, user)
}

exports.handleGithubCallback = async (req, res) => {
    const { displayName, emails, photos } = req.user
    const user = {
        name: displayName,
        email: emails && emails.length ? emails[0].value : undefined,
        photo: photos && photos.length ? photos[0].value : undefined,
        oauthProvider: "github"
    }

    await userSigning(req, res, user)
}

// TODO: Implement instagram handler

exports.handleFacebookCallback = async (req, res) => {
    // TODO: Implement facebook handler
    await userSigning(req, res, null)
}