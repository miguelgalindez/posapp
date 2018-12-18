module.exports = (httpServer)=>{    
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