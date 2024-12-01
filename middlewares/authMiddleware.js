const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(403).send('Token is required');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }

        req.user = user;  // Lưu thông tin người dùng vào request
        next();  // Tiếp tục đến các handler tiếp theo
    });
};
