const express = require('express');
const hoadonController = require('../controllers/hoadonController');
const router = express.Router();

router.get('/hoadon', hoadonController.getHoadon)
router.post('/hoadon', hoadonController.createHoadon)
router.delete('/hoadon/:id', hoadonController.deleteHoaDon)

module.exports = router;