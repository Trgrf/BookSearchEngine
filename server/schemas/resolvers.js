const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user._id) {
                const userData = await User.findOne({
                    _id: context.user._id
                }).select('-__v -password');
                return userData;
            }

            throw new AuthenticationError('User not logged in')
        }
    },
    Mutation: {
        addUser: async (parent, args) => {

        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email })
            if (!user) {
                throw new AuthenticationError('No user with that email');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect Information!');
            }
            const token = signToken(user);
            res.json({ token, user });
        },

        saveBook: async (parent, args, context) => {
            if (context.user) {

            }
        },

        deleteBook: async (parent, args, context) => {

        }
    }
};

module.exports = resolvers;