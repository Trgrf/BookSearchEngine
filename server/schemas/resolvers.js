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
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
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
            return { token, user };
        },

        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const book = await Book.create({
                    bookData
                })

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { book: book.bookId } }
                );
                return book;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        deleteBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const book = await Book.findOneAndDelete({
                    _id: bookId
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { book: book.bookId } }
                  );

                return book;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;