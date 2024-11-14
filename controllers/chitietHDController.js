const chitiethdModel = require("../models/chitiethdModel")

const ChiTietHoaDon = {
    getCTHD: (req, res) => {
        chitiethdModel.getAllCTHD((err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        });
    },
    getCTHDID: (req, res) => {
        const hoaDon_id = req.params.id;
        chitiethdModel.getCTHDById(hoaDon_id, (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.length === 0) return res.status(404).json({ message: 'Hóa đơn không tìm thấy' });
            res.json(results);
        });
    }
}
module.exports = ChiTietHoaDon