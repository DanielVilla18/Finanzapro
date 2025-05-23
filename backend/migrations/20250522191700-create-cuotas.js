module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cuotas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      prestamo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'prestamos',
          key: 'id'
        }
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      monto_capital: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      monto_interes: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      monto_total: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      fecha_vencimiento: {
        type: Sequelize.DATE,
        allowNull: false
      },
      estado: {
        type: Sequelize.ENUM('Pendiente', 'Pagada', 'Vencida', 'En disputa'),
        allowNull: false,
        defaultValue: 'Pendiente'
      },
      fecha_pago: {
        type: Sequelize.DATE
      },
      monto_pagado: {
        type: Sequelize.DECIMAL(15, 2),
        defaultValue: 0
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

    // Crear índice para prestamo_id
    await queryInterface.addIndex('cuotas', ['prestamo_id']);

    // Crear índice compuesto para prestamo_id y numero
    await queryInterface.addIndex('cuotas', ['prestamo_id', 'numero'], {
      unique: true,
      name: 'prestamo_numero_idx'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cuotas');
  }
};
