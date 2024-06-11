const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authenticateJWT = require('../middlewares/auth');
module.exports = (db) => {
    const userModel = require('../models/User')(db);
    // Créer un utilisateur... s'il n'existe pas déjà !
    router.post('/register', (req, res) => {
        const { username, password } = req.body;
        userModel.createUser(username, password, (err, newUser) => {
            if (err) {
                res.status(400).json({ message: 'User already exists' });
            }
            res.status(201).json({ message: 'User created successfully', user: newUser });
        });
    });

    // Mettre en session => JWT
    router.post('/login', (req, res) => {
        const { username, password } = req.body;
        userModel.getUserByUsername(username, (err, user) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            if (!user) {
                res.status(401).json({ message: 'Invalid username or password' });
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ message: err.message });
                }
                if (!isMatch) {
                    res.status(401).json({ message: 'Invalid username or password' });
                }
                const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
                res.send({ token });
            });
        });
    });
    // Accéder au profil => route privée
    router.get('/profile', authenticateJWT, async (req, res) => {
        await userModel.findById(req.user.id, (err, user) => {
            if (err) {
                res.status(403).json({ message: 'Not connected' });
            }
            res.status(201).json({ username: user.username });
        });
    });
    // Déconnexion
    router.get('/logout', (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Log out failed' });
            }
        });
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out' });
    });


    return router;
};
