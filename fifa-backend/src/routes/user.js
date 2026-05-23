const express = require('express');
const userService = require('../services/user');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/:userId', async (req,res)=>{
    const userId = req.params.userId;
    try {
        const user = await userService.getUser(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json( {message: error.message});
    }
})

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