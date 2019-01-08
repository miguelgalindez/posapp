const debug = require('debug')(`server:${__filename}`);
module.exports = (httpServer) => {
    const io = require('socket.io')(httpServer)
    io.path('/socket.io')

    const namespaces = {
        auth: io.of('/auth')
    }

    namespaces.auth.on('connection', socket => {
        debug('Socket connected to auth namespace: ', socket.id)
    })

    return {
        io,
        namespaces
    }
}