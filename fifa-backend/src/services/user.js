const userProvider = require('../providers/userProvider');

const getUser = async (id) => {
    return await userProvider.getUser(id);
}

const createUser = async (user) => {
    return await userProvider.createUser(user);
}

const findUser = async (userOptions) => {
    return await userProvider.findUser(userOptions);
}
module.exports = {getUser, createUser, findUser};