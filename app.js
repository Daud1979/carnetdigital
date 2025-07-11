const express = require('express');
const session = require('express-session');
const path = require('path');
const csrf = require('csurf');
const authRoutes = require('./routes/authRoutes');
const carnetRoutes = require('./routes/carnetRoutes');

const app = express();
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'un_secret_seguro_aqui',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(authRoutes);
app.use(carnetRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});