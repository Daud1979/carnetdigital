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
const datoscarnet = async (idMatricula) => {
  try {
    const result = await sql.query`select gru.numIdTipoGrupo,TDocumento=strNif,Nombre= strNombre,Apellidos=strApellidos,Fecha_Valido=convert(varchar(10),fecFechaMatricula,103),Expira=convert(varchar(10),dateadd(year,5,fecFechaMatricula),103),N_Registroa=ma.NumIdMatricula,Asignatura=asg.strNombreAsignatura,Titulo=tg.strDescripcion,Foto=strfoto,Tipo = CASE 
              WHEN tg.strDescripcion LIKE '%RD%' THEN 'RD'
              ELSE 'UNE' 
           END
from Alumnos al   inner join Matriculas ma on (al.numIdAlumno=ma.numIdAlumno) 
				  inner join matriculagrupos magru on (ma.numIdMatricula=magru.numIdMatricula)
				  inner join grupos gru on (magru.numIdGrupo=gru.numIdGrupo)  
				 inner join clasesgrupos clagru on (gru.numIdGrupo=clagru.numIdGrupo)
				 inner join clases clas on (clas.numIdClase=clagru.numIdClase)
				 inner join Asignaturas asg on (clas.numIdAsignatura=asg.NumIdAsignatura)
				 inner join tiposgrupos tg on (gru.numIdTipoGrupo=tg.numIdTipoGrupo)
where (ma.numIdMatricula=${idMatricula}) and strFoto is not null`;
    return result.recordset;
  } catch (error) {
    console.error('Error al buscar usuario:', error);
    return null;
  }
};
module.exports = { getUserByCredentials,datoscarnet };

