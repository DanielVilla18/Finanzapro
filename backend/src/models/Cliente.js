module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    identificador_fiscal: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    direccion: {
      type: DataTypes.TEXT
    },
    telefono: {
      type: DataTypes.STRING(20)
    },
    email: {
      type: DataTypes.STRING(255)
    },
    persona_contacto: {
      type: DataTypes.STRING(255)
    },
    notas: {
      type: DataTypes.TEXT
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'clientes',
    timestamps: false
  });

  return Cliente;
};
