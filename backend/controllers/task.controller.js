// ============ se agrego este controlador para la tarea de task-crud-mongoose ============

const Task = require('../models/Task');

const createTask = async (request, response) => {
    try {
        const { titulo, usuario } = request.body; 
        
        const task = new Task({
            titulo: request.body.titulo,
            usuario: request.user.id
        });

        await task.save(task);
        return response.status(201).json({ msg: 'Tarea creada correctamente', task });

    } catch (error) {
        return response.status(500).json({ error: `Error al crear la tarea ${error.message}` });
    }
};

const getTasks = async (request, response) => {
    try {
        const tasks = await Task.find({
            usuario: request.user.id
        }); //.populate('usuario', 'nombre email');  // El populate trae los datos del usuario que creo la tarea, en la clase se menciona que el populate puede ser opcional?
        
        return response.json({ msg : 'Tareas obtenidas correctamente', tasks});

    } catch (error) {
        return response.status(500).json({ error: `Error al obtener las tareas ${error.message}` });
    }
};

const updateTask = async (request, response) => {
    try {
        const task = await Task.findByIdAndUpdate( 
            request.params.id,
            request.body,
            { new: true }
        );
        return response.json({ msg: 'Tarea actualizada correctamente', task });

    } catch (error) {
        return response.status(500).json({ error: `Error al actualizar la tarea ${error.message}` });
    }
};

const deleteTask = async (request, response) => {
    try {
        const task = await Task.findByIdAndDelete(request.params.id);
        
        return response.json({ msg: 'Tarea eliminada correctamente', task });

       // return response.json({ msg: 'La tarea con id ' + request.params.id + ' ha sido eliminada correctamente', task });

    } catch (error) {
        return response.status(500).json({ error: `Error al eliminar la tarea ${error.message}` });
    }
};


module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};  

