
const db = require('../config/db');

const chitiethdModel = {

    getAllCTHD: (callback) => {
        const query = `  SELECT 
        chitiethoadon.*, 
        khachhang.username AS tenKhachHang, 
        khachhang.phone AS soDienThoai, 
        khachhang.email AS email
    FROM 
        chitiethoadon
    JOIN 
        hoadon ON chitiethoadon.hoaDon_id = hoadon.id
    JOIN 
        khachhang ON hoadon.khachhang_id = khachhang.id `
        db.query(query, callback)
    },
    createCTHD: (hoaDon_id, dichVu_id, soLuong = 1, callback) => {
        const query = `
            INSERT INTO chitiethoadon (hoaDon_id, dichVu_id, soLuong, thanhTien, donGia) 
            VALUES (?, ?, ?, 
                (SELECT gia FROM dichvu WHERE id = ?) * ?, 
                (SELECT gia FROM dichvu WHERE id = ?)
            );
        `;

        db.query(query, [hoaDon_id, dichVu_id, soLuong, dichVu_id, soLuong, dichVu_id], callback);
    },

    getCTHDById: (req, res) => {
        const hoaDon_id = req.params.id;  // Lấy ID hóa đơn từ tham số URL
        chitiethdModel.getCTHDById(hoaDon_id, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Hóa đơn không tìm thấy' });
            }
            res.json(results);
        });
    },



}

module.exports = chitiethdModel