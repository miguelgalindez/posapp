module.exports=(namespace)=>{
    namespace.on('connection', (socket)=>{
        console.log('Connected user ', socket.id)
    })
}