const { User, sequelize } = require('../models');
const bcrypt = require('bcryptjs');

async function setupAdmin() {
  try {
    // Verificar si ya existe un usuario administrador
    const existingAdmin = await User.findOne({
      where: {
        email: 'admin@finanzapro.com'
      }
    });

    if (existingAdmin) {
      console.log('El usuario administrador ya existe');
      return;
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash('Admin123!', 10);

    // Crear el usuario administrador
    await User.create({
      email: 'admin@finanzapro.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('Usuario administrador creado exitosamente');
  } catch (error) {
    console.error('Error al crear el usuario administrador:', error);
  }
}

// Ejecutar el script
setupAdmin();
