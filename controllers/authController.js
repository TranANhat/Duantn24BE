const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/dnModel');
const Role = require('../models/roleModel');
const dotenv = require('dotenv'); // Import dotenv để đọc biến môi trường
dotenv.config(); // Nạp biến môi trường từ file .env

// Register user
exports.register = async (req, res) => {
    const { username, password, role_id } = req.body;
    console.log('Received data for registration:', { username, password, role_id }); // Thay role thành role_id

    try {
        // Kiểm tra nếu không có username hoặc password
        if (!username || !password || !role_id) {
            return res.status(400).json({
                error: 'Missing required fields',
                fields: { username, password, role_id }
            });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới
        User.create(username, hashedPassword, role_id, (err, result) => {
            if (err) {
                console.error('Error during user creation:', err); // Log lỗi chi tiết
                return res.status(500).json({ error: `Error registering user: ${err.message}` });  // Trả về thông báo lỗi chi tiết
            }
            res.status(201).send('User registered successfully');
        });
    } catch (error) {
        console.error('Error hashing password:', error); // Log lỗi khi hash mật khẩu
        res.status(500).json({ error: `Error registering user: ${error.message}` });  // Trả về thông báo lỗi chi tiết
    }
};


// Login user
exports.login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    User.findByUsername(username, async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).send('Username or password incorrect');
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send('Username or password incorrect');
        
        // Tạo JWT token
        const token = jwt.sign(
            { id: user.id, role: user.role_id },
            process.env.JWT_SECRET, // Sửa env thành process.env
            { expiresIn: '1h' }
        );

        res.json({ token, role: user.role_id });
    });
};

// Get all users
exports.getUsers = (req, res) => {
    User.findAll((err, users) => {
        if (err) {
            console.error('Error retrieving users:', err);
            return res.status(500).send('Error retrieving users');
        }
        res.json(users);
    });
};
