const express = require('express');
const router = express.Router();

const KegiatanController = require('../controllers/kegiatan');
const TatananController = require('../controllers/tatanan')

const { checkAuth } = require('../middleware/check-auth');

router.get('/welcome', checkAuth, (req, res) => {
    res.status(200).json({
        message: 'Sample endpoint With Check Auth'
    })
})

router.post('/create-kegiatan', checkAuth, KegiatanController.createKegiatan);
router.get('/get-all-kegiatan', checkAuth, KegiatanController.getKegiatan);
router.get('/get-kegiatan', checkAuth, KegiatanController.getKegiatanById);
router.patch('/delete-kegiatan', checkAuth, KegiatanController.deleteKegiatan);
router.patch('/update-kegiatan', checkAuth, KegiatanController.updateKegiatan);

router.post('/create-tatanan', checkAuth, TatananController.createTatanan);
router.get('/get-all-tatanan', checkAuth, TatananController.getTatanan);
router.get('/get-tatanan', checkAuth, TatananController.getTatananById);
router.patch('/update-tatanan', checkAuth, TatananController.updateTatanan);
router.patch('/delete-tatanan', checkAuth, TatananController.deleteTatanan);

module.exports = router;