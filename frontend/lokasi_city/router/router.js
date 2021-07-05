const express = require('express');
const router = express.Router();

const mapsController = require('../controllers/maps/maps');

router.get('/', (req, res) => {
    res.render('./pages/login/login');
});

router.get('/home', (req, res) => {
    res.render('./pages/admin/home');
});

router.get('/data-user', (req, res) => {
    res.render('./pages/admin/datauser');
});
router.get('/tatanan', (req, res) => {
    res.render('./pages/admin/tatanan');
});
router.get('/kelola-lokasi', (req, res) => {
    res.render('./pages/admin/lokasi');
});
router.get('/kegiatan-petugas', (req, res) => {
    res.render('./pages/admin/petugaskegiatan');
});
router.get('/kegiatan-umum', (req, res) => {
    res.render('./pages/admin/umumkegiatan');
});

router.get('/home-petugas', (req, res) => {
    res.render('./pages/petugas/home_petugas');
});

router.get('/berita-petugas', (req, res) => {
    res.render('./pages/petugas/berita_petugas');
});
router.get('/maps', mapsController.index);

module.exports = router;