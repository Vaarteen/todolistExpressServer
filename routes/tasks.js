const express = require('express');
const router = express.Router();

module.exports = (db) => {
    const taskModel = require('../models/Task')(db);

    // GET toutes les tâches
    router.get('/', (req, res) => {
        taskModel.getAllTasks((err, tasks) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(201).json(tasks);
            }
        });
    });

    // POST créer une nouvelle tâche
    router.post('/', (req, res) => {
        const { task } = req.body;
        taskModel.createTask(task, (err, newTask) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(201).send(newTask);
            }
        });
    });

    // PUT mise à jour d'une tâche => id en paramètre
    router.put('/:id', (req, res) => {
        const { id } = req.params;
        const { task, completed } = req.body;
        taskModel.updateTask(id, task, completed, (err, updatedTask) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(226).json(updatedTask);
            }
        });
    });

    // DELETE suppression d'une tâche => id en paramètre
    router.delete('/:id', (req, res) => {
        const { id } = req.params;
        taskModel.deleteTask(id, (err) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.sendStatus(204);
            }
        });
    });

    return router;
};
