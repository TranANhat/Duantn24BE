const express = require('express');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 3000;


const db = require('./config/db'); // Nhập file cấu hình kết nối
const userRouters = require('./routes/userRoutes');
const hoadonRouters = require('./routes/hoadonRoutes');
const dichvuRouters = require('./routes/dichvuRoutes');
const chitiethd = require('./routes/chitiethdRoutes');
const khuyenmai = require('./routes/khuyenmaiRoutes');

app.use(cors());
app.use('/uploads', express.static('uploads'))


app.use(express.json())
app.use('/api/user', userRouters)
app.use('/api/cthd', chitiethd)
app.use('/api/hd', hoadonRouters)
app.use('/api/dv', dichvuRouters)
app.use('/api/km', khuyenmai)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
