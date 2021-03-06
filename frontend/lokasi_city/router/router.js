const express = require('express');
const router = express.Router();

const mapsController = require('../controllers/maps/maps');
const authController = require('../controllers/auth/auth');
const loginMiddleware = require('../middleware/login');
const messageValidation = require('../validator/loginValidator');
const isAuthorization = require('../middleware/is-authorization');
const adminController = require('../controllers/admin/admin');
const guestController = require('../controllers/guest/guest');
const tatananController = require('../controllers/tatanan/tatanan');
const administrasiController = require('../controllers/adminitrasi/administrasi');
const kegiatanController = require('../controllers/kegiatan/kegiatan');
const kegiatanFetch = require('../fetch/kegiatan/kegiatan');
const userController = require('../controllers/user/user');
const {getPoiRegion} = require('../controllers/poi/poi-bvarta');

router.get('/login', loginMiddleware, authController.index);
router.post('/login', loginMiddleware, messageValidation.loginValidator, authController.login);
router.post('/logout', isAuthorization, authController.logout);

// router.get('/', isAuthorization, adminController.index);

router.get('/',  guestController.index);

router.get('/data-user', isAuthorization, (req, res) => {
    let param = {
        active: 'user',
        role: req.cookies.role,
        username: req.cookies.username
    }
    res.render('./pages/admin/datauser', param);
});

router.get('/tatanan', isAuthorization, tatananController.index);

router.get('/api-v1/intern/get-all-tatanan', isAuthorization, tatananController.getAllTatanan);
router.get('/api-v1/intern/get-full-tatanan', isAuthorization, tatananController.getFullTatanan);
router.get('/api-v1/intern/get-tatanan-nama', isAuthorization, tatananController.getTatananNama);
router.get('/api-v1/intern/get-tatanan-nama-jenis', isAuthorization, tatananController.getNamaJenis);
router.get('/api-v1/intern/get-tatanan-nama-jenis-kategori', isAuthorization, tatananController.getNamaJenisKategori);
router.get('/api-v1/intern/get-tatanan-nama-jenis-kategori-indikator', isAuthorization, tatananController.getNamaJenisKategoriIndikator);
router.post('/api-v1/intern/create-tatanan', isAuthorization, tatananController.createTatanan);
router.patch('/api-v1/intern/delete-tatanan', isAuthorization, tatananController.deleteTatanan);
router.get('/api-v1/intern/get-tatanan', isAuthorization, tatananController.getTatananById);
router.patch('/api-v1/intern/update-tatanan', isAuthorization, tatananController.editTatanan);

router.get('/api-v1/intern/get-all-users', isAuthorization, userController.getAllUsers);
router.get('/api-v1/intern/get-all-roles', isAuthorization, userController.getAllRoles);
router.post('/api-v1/intern/create-user', isAuthorization, userController.createUser);
router.patch('/api-v1/intern/delete-user', isAuthorization, userController.deleteUser);
router.get('/api-v1/intern/detail-user', userController.getUserById);
router.get('/api-v1/intern/detail-user-login', isAuthorization, userController.getUserByIdLogin);
router.patch('/api-v1/intern/update-user', isAuthorization, userController.editUser);

router.get('/api-v1/intern/get-all-kegiatan',  kegiatanController.getAllKegiatan);
router.get('/api-v1/intern/get-full-kegiatan', kegiatanController.getFullKegiatan);
router.get('/api-v1/intern/get-role-kegiatan', isAuthorization, kegiatanController.getKegiatanByRole);
router.get('/api-v1/intern/get-user-kegiatan', isAuthorization, kegiatanController.getKegiatanByUser);
router.get('/api-v1/intern/get-kegiatan', kegiatanController.getKegiatanById);
router.post('/api-v1/intern/create-kegiatan', isAuthorization, kegiatanFetch.uploadImg.single("gambar"), kegiatanController.createKegiatan);
router.post('/api-v1/intern/create-kegiatan-non', isAuthorization, kegiatanController.createKegiatanNon);
router.patch('/api-v1/intern/delete-kegiatan', isAuthorization, kegiatanController.deleteKegiatan);
router.patch('/api-v1/intern/update-kegiatan', isAuthorization, kegiatanController.editKegiatan);

