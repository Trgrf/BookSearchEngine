const { User, Book } = require('../models');

const resolvers = {
    user: async () => {
        return User.find({});
    },
    book: async (parent, {_id}) => {
        const params = _id ? {_id} : {};
        return Book.find(params);
    },
},