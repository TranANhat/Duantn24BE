const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./config/db'); // Nhập file cấu hình kết nối
const userRouters = require('./routes/userRoutes');

app.use(express.json())
app.use('/api/user', userRouters)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
