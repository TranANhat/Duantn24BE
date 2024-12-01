const db = require('../config/db'); // Kết nối đến cơ sở dữ liệu MySQL

const User = {
    // Tạo người dùng mới
    create: (username, password, role_id, callback) => {
        console.log('Creating user:', username, role_id);  // Log đầu vào

        // Truy vấn để tạo người dùng mới
        const query = 'INSERT INTO dangnhap (username, password, role_id) VALUES (?, ?, ?)';
        db.query(query, [username, password, role_id], (err, result) => {
            if (err) {
                console.error('Error inserting user:', err); // Log lỗi khi chèn người dùng
                return callback(err);  // Trả về lỗi
            }
            callback(null, result);  // Trả về kết quả nếu thành công
        });
    },

    // Tìm người dùng theo tên người dùng
    findByUsername: (username, callback) => {
        console.log('Finding user by username:', username);  // Log tìm kiếm

        // Truy vấn để tìm người dùng theo username
        const query = 'SELECT * FROM dangnhap WHERE username = ?';
        db.query(query, [username], (err, results) => {
            if (err) {
                console.error('Error finding user by username:', err); // Log lỗi khi tìm người dùng
                return callback(err);  // Trả về lỗi
            }
            callback(null, results);  // Trả về kết quả tìm kiếm
        });
    },

    // Lấy tất cả người dùng
    findAll: (callback) => {
        console.log('Fetching all users');  // Log lấy tất cả người dùng

        // Truy vấn để lấy tất cả người dùng
        const query = 'SELECT * FROM dangnhap';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error retrieving users:', err);  // Log lỗi khi lấy danh sách người dùng
                return callback(err);  // Trả về lỗi
            }
            callback(null, results);  // Trả về danh sách người dùng
        });
    }
};

module.exports = User;
