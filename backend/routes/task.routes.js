// ============ se agrego esta ruta para la tarea de task-crud-mongoose ============

const express = require('express');
const router = express.Router();
const validarToken = require('../middlewares/auth.middleware');

const { createTask, getTasks, updateTask, deleteTask} = require('../controllers/task.controller');

// Endpoints
router.post('/', validarToken, createTask); // POST a /api/tarea
router.get('/', validarToken, getTasks);    // GET a /api/tarea
router.put('/:id', validarToken, updateTask); // PUT a /api/tarea/:id
router.delete('/:id', validarToken, deleteTask); // DELETE a /api/tarea/:id

module.exports = router;