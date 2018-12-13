const debug=require('debug')('server:authController')

const handler=(req, res, next)=>{
    debug(req.user)
    next()
}

exports.handleGoogleCallback=handler
exports.handleTwitterCallback=handler