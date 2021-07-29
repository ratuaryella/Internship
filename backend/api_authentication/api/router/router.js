const express = require('express');
const router = express.Router();

const { getAllRole } = require('../controllers/roles');
const UserControllers = require('../controllers/users');
const { checkAuth } = require('../middleware/check-auth');

// Authorization
router.post('/login', UserControllers.doLogin);
router.get('/check-token', UserControllers.checkToken);
router.post('/logout', UserControllers.doLogout);

router.get('/get-roles', checkAuth, getAllRole);

router.post('/create-user', checkAuth, UserControllers.createUser);
router.get('/get-all-users', checkAuth, UserControllers.getAllUser);
router.patch('/edit-user', checkAuth, UserControllers.updateUser);
router.get('/detail-user', checkAuth, UserControllers.getDetailUser);
router.patch('/delete-user', checkAuth, UserControllers.deleteUser);

module.exports = router;