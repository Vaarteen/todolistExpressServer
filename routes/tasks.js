// Récupérer le serveur
const express = require('express');
// Créer un routeur pour ce serveur
const router = express.Router();
// La liste des tâches "en dur" pour l'instant
let tasks = [
    { _id: 1, task: 'Learn React', completed: false },
    { _id: 2, task: 'Learn Express', completed: false },
];
// GET toutes les tâches
router.get('/', (req, res) => {
    res.json(tasks);
});
// POST créer une nouvelle tâche
router.post('/', (req, res) => {
    // Créer la tâche avaec le contenu de la requête
    const newTask = {
        _id: tasks.length + 1,
        task: req.body.task,
        completed: false,
    };
    // L'ajouter à la liste des tâches
    tasks.push(newTask);
    // Retourner le code http de création (201)
    res.status(201).json(newTask);
});
// PUT mise à jour d'une tâche => id en paramètre
router.put('/:id', (req, res) => {
    // Trouver la tâche cherchée dans la liste
    const task = tasks.find(t => t._id === parseInt(req.params.id));
    // Si pas trouvé retourner une erreur 404
    if (!task) return res.status(404).send('Task not found');
    // Modifier la tâche avec les données de la requête
    task.task = req.body.task;
    task.completed = req.body.completed;
    // Retourner la tâche modifiée avec le status 226
    res.status(226).json(task);
});
// DELETE suppression d'une tâche => id en paramètre
router.delete('/:id', (req, res) => {
    // Trouver la tâche cherchée dans la liste
    const taskIndex = tasks.findIndex(t => t._id === parseInt(req.params.id));
    // Si pas trouvé retourner une erreur 404
    if (taskIndex === -1) return res.status(404).send('Task not found');
    // supprimer la tâche (ici du tableau)
    tasks.splice(taskIndex, 1);
    // Retourner la confirmation de suppression
    res.status(204).send();
});
module.exports = router;
