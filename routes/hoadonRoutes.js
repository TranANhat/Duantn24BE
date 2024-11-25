const express = require('express');
const hoadonController = require('../controllers/hoadonController');

const router = express.Router();

router.get('/hoadon', hoadonController.getHoadon);

router.post('/hoadon', hoadonController.createHoadon);

router.delete('/hoadon/:id', hoadonController.deleteHoaDon);

// router.get('/hoadon/:id', hoadonController.getHoadonById);

router.put("/hoadon/:id/status", hoadonController.updateHoadonStatus);

router.get('/hoadon/check/:phone', hoadonController.PhoneHoadon);


// Route: Feedback
// routes.js

router.post('/hoadon/:id', hoadonController.addFeedback);

module.exports = router;