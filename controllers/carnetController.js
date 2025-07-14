exports.showCarnet = (req, res) => {
  const user = req.session.user;
  console.log(user);
  res.render('carnet', { user });
};