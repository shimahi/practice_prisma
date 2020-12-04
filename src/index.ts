import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import { prisma } from 'generated/prisma-client'

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
  }

  type Query {
    user(id: Int!): User
    users: [User]
  }
`

const resolvers = {
  Query: {
    user: (_: unknown, { id }: { id: number }) => prisma.user({ id }),
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()

server.applyMiddleware({ app })

app.get('/', (req, res) => {
  res.json({
    message: 'いぬ〜',
  })
})

app.listen({ port: 4000 }, () => {
  console.log('Example app listening on http://localhost:4000')
  console.log(`GraphQL Server are running on ${server.graphqlPath}!`)
})
