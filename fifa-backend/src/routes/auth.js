const express = require('express');
const userService = require('../services/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = 'claveSecretaQueSoloElServidorConoce';

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
        res.json({token: token});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
})

module.exports = router;