const Cliente = require('../models/Cliente');

// Obtener todos los clientes
const obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
      order: [['nombre', 'ASC']]
    });
    res.json({
      success: true,
      data: clientes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los clientes',
      error: error.message
    });
  }
};

// Obtener un cliente por ID
const obtenerCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({
        success: false,
        message: 'Cliente no encontrado'
      });
    }
    res.json({
      success: true,
      data: cliente
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el cliente',
      error: error.message
    });
  }
};

// Crear un nuevo cliente
const crearCliente = async (req, res) => {
  try {
    const { nombre, identificador_fiscal, direccion, telefono, email, persona_contacto, notas } = req.body;
    
    const cliente = await Cliente.create({
      nombre,
      identificador_fiscal,
      direccion,
      telefono,
      email,
      persona_contacto,
      notas
    });

    res.status(201).json({
      success: true,
      message: 'Cliente creado exitosamente',
      data: cliente
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear el cliente',
      error: error.message
    });
  }
};

// Actualizar un cliente
const actualizarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({
        success: false,
        message: 'Cliente no encontrado'
      });
    }

    await cliente.update(req.body);
    res.json({
      success: true,
      message: 'Cliente actualizado exitosamente',
      data: cliente
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el cliente',
      error: error.message
    });
  }
};

// Eliminar un cliente
const eliminarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({
        success: false,
        message: 'Cliente no encontrado'
      });
    }

    await cliente.destroy();
    res.json({
      success: true,
      message: 'Cliente eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el cliente',
      error: error.message
    });
  }
};

module.exports = {
  obtenerClientes,
  obtenerCliente,
  crearCliente,
  actualizarCliente,
  eliminarCliente
};
