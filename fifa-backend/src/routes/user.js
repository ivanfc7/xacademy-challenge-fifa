const express = require('express');
const userService = require('../services/user');
const bcrypt = require('bcrypt');
const router = express.Router();

/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Obtener los datos de un usuario por su ID
 *     description: Retorna un objeto con los datos del usuario correspondiente al ID enviado por parámetro.
 *     tags:
 *      - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del usuario en la base de datos
 *     responses:
 *       200:
 *         description: Usuario obtenido con éxito
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:userId', async (req,res)=>{
    const userId = req.params.userId;
    try {
        const user = await userService.getUser(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json( {message: error.message});
    }
})

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Crear nuevo usuario
 *     description: Retorna un objeto json para el usuario creado con éxito.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Usuario creado con éxito
 *       500:
 *         description: Error interno del servidor
 */
router.post('/register', async (req,res)=>{
    const saltRounds = 10;
    const {email, password} = req.body;
    const hashedPaswd = await bcrypt.hash(password, saltRounds);
    console.log(hashedPaswd);
    try {
        const newUser = await userService.createUser({email, password: hashedPaswd});
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json( {message: error.message});
    }
})

module.exports = router;