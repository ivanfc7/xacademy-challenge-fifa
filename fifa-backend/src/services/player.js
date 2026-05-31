const playerProvider = require('../providers/playerProvider');

const getPlayers = async() => {
    return await playerProvider.getPlayers();
}

const getPlayer = async (id) => {
    return await playerProvider.getPlayer(id);
}

const createPlayer = async(player) => {
    return await playerProvider.createPlayer(player);
}

const updatePlayer = async(id, playerAtributes) =>{
    return await playerProvider.updatePlayer(id, playerAtributes);
}

module.exports = {getPlayer, getPlayers, createPlayer, updatePlayer};