const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { check } = require('express-validator');

// Ruta para registrar un nuevo usuario
router.post('/register', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('rol', 'El rol es obligatorio').not().isEmpty()
], authController.register);

// Ruta para iniciar sesión
router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty()
], authController.login);

module.exports = router;
