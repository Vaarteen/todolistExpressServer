// Utiliser une base de données MongoDB
const mongoose = require('mongoose');
// Définir un schéma simple pour les tâches
const Taskschema = new mongoose.Schema({
    task: { type: String, required: true },
    completed: { type: Boolean, default: false },
});
module.exports = mongoose.model('Task', Taskschema);
