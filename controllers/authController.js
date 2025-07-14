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

  const user = await getUserByCredentials(email, dni, birthdate); 
  if (user) {
    req.session.user = {
      id: user.id,
      email: user.email,
      dni: user.dni,
    };   
    if(user.length>1)
    {     
      const carnet = await datoscarnet(user[0].id); 
      const carnetsConImagen = carnet.map(c => {
      const fotoBase64 = c.Foto.toString('base64');
      return {
        ...c,
        Imagen: `data:${mimeType};base64,${fotoBase64}`
      };
      });
      res.render('carnet',{datos:user,carnets: carnetsConImagen});
    }
    else
    {
      res.render('aviso');
    }
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
