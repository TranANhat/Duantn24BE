const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Sử dụng đường dẫn đến thư mục gốc của dự án
const uploadsDir = path.join(__dirname, '../uploads');

// Kiểm tra và tạo thư mục uploads nếu không tồn tại
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Đường dẫn đến thư mục uploads ở thư mục gốc
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
