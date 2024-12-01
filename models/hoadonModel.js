const db = require("../config/db")

const hoadonModel = {
    getHoadon: (callback) => {
        const query = ` SELECT hoadon.*, khachhang.username AS tenKhachHang
        FROM hoadon
        JOIN khachhang ON hoadon.khachhang_id = khachhang.id`;
        db.query(query, callback);
    },
    createHoadon: (khachhang_id, phuongThucThanhToan, ngayHen, tongTien, callback) => {
        const query = `INSERT INTO hoadon (khachhang_id, created_at, tongTien, phuongThucThanhToan, trangThai, ngayHen) 
        VALUES (?, NOW(), ?, ?, 'Đang chờ xác nhận', ?)`
        db.query(query, [khachhang_id, tongTien, phuongThucThanhToan, ngayHen], callback)
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
        SELECT * 
        FROM hoadon
        WHERE id = ?;
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
    getFeedbackByHoadonId: (hoadonId, callback) => {
        const query = `
            SELECT id, hoadon_id, comment, created_at
            FROM feedback
            WHERE hoadon_id = ?
            ORDER BY created_at DESC
            LIMIT 1
        `;
        db.query(query, [hoadonId], callback);
    },

    getAllFeedback: (callback) => {
        const query = `
    SELECT 
        feedback.id AS feedback_id,
        hoadon.id AS hoadon_id,
        khachhang.username AS ten_khachhang,
        feedback.comment,
        DATE(feedback.created_at) AS created_at,  
        dichvu.tenDichVu AS ten_dichvu          
    FROM 
    feedback
    JOIN 
        hoadon ON feedback.hoadon_id = hoadon.id
    JOIN 
        khachhang ON hoadon.khachhang_id = khachhang.id
    JOIN 
        chitiethoadon ON hoadon.id = chitiethoadon.hoaDon_id 
    JOIN
        dichvu ON chitiethoadon.dichVu_id = dichvu.id  
    WHERE 
        feedback.created_at IS NOT NULL
    ORDER BY 
        feedback.created_at DESC; 


        `;
        db.query(query, (err, result) => {
            if (err) {
                console.error('Lỗi khi thực hiện truy vấn:', err);
                callback(err, null);
            } else {
                console.log('Kết quả truy vấn:', result);
                callback(null, result);
            }
        });
    },
    deleteFeedback: (id, callback) => {
        const query = 'DELETE FROM feedback WHERE id = ?';
        db.query(query, [id], callback);
    },





}

module.exports = hoadonModel;