const { makeExecutableSchema } = require('graphql-tools')
const { userTypeDef, userResolvers } = require('./user')

const rootTypeDef = `
    type Query    
    type Mutation
    schema {
        query: Query        
        mutation: Mutation
    }
`
// TODO: implement authorization based on user role

const schema = makeExecutableSchema({
    typeDefs: [rootTypeDef, userTypeDef],
    resolvers: userResolvers
})

module.exports = schema