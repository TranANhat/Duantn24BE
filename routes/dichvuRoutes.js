// routes/dichvuRoutes.js
const express = require('express');
const DichvuController = require('../controllers/dichvuController');
const router = express.Router();

// Lấy danh sách dịch vụ
router.get('/dichvu', DichvuController.getAllDichvu);
// Thêm dịch vụ
router.post('/dichvu', DichvuController.createDichvu);
// Xóa dịch vụ
router.delete('/dichvu/:id', DichvuController.deleteDichvu);
// Cập nhật dịch vụ
router.put('/dichvu/:id', DichvuController.updateDichvu);

module.exports = router;
