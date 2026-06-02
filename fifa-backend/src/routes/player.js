const express = require('express');
const playerService = require('../services/player');
const router = express.Router();
const passport = require('passport');

/**
 * @swagger
 * /player/{playerID}:
 *   get:
 *     summary: Obtener un jugador por ID
 *     description: Retorna la información de un jugador específico.
 *     tags:
 *       - Players
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: playerID
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del jugador
 *     responses:
 *       200:
 *         description: Jugador obtenido correctamente
 *       500:
 *         description: Error interno del servidor
 */
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

/**
 * @swagger
 * /player:
 *   get:
 *     summary: Obtener todos los jugadores
 *     description: Retorna una lista con todos los jugadores registrados.
 *     tags:
 *       - Players
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de jugadores obtenida
 *       401:
 *         description: Token inválido o no enviado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', passport.authenticate('jwt',{session:false}),async (req, res)=>{
    try {
        const players = await playerService.getPlayers();
        res.status(200).json(players);
    } catch (error) {
        console.log(`El error es: ${error}`);
        res.status(500).json({message: error.message});
    }
})

/**
 * @swagger
 * /player/create:
 *   post:
 *     summary: Crear un nuevo jugador
 *     description: Crea un jugador utilizando los datos enviados en el cuerpo de la petición.
 *     tags:
 *       - Players
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - long_name
 *               - player_positions
 *               - age
 *             properties:
 *               long_name:
 *                 type: string
 *                 example: Lionel Messi
 *               player_positions:
 *                 type: string
 *                 example: RW,CF
 *               club_name:
 *                 type: string
 *                 example: Inter Miami
 *               nationality_name:
 *                 type: string
 *                 example: Argentina
 *               age:
 *                 type: integer
 *                 example: 37
 *               overall:
 *                 type: integer
 *                 example: 90
 *               potential:
 *                 type: integer
 *                 example: 90
 *               preferred_foot:
 *                 type: string
 *                 example: Left
 *               pace:
 *                 type: integer
 *                 example: 85
 *               shooting:
 *                 type: integer
 *                 example: 92
 *               passing:
 *                 type: integer
 *                 example: 91
 *               dribbling:
 *                 type: integer
 *                 example: 95
 *               defending:
 *                 type: integer
 *                 example: 40
 *               physic:
 *                 type: integer
 *                 example: 65
 *     responses:
 *       201:
 *         description: Jugador creado correctamente
 *       401:
 *         description: Token inválido o no enviado
 *       500:
 *         description: Error interno del servidor
 */
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

/**
 * @swagger
 * /player/update/{playerID}:
 *   put:
 *     summary: Actualizar un jugador
 *     description: Actualiza la información de un jugador existente.
 *     tags:
 *       - Players
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: playerID
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del jugador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               long_name:
 *                 type: string
 *                 example: Lionel Messi
 *               club_name:
 *                 type: string
 *                 example: Inter Miami
 *               overall:
 *                 type: integer
 *                 example: 90
 *               potential:
 *                 type: integer
 *                 example: 90
 *               pace:
 *                 type: integer
 *                 example: 85
 *               shooting:
 *                 type: integer
 *                 example: 92
 *               passing:
 *                 type: integer
 *                 example: 91
 *               dribbling:
 *                 type: integer
 *                 example: 95
 *     responses:
 *       201:
 *         description: Jugador actualizado correctamente
 *       401:
 *         description: Token inválido o no enviado
 *       500:
 *         description: Error interno del servidor
 */
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