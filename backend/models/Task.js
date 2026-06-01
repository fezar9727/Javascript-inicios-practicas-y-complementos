// ============ se agrego este model para la tarea de task-crud-mongoose ============

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    completado: {
        type: Boolean,
        default: false
    },
    usuario: {   
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Esto crea la relación con el modelo User
        required: true  
    }
});

module.exports = mongoose.model('Task', taskSchema);