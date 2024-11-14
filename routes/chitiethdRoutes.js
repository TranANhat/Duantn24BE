
const express = require('express');
const ChiTietHoaDon = require('../controllers/chitietHDController');

const router = express.Router();

router.get('/chitiethd', ChiTietHoaDon.getCTHD)
router.get('/chitiethd/:id', ChiTietHoaDon.getCTHDID);

module.exports = router