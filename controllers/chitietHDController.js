const chitiethdModel = require("../models/chitiethdModel");

const ChiTietHoaDon = {
    getCTHD: (req, res) => {
        chitiethdModel.getAllCTHD((err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        });
    },
    getCTHDID: (req, res) => {
        const hoaDon_id = req.params.id; // Lấy ID từ URL
        chitiethdModel.getCTHDById(hoaDon_id, (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.length === 0) return res.status(404).json({ message: 'Hóa đơn không tìm thấy' });
            res.json(results);
        });
    },
    // checkPhone: (req, res) => {
    //     const phone = req.params.phone; // Lấy số điện thoại từ URL

    //     // Gọi hàm checkPhone từ model
    //     chitiethdModel.checkPhone(phone, (err, results) => { 
    //         if (err) {
    //             console.error('Lỗi kiểm tra số điện thoại:', err);
    //             return res.status(500).json({ message: 'Đã xảy ra lỗi khi kiểm tra số điện thoại.' });
    //         }

    //         if (results.length === 0) {
    //             return res.status(404).json({ message: 'Không tìm thấy hóa đơn nào liên quan đến số điện thoại này.' });
    //         }

    //         // Trả về kết quả
    //         res.status(200).json({
    //             message: 'Thông tin chi tiết hóa đơn liên quan đến số điện thoại.',
    //             data: results
    //         });
    //     });
    // },
};

module.exports = ChiTietHoaDon;
