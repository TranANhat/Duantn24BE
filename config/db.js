const mysql = require('mysql2');

// Tạo kết nối đến MySQL
const connection = mysql.createConnection({
  host: 'localhost',       // Địa chỉ máy chủ (localhost cho máy cục bộ)
  user: 'root',            // Tên người dùng MySQL
  password: 'root', // Mật khẩu của người dùng
  database: 'duantn'   // Tên cơ sở dữ liệu bạn đã tạo
});

// Kết nối đến MySQL
connection.connect((err) => {
  if (err) {
    console.error('Không thể kết nối MySQL:', err.stack);
    return;
  }
  console.log('Kết nối MySQL thành công');
});

module.exports = connection; // Xuất kết nối để sử dụng trong các file khác
