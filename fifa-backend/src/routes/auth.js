const express = require('express');
const userService = require('../services/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = 'claveSecretaQueSoloElServidorConoce';

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Obtener token para el login
 *     description: Retorna un token JWT y el ID del usuario autenticado
 *     tags:
 *       - Auth
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
 *         description: Login exitoso
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error interno del servidor
 */
router.post('/login', async (req,res)=>{
    const {email, password} = req.body;
    try {
        const user = await userService.findUser({where:{email}});
        if(!user){
            return res.status(401).json({error: "Email no encontrado"});
        }
        const validarPasswd = await bcrypt.compare(password, user.password);
        if(!validarPasswd){
            return res.status(401).json({error: "Contraseña incorrecta"});
        }
        const payload = {id: user.id , email: user.email};
        const token = jwt.sign(payload, secret, {expiresIn: '1d'});
        console.log(user.id);
        res.json({token: token, id: user.id});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
})

module.exports = router;