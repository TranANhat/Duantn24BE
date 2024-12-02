const express = require('express');
const hoadonController = require('../controllers/hoadonController');

const router = express.Router();

// Lấy danh sách hóa đơn
router.get('/hoadon', hoadonController.getHoadon);

// Tạo hóa đơn mới
router.post('/hoadon', hoadonController.createHoadon);

// Xóa hóa đơn
router.delete('/hoadon/:id', hoadonController.deleteHoaDon);

// Cập nhật trạng thái hóa đơn
router.put("/hoadon/:id/status", hoadonController.updateHoadonStatus);

router.get('/hoadon/search', hoadonController.searchHoadonByUsername);

// Lấy hóa đơn theo số điện thoại
router.get('/hoadon/check/:phone', hoadonController.PhoneHoadon);

// Thêm phản hồi vào hóa đơn
router.post('/feedback/:id', hoadonController.addFeedback);
// Xóa phản hồi theo ID hóa đơn
router.delete('/feedback/:id', hoadonController.deleteFeedbackById);

// Lấy phản hồi cho hóa đơn theo ID
router.get('/feedback/:id', hoadonController.getFeedbackByHoadonId);
// Lấy tất cả phản hồi
router.get('/feedback', hoadonController.getAllFeedback);



module.exports = router;
