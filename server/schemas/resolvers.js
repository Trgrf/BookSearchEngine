const { User, Book } = require('../models');

const resolvers = {
    user: async () => {
        return User.find({});
    }
},