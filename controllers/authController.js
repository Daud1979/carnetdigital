const { getUserByCredentials,datoscarnet,datoscertificados } = require('../models/userModel');

exports.showLogin = (req, res) => {
  res.render('login', { error: null });
};

// exports.login = async (req, res) => {
//   const { email, dni, birthdate } = req.body;
//   const mimeType = 'image/jpeg';

//   if (!email || !dni || !birthdate) {
//     return res.render('login', { error: 'Todos los campos son obligatorios.' });
//   }

//   // Validar y convertir birthdate de dd/mm/yyyy a yyyy-mm-dd
//   const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
//   if (!regex.test(birthdate)) {
//     return res.render('login', { error: 'Formato de fecha inválido (dd/mm/yyyy).' });
//   }

//   const [, dd, mm, yyyy] = birthdate.match(regex);
//   const dateObj = new Date(`${yyyy}-${mm}-${dd}`);
//   const isValid = dateObj.getFullYear() == yyyy &&
//                   (dateObj.getMonth() + 1) == parseInt(mm) &&
//                   dateObj.getDate() == parseInt(dd);

//   if (!isValid) {
//     return res.render('login', { error: 'La fecha ingresada no es válida.' });
//   }

//   const formattedDate = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;

//   // Buscar usuario con fecha convertida
//   const user = await getUserByCredentials(email, dni, formattedDate);
//   if (user.length>0) {     
//       const carnet = await datoscarnet(user[0].id);      
//       const listacertificado = await datoscertificados(carnet[0].numIdAlumno);//la lista de certificados se puede usar para mostrar en la vista si es necesario
//       /* este es el ejemplo de la lista de certificados
//       [  
//   {
//     strAsunto: 'Z2173516K ROBERT SAUL MARIN PINARGOTE-RIESGOS EN PLATAFORMA ELEVADORA31102024.pdf'
//   },
//   {
//     strAsunto: 'Z2173516K ROBERT SAUL MARIN PINARGOTE-CARRETILLAS UNE VERIFICADO09122024.pdf'
//   }
// ]
//       */
//        const carnetsConImagen = carnet.map(c => {
//         const fotoBase64 = c.Foto.toString('base64');
//         return {
//           ...c,
//           Imagen: `data:${mimeType};base64,${fotoBase64}`
//         };
//       });
//       res.render('carnet', { datos: user, carnets: carnetsConImagen });
    
//   } else {
//     res.render('login', { error: 'Credenciales incorrectas.' });
//   }
// };

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getCarnetPorId = async (req, res) => {
  const id = req.params.id;

const mimeType = 'image/jpeg';
  try {
   const carnet = await datoscarnet(id); 
      const carnetsConImagen = carnet.map(c => {
      const fotoBase64 = c.Foto.toString('base64');
      return {
        ...c,
        Imagen: `data:${mimeType};base64,${fotoBase64}`
      };
      });   

    res.json(carnet);

  } catch (err) {
    console.error('Error al obtener carnet:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};


///////////////////
const AWS = require('aws-sdk');

// Configura S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1', // ajusta si es necesario
});

// Función para generar URL firmada
function generarUrlFirmada(nombreArchivo, bucketName) {
  const params = {
    Bucket: bucketName,
    Key: nombreArchivo,
    Expires: 60 * 5, // 5 minutos
  };

  return s3.getSignedUrl('getObject', params);
}

// Controlador login
exports.login = async (req, res) => {
  const { email, dni, birthdate } = req.body;
  const mimeType = 'image/jpeg';
  const bucketName = 'iceidocumentos'; // <-- reemplaza con el nombre real del bucket

  if (!email || !dni || !birthdate) {
    return res.render('login', { error: 'Todos los campos son obligatorios.' });
  }

  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!regex.test(birthdate)) {
    return res.render('login', { error: 'Formato de fecha inválido (dd/mm/yyyy).' });
  }

  const [, dd, mm, yyyy] = birthdate.match(regex);
  const dateObj = new Date(`${yyyy}-${mm}-${dd}`);
  const isValid = dateObj.getFullYear() == yyyy &&
                  (dateObj.getMonth() + 1) == parseInt(mm) &&
                  dateObj.getDate() == parseInt(dd);

  if (!isValid) {
    return res.render('login', { error: 'La fecha ingresada no es válida.' });
  }

  const formattedDate = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;

  try {
    const user = await getUserByCredentials(email, dni, formattedDate);

    if (user.length > 0) {
      const carnet = await datoscarnet(user[0].id);
      const listacertificado = await datoscertificados(carnet[0].numIdAlumno);

      // Convertir foto a base64
      const carnetsConImagen = carnet.map(c => {
        const fotoBase64 = c.Foto.toString('base64');
        return {
          ...c,
          Imagen: `data:${mimeType};base64,${fotoBase64}`
        };
      });

      // Generar URLs firmadas para cada certificado
      const certificadosConUrl = listacertificado.map(cert => {
        const url = generarUrlFirmada(cert.strAsunto, bucketName);
        return {
          nombre: cert.strAsunto,
          url
        };
      });

      res.render('carnet', {
        datos: user,
        carnets: carnetsConImagen,
        certificados: certificadosConUrl
      });
    } else {
      res.render('login', { error: 'Credenciales incorrectas.' });
    }
  } catch (error) {
    console.error('Error en login:', error);
    res.render('login', { error: 'Error en el servidor. Intenta nuevamente.' });
  }
};
