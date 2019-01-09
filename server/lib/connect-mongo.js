const mongoose = require('mongoose')
const debug = require('debug')(`server:${__filename}`);

const connectMongo = async environmentProperties => {
    await mongoose.connect(environmentProperties.mongoDb.url, environmentProperties.mongoDb.options)
    debug('Mongoose connected')
}

module.exports = async (environmentProperties) => {    
    try{
        /**
         * Compiling the mongoose schemas into models
         */
        await require('../models')
        /**
         * Trying to connect to Mongo
         */
        await connectMongo(environmentProperties).catch(error => debug(error))        

    } catch(error){
        debug(error)
    }
    /**
    * Adding connection event handlers
    */
    mongoose.connection.on('reconnected', function () {
        debug('Mongoose reconnected')
    })

    mongoose.connection.on('error', function (err) {
        debug('Mongoose connection error ', err)
    })

    mongoose.connection.on('disconnected', function () {
        debug('Mongoose disconnected')
    })

    /**
    * Adding some application finishing event handlers
    */
    const shutdown = async (msg, callback) => {
        await mongoose.connection.close(function () {
            debug('Mongoose disconnected through: ', msg)
            callback()
        })
    }

    process.once('SIGUSR2', async () => {
        await shutdown('Nodemon restart', function () {
            process.kill(process.pid, 'SIGUSR2');
        })
    })

    process.on('SIGINT', async () => {
        await shutdown('App termination', function () {
            process.exit(0);
        })
    })

    process.on('SIGTERM', async () => {
        await shutdown('Heroku app shutdown', function () {
            process.exit(0);
        })
    })

    /**
    * Returning the Mongoose connection
    */
    return mongoose.connection;
}