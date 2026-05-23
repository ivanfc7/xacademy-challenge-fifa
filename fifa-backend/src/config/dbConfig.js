const {Sequelize} = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql'
    }
);

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
