const express = require('express');
const router = express.Router();

const KegiatanController = require('../controllers/kegiatan');
const TatananController = require('../controllers/tatanan');
const KegiatanService = require('../services/kegiatan');

const { checkAuth } = require('../middleware/check-auth');

router.get('/welcome', checkAuth, (req, res) => {
    res.status(200).json({
        message: 'Sample endpoint With Check Auth'
    })
})

router.post('/create-kegiatan', checkAuth, KegiatanController.uploadImg.single("gambar"), KegiatanController.createKegiatan);
router.get('/get-all-kegiatan', checkAuth, KegiatanController.getKegiatan);
router.get('/get-full-kegiatan', checkAuth, KegiatanController.getAllKegiatan);
router.get('/get-kegiatan', checkAuth, KegiatanController.getKegiatanById);
router.get('/kegiatan', KegiatanController.downloadFiles)
router.patch('/delete-kegiatan', checkAuth, KegiatanController.deleteKegiatan);
router.patch('/update-kegiatan', checkAuth, KegiatanController.updateKegiatan);

router.post('/create-tatanan', checkAuth, TatananController.createTatanan);
router.get('/get-all-tatanan', checkAuth, TatananController.getTatanan);
router.get('/get-full-tatanan', checkAuth, TatananController.getAllTatanan);
router.get('/get-tatanan-nama', checkAuth, TatananController.getNamaTatanan);
router.get('/get-tatanan-nama-jenis', checkAuth, TatananController.getNamaJenisTatanan);
router.get('/get-tatanan-nama-jenis-kategori', checkAuth, TatananController.getNamaJenisKategori);
router.get('/get-tatanan-nama-jenis-kategori-indikator', checkAuth, TatananController.getNamaJenisKategoriIndikator);
router.get('/get-tatanan', checkAuth, TatananController.getTatananById);
router.patch('/update-tatanan', checkAuth, TatananController.updateTatanan);
router.patch('/delete-tatanan', checkAuth, TatananController.deleteTatanan);

router.get('/get-id-tatanan', KegiatanService.createKegiatan);

module.exports = router;