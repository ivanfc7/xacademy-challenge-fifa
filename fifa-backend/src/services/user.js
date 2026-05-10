const userProvider = require('../providers/userProvider');

const getUser = async (id) => {
    return await userProvider.getUser(id);
}

const getUsers = async (options) => {
    return await userProvider.getUsers(options);
}
const createUser = async (user) => {
    return await userProvider.createUser(user);
}

const updateUser = async (id, user) => {
    return await userProvider.updateUser(id, user);
}

const deleteUser = async (id) => {
    return await userProvider.deleteUser(id);
}

const queryUser = (name) => {}

module.exports = {getUser, getUsers,createUser, updateUser, deleteUser};