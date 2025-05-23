const express = require('express');
const router = express.Router();
const prestamoController = require('../controllers/prestamo.controller');
const { validarJWT } = require('../middleware/auth');

// Rutas protegidas por autenticación
router.use(validarJWT);

// Rutas de préstamos
router.get('/', prestamoController.obtenerPrestamos);
router.get('/:id', prestamoController.obtenerPrestamo);
router.post('/', prestamoController.crearPrestamo);
router.put('/:id', prestamoController.actualizarPrestamo);
router.delete('/:id', prestamoController.eliminarPrestamo);

// Rutas de cuotas
router.get('/:prestamoId/cuotas', prestamoController.obtenerCuotas);
router.get('/:prestamoId/cuotas/:cuotaId', prestamoController.obtenerCuota);
router.put('/:prestamoId/cuotas/:cuotaId', prestamoController.actualizarCuota);

module.exports = router;
