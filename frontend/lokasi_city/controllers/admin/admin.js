const index = (req, res, next) => {
  let param = {
    active: 'home',
    role: req.cookies.role,
    username: req.cookies.username
  }

  res.render('./pages/admin/home', param);  
}

module.exports = {
  index,
}