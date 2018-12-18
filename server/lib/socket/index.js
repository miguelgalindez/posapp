module.exports = (httpServer)=>{    
    const io = require('socket.io')(httpServer)
    io.path('/socket.io')

    const namespaces = {
        auth: io.of('/auth')
    }
    
    return {
        io,
        namespaces
    }
}