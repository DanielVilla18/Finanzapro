module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clientes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      identificador_fiscal: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      direccion: {
        type: Sequelize.TEXT
      },
      telefono: {
        type: Sequelize.STRING(20)
      },
      email: {
        type: Sequelize.STRING(255)
      },
      persona_contacto: {
        type: Sequelize.STRING(255)
      },
      notas: {
        type: Sequelize.TEXT
      },
      estado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Crear índice para identificador_fiscal
    await queryInterface.addIndex('clientes', ['identificador_fiscal']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('clientes');
  }
};
