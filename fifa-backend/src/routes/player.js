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

router.post('/create', passport.authenticate('jwt', {session: false}), async (req, res) =>{
    const {
        fifa_version,
        fifa_update,
        player_face_url,
        long_name,
        player_positions,
        club_name,
        nationality_name,
        overall,
        potential,
        value_eur,
        wage_eur,
        age,
        height_cm,
        weight_kg,
        preferred_foot,
        pace,
        shooting,
        passing,
        dribbling,
        defending,
        physic,
        weak_foot,
        skill_moves,
        international_reputation,
        work_rate,
        body_type,
        player_traits
    } = req.body;
    try {
        const newPlayer = await playerService.createPlayer({
            fifa_version: fifa_version || '24',
            fifa_update: fifa_update || '1',
            player_face_url,
            long_name,
            player_positions,
            club_name: club_name || null,
            nationality_name: nationality_name || null,
            overall: parseInt(overall) || 60,  
            potential: parseInt(potential) || 65,
            value_eur: value_eur ? parseInt(value_eur) : 0,
            wage_eur: wage_eur ? parseInt(wage_eur) : 0,
            age: parseInt(age),
            height_cm: height_cm ? parseInt(height_cm) : 180,
            weight_kg: weight_kg ? parseInt(weight_kg) : 75,
            preferred_foot: preferred_foot || 'Right',
            
            pace: pace ? parseInt(pace) : 50,
            shooting: shooting ? parseInt(shooting) : 50,
            passing: passing ? parseInt(passing) : 50,
            dribbling: dribbling ? parseInt(dribbling) : 50,
            defending: defending ? parseInt(defending) : 50,
            physic: physic ? parseInt(physic) : 50,

            weak_foot: weak_foot ? parseInt(weak_foot) : 3,
            skill_moves: skill_moves ? parseInt(skill_moves) : 3,
            international_reputation: international_reputation ? parseInt(international_reputation) : 1,
            work_rate: work_rate || 'Medium/Medium',
            body_type: body_type || 'Normal',
            player_traits: player_traits || null,

            attacking_crossing: passing ? parseInt(passing) : 50,
            attacking_short_passing: passing ? parseInt(passing) : 50,
            skill_long_passing: passing ? parseInt(passing) : 50,
            mentality_vision: passing ? parseInt(passing) : 50,

            attacking_finishing: shooting ? parseInt(shooting) : 50,
            power_shot_power: shooting ? parseInt(shooting) : 50,
            power_long_shots: shooting ? parseInt(shooting) : 50,

            skill_dribbling: dribbling ? parseInt(dribbling) : 50,
            skill_ball_control: dribbling ? parseInt(dribbling) : 50,
            movement_agility: dribbling ? parseInt(dribbling) : 50,

            defending_marking: defending ? parseInt(defending) : 50,
            defending_standing_tackle: defending ? parseInt(defending) : 50,
            defending_sliding_tackle: defending ? parseInt(defending) : 50,

            movement_acceleration: pace ? parseInt(pace) : 50,
            movement_sprint_speed: pace ? parseInt(pace) : 50,

            power_jumping: physic ? parseInt(physic) : 50,
            power_stamina: physic ? parseInt(physic) : 50,
            power_strength: physic ? parseInt(physic) : 50
        });
        res.status(201).json(newPlayer);
    } catch (error) {
        console.log(`El error es: ${error}`);
        res.status(500).json({message:error.message});
    }
})

router.put('/update/:playerID', passport.authenticate('jwt',{session:false}), async (req, res)=>{
    const playerID = req.params.playerID;
    const {
        fifa_version,
        fifa_update,
        player_face_url,
        long_name,
        player_positions,
        club_name,
        nationality_name,
        overall,
        potential,
        value_eur,
        wage_eur,
        age,
        height_cm,
        weight_kg,
        preferred_foot,
        pace,
        shooting,
        passing,
        dribbling,
        defending,
        physic,
        weak_foot,
        skill_moves,
        international_reputation,
        work_rate,
        body_type,
        player_traits
    } = req.body;
    try {
        const {numRows, playerUpdated} = playerService.updatePlayer(playerID, { fifa_version: fifa_version || '24',
            fifa_update: fifa_update || '1',
            player_face_url,
            long_name,
            player_positions,
            club_name: club_name || null,
            nationality_name: nationality_name || null,
            overall: parseInt(overall) || 60,  
            potential: parseInt(potential) || 65,
            value_eur: value_eur ? parseInt(value_eur) : 0,
            wage_eur: wage_eur ? parseInt(wage_eur) : 0,
            age: parseInt(age),
            height_cm: height_cm ? parseInt(height_cm) : 180,
            weight_kg: weight_kg ? parseInt(weight_kg) : 75,
            preferred_foot: preferred_foot || 'Right',
            
            pace: pace ? parseInt(pace) : 50,
            shooting: shooting ? parseInt(shooting) : 50,
            passing: passing ? parseInt(passing) : 50,
            dribbling: dribbling ? parseInt(dribbling) : 50,
            defending: defending ? parseInt(defending) : 50,
            physic: physic ? parseInt(physic) : 50,

            weak_foot: weak_foot ? parseInt(weak_foot) : 3,
            skill_moves: skill_moves ? parseInt(skill_moves) : 3,
            international_reputation: international_reputation ? parseInt(international_reputation) : 1,
            work_rate: work_rate || 'Medium/Medium',
            body_type: body_type || 'Normal',
            player_traits: player_traits || null,

            attacking_crossing: passing ? parseInt(passing) : 50,
            attacking_short_passing: passing ? parseInt(passing) : 50,
            skill_long_passing: passing ? parseInt(passing) : 50,
            mentality_vision: passing ? parseInt(passing) : 50,

            attacking_finishing: shooting ? parseInt(shooting) : 50,
            power_shot_power: shooting ? parseInt(shooting) : 50,
            power_long_shots: shooting ? parseInt(shooting) : 50,

            skill_dribbling: dribbling ? parseInt(dribbling) : 50,
            skill_ball_control: dribbling ? parseInt(dribbling) : 50,
            movement_agility: dribbling ? parseInt(dribbling) : 50,

            defending_marking: defending ? parseInt(defending) : 50,
            defending_standing_tackle: defending ? parseInt(defending) : 50,
            defending_sliding_tackle: defending ? parseInt(defending) : 50,

            movement_acceleration: pace ? parseInt(pace) : 50,
            movement_sprint_speed: pace ? parseInt(pace) : 50,

            power_jumping: physic ? parseInt(physic) : 50,
            power_stamina: physic ? parseInt(physic) : 50,
            power_strength: physic ? parseInt(physic) : 50});
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