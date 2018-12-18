const debug = require('debug')('server:authController')

const notifyClient=(req, res, user)=>{
    const io = req.app.get("io")
    const authNameSpace=req.app.get("ioNamespaces").auth.name    
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
        email: emails ? emails.find(email => email.type.toLowerCase() === "account").value : null,
        photo: photos ? photos[0].value : null
    }
    notifyClient(req, res, user)
}

exports.handleFacebookCallback=(req, res)=>{

}