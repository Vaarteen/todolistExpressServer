const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const session = require('express-session');
const app = express();
const authRouter = require('./routes/auth');
const tasksRouter = require('./routes/tasks');
const port = 3001;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'cours',
    password: 'cours',
    database: 'todolist'
});
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MariaDB.');
});

// Middlewares
// Middleware pour parcourir la charge utile de la requête http
app.use(express.json());
app.use(cors());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Mettre à true en production avec https
}));

// Routage
// Les requêtes sur /api/tasks sont routées par tasksRouter
app.use('/api/tasks', tasksRouter(db));
// Les requêtes sur /api/auth sont routées par authRouter
app.use('/api/auth', authRouter(db));

// Page par défaut du serveur
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
