import { gql } from 'graphql-tag'

const typeDefs = gql`
  type Query {
    users: [User]
    searchUser(value:String):[User]
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    username: String
    image: String
  }
`

const resolvers = {
  Query: {
    users: async () => {
      try {
        const response = await fetch(process.env.URL_API)
        const data = await response.json()

        return data.users.map(u => {
          return {
            id: u.id,
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email,
            username: u.username,
            image: u.image
          }
        })
      } catch (error) {
        throw new Error("Something went wrong")
      }
    },
    searchUser: async (_, { value }) => {
      try {
        const response = await fetch(`${process.env.URL_API}/search?q=${value}`)
        const data = await response.json()

        return data.users.map(u => {
          return {
            id: u.id,
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email,
            username: u.username,
            image: u.image
          }
        })
      } catch (error) {
        throw new Error("Something went wrong")
      }
    }
  }
}

export { typeDefs, resolvers };
