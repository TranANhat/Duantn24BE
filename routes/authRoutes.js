const express = require('express');
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');  // Đảm bảo đường dẫn chính xác
const router = express.Router();

// Route đăng ký người dùng
router.post('/register', authController.register);

// Route đăng nhập người dùng
router.post('/login', authController.login);

// Route lấy danh sách tất cả người dùng (cần token xác thực)
router.get('/user', authenticateToken, authController.getUsers);

module.exports = router;


