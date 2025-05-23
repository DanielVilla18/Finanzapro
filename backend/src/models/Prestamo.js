module.exports = (sequelize, DataTypes) => {
  const Prestamo = sequelize.define('Prestamo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: require('./Cliente'),
        key: 'id'
      }
    },
    monto_prestado: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    fecha_desembolso: {
      type: DataTypes.DATE
    },
    plazo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tasa_interes: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    tipo_interes: {
      type: DataTypes.ENUM('simple', 'compuesto'),
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM(
        'Solicitado',
        'Aprobado',
        'Desembolsado',
        'En Curso',
        'Pagado Completamente',
        'Incumplido',
        'Reestructurado'
      ),
      allowNull: false
    },
    contrato_path: {
      type: DataTypes.TEXT
    },
    notas: {
      type: DataTypes.TEXT
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'prestamos',
    timestamps: false
  });

  return Prestamo;
};
