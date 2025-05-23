const express = require('express');
const router = express.Router();
const { validarJWT } = require('../middleware/auth');
const { 
  obtenerClientes,
  obtenerCliente,
  crearCliente,
  actualizarCliente,
  eliminarCliente
} = require('../controllers/cliente.controller');

// Rutas protegidas
router.use(validarJWT);

// Rutas
router.get('/', obtenerClientes);
router.get('/:id', obtenerCliente);
router.post('/', crearCliente);
router.put('/:id', actualizarCliente);
router.delete('/:id', eliminarCliente);

module.exports = router;
