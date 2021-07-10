const express = require('express');
const router = express.Router();

const mapsController = require('../controllers/maps/maps');
const authController = require('../controllers/auth/auth');
const loginMiddleware = require('../middleware/login');
const messageValidation = require('../validator/loginValidator');
const isAuthorization = require('../middleware/is-authorization');
const adminController = require('../controllers/admin/admin');
const tatananController = require('../controllers/tatanan/tatanan');
const administrasiController = require('../controllers/adminitrasi/administrasi');

router.get('/login', loginMiddleware, authController.index);
router.post('/login', loginMiddleware, messageValidation.loginValidator, authController.login);
router.post('/logout', isAuthorization, authController.logout);

router.get('/', isAuthorization, adminController.index);

router.get('/data-user', isAuthorization, (req, res) => {
    res.render('./pages/admin/datauser');
});

router.get('/tatanan', isAuthorization, tatananController.index);

router.get('/api-v1/intern/get-all-tatanan', isAuthorization, tatananController.getAllTatanan);

router.get('/kegiatan-petugas', isAuthorization, (req, res) => {
    res.render('./pages/admin/petugaskegiatan');
});
router.get('/kegiatan-umum', isAuthorization, (req, res) => {
    res.render('./pages/admin/umumkegiatan');
});

router.get('/home-petugas', isAuthorization,  (req, res) => {
    res.render('./pages/petugas/home_petugas');
});

router.get('/berita-petugas', isAuthorization, (req, res) => {
    res.render('./pages/petugas/berita_petugas');
});

router.get('/kelola-lokasi', isAuthorization, mapsController.kelolaLokasi);
router.get('/get-kecamatan', isAuthorization, administrasiController.getAllKecamatan); //get-kecamatan?kodeprov=12&kodekabkot=75&page=1
router.get('/get-desa', isAuthorization, administrasiController.getAllDesa); //get-desa?kodeprov=12&kodekabkot=75&kodekec=060&page=1
router.get('/get-geom-kecamatan', isAuthorization, administrasiController.getKecamatanGeometri); //get-geom-kecamatan?kodeprov=12&kodekabkot=75&kodekec=050
router.get('/get-geom-desa', isAuthorization, administrasiController.getDesaGeometri); //get-geom-desa?kodeprov=12&kodekabkot=75&kodekec=060&kodedesa=007

module.exports = router;