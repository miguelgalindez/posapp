module.exports = (httpServer)=>{
    const allowedOrigins = ["localhost","http://127.0.0.1:3000"];
    const io = require('socket.io')(httpServer)
    io.path('/socket.io')
    //io.origins(allowedOrigins)
    const initAuthNameSpace=require('./init-auth-namespace')

    const namespaces = {
        auth: io.of('/')
    }

    initAuthNameSpace(namespaces.auth)
    return {
        io,
        namespaces
    }
}