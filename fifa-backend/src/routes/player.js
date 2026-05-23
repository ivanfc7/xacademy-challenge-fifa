const express = require('express');
const playerService = require('../services/player');
const router = express.Router();
const passport = require('passport');

router.get('/:playerID', async (req, res)=>{
    const playerID = req.params.playerID;
    try {
        const player = await playerService.getPlayer(playerID);
        res.status(200).json(player);
    } catch (error) {
        console.log(`El error es ${error}`);
        res.status(500).json({message: error.message});
    }
})

router.get('/', passport.authenticate('jwt',{session:false}),async (req, res)=>{
    try {
        const players = await playerService.getPlayers();
        res.status(200).json(players);
    } catch (error) {
        console.log(`El error es: ${error}`);
        res.status(500).json({message: error.message});
    }
})

module.exports = router;