// ============ se agrego esta ruta para la tarea de task-crud-mongoose ============

const express = require('express');
const router = express.Router();
const { createTask, getTasks } = require('../controllers/task.controller');

// Endpoints
router.post('/', createTask); // POST a /api/tarea
router.get('/', getTasks);    // GET a /api/tarea

module.exports = router;