const db = require('../config/db');

const Role = {
    // Tìm kiếm vai trò theo id
    findById: (id, callback) => {
        const query = 'SELECT * FROM roles WHERE id = ?';
        
        db.query(query, [id], (err, results) => {
            if (err) {
                console.error('Database error:', err);  // Log lỗi nếu có
                return callback(err, null);  // Trả lỗi về callback
            }

            // Kiểm tra xem có kết quả không
            if (results.length === 0) {
                return callback(new Error('Role not found'), null);  // Trả về lỗi nếu không có vai trò
            }

            return callback(null, results[0]);  // Trả về kết quả đầu tiên (nếu có)
        });
    }
};

module.exports = Role;
