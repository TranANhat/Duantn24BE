const db = require("../config/db")

const hoadonModel = {
    getHoadon: (callback) => {
        const query = ` SELECT hoadon.*, khachhang.username AS tenKhachHang
        FROM hoadon
        JOIN khachhang ON hoadon.khachhang_id = khachhang.id`;
        db.query(query, callback);
    },
    createHoadon: (khachhang_id, phuongThucThanhToan, callback) => {
        const query = `INSERT INTO hoadon (khachhang_id, created_at, tongTien, phuongThucThanhToan, trangThai) 
        VALUES (?, NOW(), 0, ?, 'Đang chờ xác nhận')`
        db.query(query, [khachhang_id, phuongThucThanhToan], callback)
    },
    deleteHoaDon: (hoadonId, callback) => {
        const deletecthd = `DELETE FROM chitiethoadon WHERE hoaDon_id = ?`;
        db.query(deletecthd, [hoadonId], (err, result) => {
            if (err) return callback(err)

            const deletehoadon = `DELETE FROM hoadon WHERE id = ?`;
            db.query(deletehoadon, [hoadonId], (err, result) => {
                if (err) return callback(err)
                callback(null, result);
            })
        })
    },
    updateHoadonStatus: (hoadonId, trangThai, callback) => {
        const query = `UPDATE hoadon SET trangThai = ? WHERE id = ?`;
        db.query(query, [trangThai, hoadonId], callback);
    }


}

module.exports = hoadonModel;