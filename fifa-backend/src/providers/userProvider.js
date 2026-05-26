const  User  = require("../models/user");

const createUser = async (userOptions) => {
    try {
        const newUser = await User.create(userOptions);
        return newUser;
    } catch (error) {
        console.log(error);
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
        console.log(error);
        throw error;
    }
}

const findUser = async (userOptions) => {
    try {
        const user = await User.findOne(userOptions);
        if(user){
            return user;
        }else{
            throw new Error('El correo no existe');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createUser,
    getUser,
    findUser
}