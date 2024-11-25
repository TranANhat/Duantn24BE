const express = require('express');
const ChiTietHoaDon = require('../controllers/chitietHDController');

const router = express.Router();

// Lấy tất cả chi tiết hóa đơn
router.get('/chitiethd', ChiTietHoaDon.getCTHD);

// Lấy chi tiết hóa đơn theo ID
router.get('/chitiethd/:id', ChiTietHoaDon.getCTHDID);

// Kiểm tra hóa đơn theo số điện thoại
// router.get('/chitiethd/check/:phone', ChiTietHoaDon.checkPhone);

module.exports = router;
