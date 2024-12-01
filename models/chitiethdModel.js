
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
            khachhang ON hoadon.khachhang_id = khachhang.id `;
        db.query(query, callback);
      },
      createCTHD: (hoaDon_id, dichVu_id, soLuong = 1, thanhTien, callback) => {
        console.log(hoaDon_id, dichVu_id, soLuong, thanhTien);
    
        const query = `
                INSERT INTO chitiethoadon (hoaDon_id, dichVu_id, soLuong, thanhTien, donGia) 
                VALUES (?, ?, ?, ?, ?);
            `;
    
        db.query(query, [hoaDon_id, dichVu_id, soLuong, thanhTien, thanhTien], callback);
      },

    getCTHDById: (id, callback) => {
        const query = `      SELECT 
        chitiethoadon.*, 
        khachhang.username AS tenKhachHang, 
        khachhang.phone AS soDienThoai, 
        khachhang.email AS email,
        dichvu.tenDichVu AS DichVu
    FROM 
        chitiethoadon
    JOIN 
        hoadon ON chitiethoadon.hoaDon_id = hoadon.id
    JOIN 
        khachhang ON hoadon.khachhang_id = khachhang.id 
	JOIN
		dichvu ON chitiethoadon.dichVu_id = dichvu.id
        where chitiethoadon.hoaDon_id = ?;`; // Query SQL theo ID
        db.query(query, [id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },
    // checkPhone: (phone, callback) => {
    //     const query = `
    //         SELECT 
    //             chitiethoadon.*, 
    //             hoadon.created_at AS ngayTaoHoaDon, 
    //             khachhang.username AS tenKhachHang, 
    //             khachhang.phone AS soDienThoai, 
    //             khachhang.email AS email,
    //             dichvu.tenDichVu AS DichVu
    //         FROM 
    //             chitiethoadon
    //         JOIN 
    //             hoadon ON chitiethoadon.hoaDon_id = hoadon.id
    //         JOIN 
    //             khachhang ON hoadon.khachhang_id = khachhang.id
    //         JOIN
	// 	        dichvu ON chitiethoadon.dichVu_id = dichvu.id
    //         WHERE 
    //             khachhang.phone = ?;
    //     `;

    //     db.query(query, [phone], (err, results) => {
    //         if (err) {
    //             console.error('Lỗi truy vấn checkPhone:', err);
    //             callback(err, null); // Gửi lỗi về cho callback
    //         } else {
    //             callback(null, results); // Gửi kết quả về cho callback
    //         }
    //     });
    // },

    

}

module.exports = chitiethdModel;