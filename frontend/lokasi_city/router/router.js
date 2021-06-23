const express = require('express');
const router = express.Router();

const mapsController = require('../controllers/maps/maps');

router.get('/', (req, res) => {
    res.render('./pages/login/login');
});

router.get('/maps', mapsController.index);

module.exports = router;