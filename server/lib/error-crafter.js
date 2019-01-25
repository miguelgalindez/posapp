const { GraphQLError } = require('graphql')

/**
 * Creates a custom error using the properties gotten as parameter.
 * It's useful, for instance, to handcraft errors in the same way as 
 * mongoose does
 * @param  {Object} errorProperties Object that defines all the 
 *                  properties the Error must contain
 * @returns {Error} An Error type object that will contain all properties
 *          defined by the errorProperties parameter
 */
module.exports.createCustomError = async errorProperties => {
    if (errorProperties) {
        let error = new Error()
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this)
        }

        await Object.keys(errorProperties).forEach(property => {
            if (errorProperties[property]) {
                error[property] = errorProperties[property]
            }
        })
        return error
    }
    return null
}

/** 
 * Creates a GraphQLError from an error thrown by a mongoose model.
 * It's useful to re-throw an mongoose error as a GraphQLError, 
 * in order to send a detailed response to the graphql client, displaying, 
 * for example, the paths in which errors were triggered
 * @param {Error} mongooseError Error thrown by a mongoose model
 * @returns {GraphQLError} Translated error ready to be thrown
 *                  
*/
module.exports.createGraphQLErrorFromMongooseError = async mongooseError => {
    let error = new GraphQLError()
    error.type = mongooseError.name
    error.message = mongooseError.message
    if (mongooseError.hasOwnProperty("paths")) {
        error.paths = await Object.keys(mongooseError.paths).reduce((paths, errorKey) => {
            paths[errorKey] = {
                message: mongooseError.paths[errorKey].message,
                value: mongooseError.paths[errorKey].value
            }
            return paths
        }, {})
    }
    return error
}