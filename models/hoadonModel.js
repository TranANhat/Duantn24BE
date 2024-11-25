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
    },
    getHoadonById: (hoadonId, callback) => {
        const query = `
            
            FROM 
                hoadon
            WHERE 
                hoadon.id = ?;
        `;
        db.query(query, [hoadonId], (err, results) => {
            if (err) {
                console.error('Lỗi khi lấy hóa đơn:', err);
                callback(err, null); // Gửi lỗi về callback
            } else {
                if (results.length === 0) {
                    // Nếu không có hóa đơn
                    callback(null, null);
                } else {
                    callback(null, results[0]); // Trả về hóa đơn đầu tiên
                }
            }
        });
    },
    PhoneHoadon: (phone, callback) => {
        const query = `
        SELECT 
            hoadon.id AS hoadonId,
            hoadon.tongTien,
            hoadon.phuongThucThanhToan,
            hoadon.trangThai,
            khachhang.username AS tenKhachHang
        FROM 
            hoadon
        JOIN 
            khachhang ON hoadon.khachhang_id = khachhang.id
        WHERE 
            khachhang.phone = ?;
    `;

        db.query(query, [phone], (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn checkPhone:', err);
                callback(err, null); // Gửi lỗi về cho callback
            } else {
                callback(null, results); // Gửi kết quả về cho callback
            }
        });
    },
    createFeedback: (hoadonId, comment, created_at, callback) => {
        const query = `
      INSERT INTO feedback (hoadon_id, comment, created_at)
      VALUES (?, ?, NOW())
    `;
        db.query(query, [hoadonId, comment, hoadonId, created_at], callback);
    },
}

module.exports = hoadonModel;