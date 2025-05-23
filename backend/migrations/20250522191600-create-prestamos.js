module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prestamos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clientes',
          key: 'id'
        }
      },
      monto: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      plazo: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      tasa_interes: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false
      },
      tipo_interes: {
        type: Sequelize.ENUM('Mensual', 'Anual'),
        allowNull: false,
        defaultValue: 'Mensual'
      },
      fecha_inicio: {
        type: Sequelize.DATE,
        allowNull: false
      },
      fecha_fin: {
        type: Sequelize.DATE,
        allowNull: false
      },
      estado: {
        type: Sequelize.ENUM('Activo', 'Cancelado', 'Pagado'),
        allowNull: false,
        defaultValue: 'Activo'
      },
      notas: {
        type: Sequelize.TEXT
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

    // Crear índice para cliente_id
    await queryInterface.addIndex('prestamos', ['cliente_id']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('prestamos');
  }
};
