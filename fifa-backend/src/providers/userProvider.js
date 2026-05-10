const  User  = require("../models/user");
const { operador } = require('sequelize');

const createUser = async (userOptions) => {
    try {
        const newUser = await User.createUser(userOptions);
        return newUser;
    } catch (error) {
        throw error;
    }
}

const getUser = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (user) {
            return user;
        }else{
            throw new Error('Usuario no encontrado')
        }
        
    } catch (error) {
        throw error;
    }
}

const getUsers = async (options) => {
    try {
        const users = await User.findAll({where: {[operador.or]: options}});
        if (users) {
            return users;
        }else{
            throw new Error('Usuario no encontrado')
        }
        
    } catch (error) {
        throw error;
    }
}

const updateUser = async (userId, userOptions) => {
    try {
        if(userId){
            const [rowsNumber] = await User.update(userOptions, {where: {id : userId}, returning: true});
            console.log(`Se actualizaron ${rowsNumber} filas en total.`);
            return User.findByPk(userId);
        }
    } catch (error) {
        throw error;
    }
}

const deleteUser = async(userId) => {
    try {
        return await User.destroy({ where: {id: userId}});
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser
}