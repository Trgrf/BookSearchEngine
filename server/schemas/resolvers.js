const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            
        }
    },
    Mutation: {
        searchBook: async (parent, args) => {
            const book = await Book.create(args);
            return book;
        }
    }
};

module.exports = resolvers;