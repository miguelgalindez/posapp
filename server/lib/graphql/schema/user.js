const graphql = require('graphql')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const { createGraphQLErrorFromMongooseError } = require('../../error-crafter')

module.exports.userTypeDef = `
    type User {
        id: ID
        username: String
        email: String
        password: String
        oauthProvider: String
        roles: [String]
        name: String
        photo: String
    }

    extend type Query {
        userFindByEmail(email: String): User
        userFindByUsernameOrEmail(usernameOrEmail: String): User
        userSignIn(usernameOrEmail: String, password: String): User
    }

    extend type Mutation {
        userSignUp(username: String, email: String, password: String, name: String, photo: String): User        
    }
`

module.exports.userResolvers = {
    Query: {
        userFindByEmail: async (parent, args) => {
            try {
                return await User.findByEmail(args.email)
            } catch (mongooseError) {
                throw await createGraphQLErrorFromMongooseError(mongooseError)
            }
        },

        userFindByUsernameOrEmail: async (parent, {usernameOrEmail}) => {
            try {
                return await User.findByUsernameOrEmail(usernameOrEmail)
            } catch (mongooseError) {
                throw await createGraphQLErrorFromMongooseError(mongooseError)
            }
        },

        userSignIn: async (parent, { usernameOrEmail, password }) => {
            try {
                return await User.signIn(usernameOrEmail, password)
            } catch (mongooseError) {
                throw await createGraphQLErrorFromMongooseError(mongooseError)
            }
        }
    },
    Mutation: {
        userSignUp: async (parent, args) => {
            try {
                return await User.signUp(args)
            } catch (mongooseError) {
                throw await createGraphQLErrorFromMongooseError(mongooseError)
            }
        }
    }
}