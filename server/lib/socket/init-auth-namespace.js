module.exports=(namespace)=>{
    namespace.on('connection', (socket)=>{
        console.log('[init-auth-namespace.js] Connected user ', socket.id)
    })
}