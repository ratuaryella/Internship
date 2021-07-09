const index = (req, res, next) => {
  res.render('./pages/admin/home');
}

module.exports = {
  index,
}