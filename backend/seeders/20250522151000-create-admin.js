const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('Admin123!', 10);
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@finanzapro.com',
        password: hashedPassword,
        role: 'admin',
        estado: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', {
      email: 'admin@finanzapro.com'
    }, {});
  }
};
