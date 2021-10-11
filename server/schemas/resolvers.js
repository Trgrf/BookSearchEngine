const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user._id) {
                const userData = await User.findOne({
                    _id: context.user._id
                }).select('-__v -password');
                return userData;
            }

            throw new AuthenticationError('User not logged in')
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