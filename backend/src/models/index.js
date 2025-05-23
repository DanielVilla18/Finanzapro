const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Importar modelos
const User = require('./User')(sequelize, DataTypes);
const Cliente = require('./Cliente')(sequelize, DataTypes);
const Prestamo = require('./Prestamo')(sequelize, DataTypes);
const Cuota = require('./Cuota')(sequelize, DataTypes);

// Definir relaciones
Prestamo.belongsTo(Cliente, {
  foreignKey: 'cliente_id',
  as: 'cliente'
});

Cliente.hasMany(Prestamo, {
  foreignKey: 'cliente_id',
  as: 'prestamos'
});

Cuota.belongsTo(Prestamo, {
  foreignKey: 'prestamo_id',
  as: 'prestamo'
});

Prestamo.hasMany(Cuota, {
  foreignKey: 'prestamo_id',
  as: 'cuotas'
});

// Sincronizar modelos con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados con éxito');
  })
  .catch(err => {
    console.error('Error al sincronizar modelos:', err);
  });

// Exportar los modelos
module.exports = {
  User,
  Cliente,
  Prestamo,
  Cuota,
  sequelize
};
