const sql = require('mssql');

const config = {
  user: 'TU_USUARIO',
  password: 'TU_CONTRASEÑA',
  server: 'TU_SERVIDOR_SQL',
  database: 'TU_BASE_DE_DATOS',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

sql.connect(config)
  .then(() => console.log('✅ Conectado a SQL Server'))
  .catch(err => console.error('❌ Error de conexión a SQL Server:', err));

module.exports = sql;