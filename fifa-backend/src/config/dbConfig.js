const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    
});

const initializeDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexion a la BD establecida...');
        await sequelize.sync({force: false});
    } catch (error) {
        console.log('Hubo un error...'+error);
    }
}

module.exports = { sequelize, initializeDB } ;