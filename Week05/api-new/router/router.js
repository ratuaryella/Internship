const express = require('express');
const router = express.Router();
const userController = require('../controllers/table_users');

// Get All
router.get('/api/all', userController.getAll);

router.get('/api/get-by-id', userController.getById);

// Create
router.post('/api/create-user', userController.createUser);

// Update
router.patch('/api/update-user', userController.updateUser);

// Delete
router.patch('/api/delete-user', userController.deleteUser);

module.exports = router