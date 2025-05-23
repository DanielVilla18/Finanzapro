const bcrypt = require('bcryptjs');
const { User } = require('../models');

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('Admin123!', 10);
    
    // Primero intentamos actualizar la tabla si ya existe
    await User.sequelize.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS role ENUM('admin', 'user') NOT NULL DEFAULT 'user'
    `);

    // Luego creamos el usuario administrador
    await User.create({
      nombre: 'Administrador',
      email: 'admin@finanzapro.com',
      password: hashedPassword,
      role: 'admin',
      estado: true
    });

    console.log('Usuario administrador creado exitosamente');
  } catch (error) {
    console.error('Error al crear el usuario administrador:', error);
  }
}

// Ejecutar el script
createAdmin();
