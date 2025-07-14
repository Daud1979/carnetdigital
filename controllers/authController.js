const { getUserByCredentials,datoscarnet } = require('../models/userModel');

exports.showLogin = (req, res) => {
  res.render('login', { error: null });
};

exports.login = async (req, res) => {
  const { email, dni, birthdate } = req.body;
  const mimeType = 'image/jpeg';

  if (!email || !dni || !birthdate) {
    return res.render('login', { error: 'Todos los campos son obligatorios.' });
  }

  // Validar y convertir birthdate de dd/mm/yyyy a yyyy-mm-dd
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

  // Buscar usuario con fecha convertida
  const user = await getUserByCredentials(email, dni, formattedDate);
  if (user.length>0) {     
      const carnet = await datoscarnet(user[0].id);
      const carnetsConImagen = carnet.map(c => {
        const fotoBase64 = c.Foto.toString('base64');
        return {
          ...c,
          Imagen: `data:${mimeType};base64,${fotoBase64}`
        };
      });
      res.render('carnet', { datos: user, carnets: carnetsConImagen });
    
  } else {
    res.render('login', { error: 'Credenciales incorrectas.' });
  }
};

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
