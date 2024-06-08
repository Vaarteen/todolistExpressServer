const express = require('express');
const mongoose = require('mongoose');
const app = express();
const tasksRouter = require('./routes/tasks');
const port = 3001;

// Connection à MongoDB
mongoose.connect('mongodb://localhost:27017/tasks', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Middlewares
// Middleware pour parcourir la charge utile de la requête http
app.use(express.json());

// Routage
// Les requêtes sur /api/tasks sont routées par tasksRouter
app.use('/api/tasks', tasksRouter);
// Page par défaut du serveur
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
