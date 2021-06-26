const express = require('express');
const router = express.Router();

const mapsController = require('../controllers/maps/maps');

router.get('/', (req, res) => {
    res.render('./pages/login/login');
});

router.get('/home', (req, res) => {
    res.render('./pages/home/home');
});

router.get('/data-user', (req, res) => {
    res.render('./pages/datauser/datauser');
});
router.get('/tatanan', (req, res) => {
    res.render('./pages/tatanan/tatanan');
});
router.get('/kelola-lokasi', (req, res) => {
    res.render('./pages/kelola_lokasi/lokasi');
});
router.get('/kegiatan-petugas', (req, res) => {
    res.render('./pages/kegiatan/petugaskegiatan');
});
router.get('/kegiatan-umum', (req, res) => {
    res.render('./pages/kegiatan/umumkegiatan');
});
router.get('/maps', mapsController.index);

module.exports = router;