const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasks');
const port = 3001;

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
