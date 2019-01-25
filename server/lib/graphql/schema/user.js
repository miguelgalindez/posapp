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
        userFindByEmail(email: String!): User
        userFindByUsernameOrEmail(username: String email: String): User
        userSignIn(username: String, email: String, password: String!): User
    }

    extend type Mutation {
        userSignUp(username: String, email: String, password: String, name: String, photo: String): User        
    }
`

module.exports.userResolvers = {
    Query: {
        userFindByEmail: async (parent, args) => {
            // What happens when find is used rather than findOne and you get many documents       
            try {
                return await User.findByEmail(args.email)
            } catch (mongooseError) {
                throw await createGraphQLErrorFromMongooseError(mongooseError)
            }
        },

        userFindByUsernameOrEmail: async (parent, args) => {
            try {
                return await User.findByUsernameOrEmail(args.username, args.email)
            } catch (mongooseError) {
                throw await createGraphQLErrorFromMongooseError(mongooseError)
            }
        },

        userSignIn: async (parent, { username, email, password }) => {
            try {
                return await User.signIn(username, email, password)
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