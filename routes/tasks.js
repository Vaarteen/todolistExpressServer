// Récupérer le serveur
const express = require('express');
// Créer un routeur pour ce serveur
const router = express.Router();
// Récupérer le modèle défini pour MongoDB
const Task = require('../models/Task');

// GET toutes les tâches
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.status(201).json(tasks);
});
// POST créer une nouvelle tâche
router.post('/', async (req, res) => {
    // Créer la tâche avaec le contenu de la requête
    const newTask = new Task({
        task: req.body.task // completed est false par défaut
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
});
// PUT mise à jour d'une tâche => id en paramètre
router.put('/:id', async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!updatedTask) return res.status(404).send('Task not found');
    // Retourner la tâche modifiée avec le status 226
    res.status(226).json(updatedTask);
});
// DELETE suppression d'une tâche => id en paramètre
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    // Retourner la confirmation de suppression
    res.status(204).send();
});

module.exports = router;
