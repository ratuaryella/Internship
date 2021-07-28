const kelolaLokasi = (req, res, next) => {
  let param = {
    active: 'lokasi',
    role: req.cookies.role,
    username: req.cookies.username
}
  res.render('./pages/maps/kelola-lokasi',param);
}

module.exports = {
  kelolaLokasi,
}