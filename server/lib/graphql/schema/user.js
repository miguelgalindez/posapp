const graphql = require('graphql')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const { createGraphQLErrorFromMongooseError } = require('../../error-crafter')

module.exports.userTypeDef = `
    type User {
        id: ID!
        username: String
        email: String
        password: String
        roles: [String]
        name: String
        photo: String
    }

    extend type Query {
        userByEmail(email: String!): User
        userByUsernameOrEmail(username: String email: String): User
    }

    extend type Mutation {
        userSignUp(username: String, email: String, password: String, name: String, photo: String): User
    }
`

module.exports.userResolvers = {
    Query: {
        userByEmail: async (parent, args) => {
            // TODO: looking for the best way to recover a document from a query object.
            // What happens when find is used rather than findOne and you get many documents            
            return await User.findByEmail(args.email)
        },
        userByUsernameOrEmail: async (parent, args) => {
            try {
                return await User.findByUsernameOrEmail(args.username, args.email)
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