const index = (req, res, next) => {
    let param = {
      active: 'home',
      role: req.cookies.role,
      username: req.cookies.username
    }
    if(req.cookies.role == 1){
      res.render('./pages/admin/home', param);
    }else if(req.cookies.role == 2){
      res.render('./pages/petugas/home_petugas', param);
    }else if(req.cookies.role == 3){
      res.render('./pages/petugas/home_petugas', param);
    }else{
      res.render('./pages/guest/home', param);   
    }
  }
  
  module.exports = {
    index,
  }