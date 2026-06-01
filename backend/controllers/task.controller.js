// ============ se agrego este controlador para la tarea de task-crud-mongoose ============

const Task = require('../models/Task');

const createTask = async (request, response) => {
    try {
        const { titulo, usuario } = request.body; 
        
        const newTask = new Task({
            titulo,
            usuario
        });

        await newTask.save();
        return response.status(201).json({ msg: 'Tarea creada correctamente', task: newTask });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
};

const getTasks = async (request, response) => {
    try {
        const tasks = await Task.find().populate('usuario', 'nombre email'); // El populate trae los datos del usuario que creo la tarea
        return response.json(tasks);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
};

module.exports = {
    createTask,
    getTasks
};