module.exports = (httpServer)=>{    
    const io = require('socket.io')(httpServer)
    io.path('/socket.io')

    const namespaces = {
        auth: io.of('/auth')
    }

    namespaces.auth.on('connection', socket=>{
        console.log('Client connected: ', socket.id)
    })
    
    return {
        io,
        namespaces
    }
}