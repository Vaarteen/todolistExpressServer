const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();
// Créer un utilisateur... s'il n'existe pas déjà !
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        await User.create({ username, password });
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ message: 'User already exists' });
    }
});
// Mettre en session => JWT
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        // On retourne le JWT pour qu’il soit stocké par le client
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});
// Accéder au profil => route privée
router.get('/profile', async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json({ username: user.username });
});

module.exports = router;