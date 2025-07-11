exports.showCarnet = (req, res) => {
  const user = req.session.user;
  res.render('carnet', { user });
};