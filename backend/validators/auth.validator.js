const { body } = require('express-validator');
const { notify } = require('../routes/auth.routes');


const registerValidator = [
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('Minimo 3 caracteres'),
    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debes enviar un email valido'), 
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isStrongPassword().withMessage('La contraseña debe tener al menos 8 caracteres, mayúsculas, minúsculas, números y simbolos o caracteres especiales')
]

const loginValidator = [
    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debes enviar un email valido'), 
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
];

module.exports = {
    registerValidator,
    loginValidator
}

