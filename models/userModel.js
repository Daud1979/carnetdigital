// const sql = require('../config/db');

// const getUserByCredentials = async (email, dni, birthdate) => {
//   try {
//     const result = await sql.query`
//       SELECT * FROM Users
//       WHERE email = ${email}
//       AND dni = ${dni}
//       AND birthdate = ${birthdate}
//     `;
//     return result.recordset[0];
//   } catch (error) {
//     console.error('Error al buscar usuario:', error);
//     return null;
//   }
// };

// module.exports = { getUserByCredentials };

// Simulamos una base de datos con usuarios en memoria
const users = [
  {
    id: 1,
    email: 'prueba@email.com',
    dni: '12345678',
    birthdate: '2000-01-01',
  },
  // Puedes agregar más usuarios aquí
];

const getUserByCredentials = async (email, dni, birthdate) => {
  return users.find(u => 
    u.email === email && 
    u.dni === dni && 
    u.birthdate === birthdate
  ) || null;
};

module.exports = { getUserByCredentials };
