const sql = require('../config/db');

const getUserByCredentials = async (email, dni, birthdate) => {
  try {
    const result = await sql.query`
      select id=ma.NumIdMatricula,nombre=tg.strDescripcion 
      from Alumnos al inner join Matriculas ma on (al.numIdAlumno=ma.numIdAlumno) inner join matriculagrupos magru on (ma.numIdMatricula=magru.numIdMatricula) inner join grupos gru on (magru.numIdGrupo=gru.numIdGrupo)  inner join tiposgrupos tg on (gru.numIdTipoGrupo=tg.numIdTipoGrupo) 
      where tg.numIdTipoGrupo <>1 and tg.numIdTipoGrupo<> 39 and al.strNif <> '' and al.strNif=ltrim(rtrim(${dni})) and convert(varchar(10),fecFechaNacimiento,103)=convert(varchar(10),convert(date,${birthdate}),103) and strEmail=ltrim(rtrim(${email}))
    `;
    return result.recordset;
  } catch (error) {
    console.error('Error al buscar usuario:', error);
    return null;
  }
};

module.exports = { getUserByCredentials };

