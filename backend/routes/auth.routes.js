const express = require('express');
const router = express.Router();
const { registrar, login } = require('../controllers/auth.controller');
const { registerValidator } = require('../validators/auth.validator');
const validador = require("../middlewares/validate.middleware");

router.post('/registrar', registerValidator, validador, registrar);
router.post('/login', login);

module.exports = router;
