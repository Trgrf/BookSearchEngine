const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
}

type Book {
    _id: ID!
    authors: String
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}

type Query {
    me: [User]
    user: [User]
    book(_id: ID): [Book]
}

type Mutation {
    searchBook:(title: String!, description: String!, author: String, bookId: String!): Book
    
}
`;

module.exports = typeDefs;