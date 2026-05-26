const express = require('express');
const playerService = require('../services/player');
const router = express.Router();
const passport = require('passport');

router.get('/:playerID', passport.authenticate('jwt',{session:false}), async (req, res)=>{
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

router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) =>{
    const {fifa_version, fifa_update, player_face_url, long_name, club_name, nationality_name, age, player_positions, skill_dribbling, skill_curve, skill_fk_accuracy, skill_long_passing, skill_ball_control} = req.body;
    try {
        const newPlayer = await playerService.createPlayer({fifa_version, fifa_update, player_face_url,long_name, club_name, nationality_name, age, player_positions, skill_dribbling, skill_curve, skill_fk_accuracy, skill_long_passing, skill_ball_control});
        res.status(201).json(newPlayer);
    } catch (error) {
        console.log(`El error es: ${error}`);
        res.status(500).json({message:error.message});
    }
})

router.put('/update/:playerID', passport.authenticate('jwt',{session:false}), async (req, res)=>{
    const playerID = req.params.playerID;
    const {fifa_version, fifa_update, player_face_url, long_name, club_name, nationality_name, age, player_positions, skill_dribbling, skill_curve, skill_fk_accuracy, skill_long_passing, skill_ball_control} = req.body;
    try {
        const {numRows, playerUpdated} = playerService.updatePlayer(playerID, {fifa_version, fifa_update, player_face_url, long_name, club_name, nationality_name, age, player_positions, skill_dribbling, skill_curve, skill_fk_accuracy, skill_long_passing, skill_ball_control});
        res.status(201).json({
            message: `${numRows} filas actualizadas`,
            data: playerUpdated
        })
    } catch (error) {
        console.log(`El error es: ${error}`);
        res.status(500).json({message: error.message});
    }
})

module.exports = router;