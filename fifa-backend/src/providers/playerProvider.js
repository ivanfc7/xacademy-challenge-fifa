const { Json } = require('sequelize/lib/utils');
const Player = require('../models/players');

const getPlayers = async () => {
    try {
        const players = await Player.findAll();
        if(players){
            return players;
        }else{
            throw new Error('Lista no cargada');
        }
    } catch (error) {
        console.log(`El error es: ${error}`);
        throw error;
    }
}

const getPlayer = async (id) => {
    try {
        const player = await Player.findByPk(id);
        if(player){
            return player;
        }else{
            throw new Error('Jugador no encontrado')
        }
    } catch (error) {
        console.log(`El error es ${error}`);
        throw error;
    }
}

const createPlayer = async(playerAtributes) =>{
    try {
        const newPlayer = await Player.create(playerAtributes);
        return newPlayer;
    } catch (error) {
        console.log(`El error es: ${error}`);
        throw error;
    }
}

const updatePlayer = async(playerID, playerAtributes) =>{
    try {
        if(playerID){
            const [rowsNumber] = await Player.update(playerAtributes, {where: {id: playerID}, returning: true});
            const playerActualizado = await Player.findByPk(playerID);
            return {rowsNumber, playerActualizado};
        }
    } catch (error) {
        console.log(`El error es: ${error}`);
        throw error;
    }
}

module.exports = { getPlayers, getPlayer, createPlayer, updatePlayer }