const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db'); // Nhập file cấu hình kết nối

app.get('/', (req, res) => {
  db.query('SELECT * FROM your_table_tables', (err, results) => { // Thay 'your_table_name' bằng tên bảng của bạn
    if (err) {
      return res.status(500).send('Lỗi khi truy vấn cơ sở dữ liệu');
    }
    res.send(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
