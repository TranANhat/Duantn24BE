const express = require('express');
const router = express.Router();
const khuyenmaiController = require('../controllers/khuyenmaiController');

// Lấy tất cả mã khuyến mãi
router.get('/khuyenmaii', khuyenmaiController.getAllKhuyenMai);

// Tạo mới mã khuyến mãi
router.post('/khuyenmaii', khuyenmaiController.createKhuyenMai);

// Cập nhật mã khuyến mãi
router.put('/khuyenmaii/:id', khuyenmaiController.updateKhuyenMai);

// Xóa mã khuyến mãi
router.delete('/khuyenmaii/:id', khuyenmaiController.deleteKhuyenMai);

// Áp dụng mã khuyến mãi vào hóa đơn        
router.post('/apply', khuyenmaiController.applyKhuyenMai);

router.get('/khuyenmaii/:sale', khuyenmaiController.checkKhuyenMai);


module.exports = router;