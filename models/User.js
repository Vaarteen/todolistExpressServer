const bcrypt = require('bcryptjs');

module.exports = (db) => {
    return {
        createUser: (username, password, callback) => {
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    return callback(err);
                }
                db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
                    callback(err, { id: result.insertId, username });
                });
            });
        },
        getUserByUsername: (username, callback) => {
            db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
                if (err) {
                    return callback(err);
                }
                callback(null, results[0]);
            });
        },
        findById: (id, callback) => {
            db.query('SELECT * FROM users WHERE id =?', [id], (err, results) => {
                if (err) {
                    return callback(err);
                }
                callback(null, results[0]);
            });
        }
    };
};
