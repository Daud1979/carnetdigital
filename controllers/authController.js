const { getUserByCredentials } = require('../models/userModel');

exports.showLogin = (req, res) => {
  res.render('login', { error: null });
};

exports.login = async (req, res) => {
  const { email, dni, birthdate } = req.body;

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
    res.redirect('/carnet');
  } else {
    res.render('login', { error: 'Credenciales incorrectas.' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};