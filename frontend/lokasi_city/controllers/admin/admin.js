const index = (req, res, next) => {
  let param = {
    active: 'home',
    role: req.cookies.role,
    username: req.cookies.username
  }
  if(req.cookies.role == 1){
    res.render('./pages/admin/home', param);
  }else{
    res.render('./pages/petugas/home_petugas', param);
  }
  
}

module.exports = {
  index,
}