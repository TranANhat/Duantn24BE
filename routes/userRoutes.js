// routes/userRoutes.js
const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();
// lấy khách hàng
router.get('/users', UserController.getAllUsers);
// thêm kahachs hàng
router.post('/users', UserController.createUser);

router.delete('users/:id', UserController.deleteUser);

router.put('/users/:id', UserController.updateUser);

module.exports = router;
