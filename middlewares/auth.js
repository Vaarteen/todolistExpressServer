const jwt = require('jsonwebtoken');

// Middleware d'authentification JWT
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, 'your_jwt_secret', (err, user) => {
            if (err) {
                return res.sendStatus(403); // Token invalide
            }
            // ajout de l'utilisateur à la requête
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401); // Aucun token fourni
    }
};

module.exports = authenticateJWT;
