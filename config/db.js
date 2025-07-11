require('dotenv').config();
const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
   port: parseInt(process.env.DB_PORT, 10), 
  database: process.env.DB_NAME,
  options: {
    encrypt: false, // Cambiar a true si usas Azure u otra conexión segura
    trustServerCertificate: true
  }
};

sql.connect(config)
  .then(() => console.log('✅ Conectado a SQL Server'))
  .catch(err => console.error('❌ Error de conexión a SQL Server:', err));

module.exports = sql;