router.get('/image-kegiatan', isAuthorization, (req, res) => {
    res.render('./pages/admin/gambar');
});

router.get('/petugas-kegiatan', isAuthorization, (req, res) => {
    let param = {
        active: 'kegiatan',
        role: req.cookies.role,
        username: req.cookies.username
    }
    res.render('./pages/admin/petugaskegiatan', param);
});
router.get('/kegiatan-umum', isAuthorization, (req, res) => {
    let param = {
        active: 'kegiatan-umum',
        role: req.cookies.role,
        username: req.cookies.username
    }
    res.render('./pages/admin/umumkegiatan', param);
});

router.get('/home-petugas', isAuthorization,  (req, res) => {
    let param = {
        active: 'home',
        role: req.cookies.role,
        username: req.cookies.username
    }
    res.render('./pages/petugas/home_petugas', param);
});

router.get('/berita-petugas', isAuthorization, (req, res) => {
    let param = {
        active: 'berita',
        role: req.cookies.role,
        username: req.cookies.username
    }
    res.render('./pages/petugas/berita_petugas', param);
});

router.get('/detail-berita', (req, res) => {
    let param = {
        active: 'berita',
        role: req.cookies.role,
        username: req.cookies.username
    }
    if(req.cookies.role == 'undefined'){
        res.render('./pages/guest/detail_berita', param);
    }
    res.render('./pages/petugas/detail_berita', param);
});

router.get('/profile-petugas', isAuthorization, (req, res) => {
    let param = {
        active: 'profile',
        role: req.cookies.role,
        username: req.cookies.username
    }
    res.render('./pages/petugas/profile_petugas', param);
});

router.get('/kegiatan-petugas', isAuthorization, (req, res) => {
    let param = {
        active: 'kegiatan-petugas',
        role: req.cookies.role,
        username: req.cookies.username
    }
    res.render('./pages/petugas/kegiatan_petugas', param);
});

router.get('/addkegiatan-petugas', isAuthorization, (req, res) => {
    let param = {
        active: 'kegiatan-petugas',
        role: req.cookies.role,
        username: req.cookies.username
    }
    res.render('./pages/petugas/addkegiatan_petugas', param);
});

router.get('/coba-map', isAuthorization,  (req, res) => {
    let param = {
        active: 'map',
        role: req.cookies.role,
        username: req.cookies.username
    }
    res.render('./pages/petugas/coba-map', param);
});

router.get('/home-guest', isAuthorization,  (req, res) => {
    res.render('./pages/guest/home_guest');
});

router.get('/kegiatan-guest', (req, res) => {
    let param = {
        active: 'kegiatan',
        role: req.cookies.role,
        username: req.cookies.username
    }
    res.render('./pages/guest/kegiatan_guest', param);
});

router.get('/berita-guest', (req, res) => {
    let param = {
        active: 'berita',
        role: req.cookies.role,
        username: req.cookies.username
    }
    res.render('./pages/guest/berita', param);
});

router.get('/kelola-lokasi', mapsController.kelolaLokasi);
router.get('/get-kecamatan',  administrasiController.getAllKecamatan); //get-kecamatan?kodeprov=12&kodekabkot=75&page=1
router.get('/get-desa',  administrasiController.getAllDesa); //get-desa?kodeprov=12&kodekabkot=75&kodekec=060&page=1
router.get('/get-geom-kecamatan', administrasiController.getKecamatanGeometri); //get-geom-kecamatan?kodeprov=12&kodekabkot=75&kodekec=050
router.get('/get-geom-desa',  administrasiController.getDesaGeometri); //get-geom-desa?kodeprov=12&kodekabkot=75&kodekec=060&kodedesa=007
router.post('/get-poi-region', getPoiRegion);

module.exports = router;