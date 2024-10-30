// routes/khuyenmaiRoutes.js
const express = require('express');
const KhuyenmaiController = require('../controllers/khuyenmaiController');
const router = express.Router();

// Lấy danh sách khuyến mãi
router.get('/khuyenmai', KhuyenmaiController.getAllKhuyenmai);

// Thêm khuyến mãi
router.post('/khuyenmai', KhuyenmaiController.createKhuyenmai);

// Xóa khuyến mãi
router.delete('/khuyenmai/:id', KhuyenmaiController.deleteKhuyenmai);

// Cập nhật khuyến mãi
router.put('/khuyenmai/:id', KhuyenmaiController.updateKhuyenmai);

module.exports = router;
