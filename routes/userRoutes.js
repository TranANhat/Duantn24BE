// routes/userRoutes.js
const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();
// lấy khách hàng
router.get('/users', UserController.getAllUsers);
// thêm kahachs hàng
router.post('/users', UserController.createUser);
// xóa khách  hàng
router.delete('users/:id', UserController.deleteUser);
// cập nhật khách hàng 
router.put('/users/:id', UserController.updateUser);

module.exports = router;
