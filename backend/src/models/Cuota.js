const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Cuota = sequelize.define('Cuota', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    prestamo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: require('./Prestamo'),
        key: 'id'
      }
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    monto_capital: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    monto_interes: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    fecha_vencimiento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('Pendiente', 'Pagada', 'Vencida', 'En disputa'),
      allowNull: false
    },
    monto_pagado: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0
    },
    fecha_pago: {
      type: DataTypes.DATE
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'cuotas',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['prestamo_id', 'numero']
      }
    ]
  });

  return Cuota;
};
