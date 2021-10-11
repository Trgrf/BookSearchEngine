const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');

const resolvers = {
    Query: {
        user: async () => {
            return User.find({});
        },
        book: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return Book.find(params);
        },
    },
    Mutation: {
        searchBook: async (parent, args) => {
            const book = await Book.create(args);
            return book;
        }
    }
};

module.exports = resolvers;