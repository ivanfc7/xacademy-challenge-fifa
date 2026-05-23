const playerProvider = require('../providers/playerProvider');

const getPlayers = async() => {
    return await playerProvider.getPlayers();
}

const getPlayer = async (id) => {
    return await playerProvider.getPlayer(id);
}

const createPlayer = async(playerAtributes) => {
    return await playerProvider.createPlayer(playerAtributes);
}

module.exports = {getPlayer, getPlayers, createPlayer};