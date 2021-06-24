const express = require('express');
const router = express.Router();

const { checkAuth } = require('../middleware/check-auth');

router.get('/welcome', checkAuth, (req, res) => {
    res.status(200).json({
        message: 'Sample endpoint With Check Auth'
    })
})

module.exports = router;