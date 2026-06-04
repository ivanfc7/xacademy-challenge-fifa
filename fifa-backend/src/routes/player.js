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
        player_traits,
        // Atacantes
      attacking_crossing,
      attacking_finishing,
      attacking_heading_accuracy,
      attacking_short_passing,
      attacking_volleys,
      // Skills detallados
      skill_dribbling,
      skill_curve,
      skill_fk_accuracy,
      skill_long_passing,
      skill_ball_control,
      // Movimientos
      movement_acceleration,
      movement_sprint_speed,
      movement_agility,
      movement_reactions,
      movement_balance,
      // Poderes
      power_shot_power,
      power_jumping,
      power_stamina,
      power_strength,
      power_long_shots,
      // Mentalidad
      mentality_aggression,
      mentality_interceptions,
      mentality_positioning,
      mentality_vision,
      mentality_penalties,
      mentality_composure,
      // Defensivos internos
      defending_marking,
      defending_standing_tackle,
      defending_sliding_tackle,
      // Porteros
      goalkeeping_diving,
      goalkeeping_handling,
      goalkeeping_kicking,
      goalkeeping_positioning,
      goalkeeping_reflexes,
      goalkeeping_speed
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
            // Atacantes
            attacking_crossing: parseInt(attacking_crossing),
            attacking_finishing: parseInt(attacking_finishing),
            attacking_heading_accuracy: parseInt(attacking_heading_accuracy),
            attacking_short_passing: parseInt(attacking_short_passing),
            attacking_volleys: parseInt(attacking_volleys),
            // Skills detallados
            skill_dribbling: parseInt(skill_dribbling),
            skill_curve: parseInt(skill_curve),
            skill_fk_accuracy: parseInt(skill_fk_accuracy),
            skill_long_passing: parseInt(skill_long_passing),
            skill_ball_control: parseInt(skill_ball_control),
            // Movimientos
            movement_acceleration: parseInt(movement_acceleration),
            movement_sprint_speed: parseInt(movement_sprint_speed),
            movement_agility: parseInt(movement_agility),
            movement_reactions: parseInt(movement_reactions),
            movement_balance: parseInt(movement_balance),
            // Poderes
            power_shot_power: parseInt(power_shot_power),
            power_jumping: parseInt(power_jumping),
            power_stamina: parseInt(power_stamina),
            power_strength: parseInt(power_strength),
            power_long_shots: parseInt(power_long_shots),
            // Mentalidad
            mentality_aggression: parseInt(mentality_aggression),
            mentality_interceptions: parseInt(mentality_interceptions),
            mentality_positioning: parseInt(mentality_positioning),
            mentality_vision: parseInt(mentality_vision),
            mentality_penalties: parseInt(mentality_penalties),
            mentality_composure: parseInt(mentality_composure),
            // Defensivos internos
            defending_marking: parseInt(defending_marking),
            defending_standing_tackle: parseInt(defending_standing_tackle),
            defending_sliding_tackle: parseInt(defending_sliding_tackle),
            // Porteros
            goalkeeping_diving: parseInt(goalkeeping_diving),
            goalkeeping_handling: parseInt(goalkeeping_handling),
            goalkeeping_kicking: parseInt(goalkeeping_kicking),
            goalkeeping_positioning: parseInt(goalkeeping_positioning),
            goalkeeping_reflexes: parseInt(goalkeeping_reflexes),
            goalkeeping_speed: parseInt(goalkeeping_speed)
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
        const {numRows, playerUpdated} = playerService.updatePlayer(playerID, { 
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
            player_traits: player_traits || null});
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