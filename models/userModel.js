// models/userModel.js
const db = require('../config/db');

const UserModel = {
  getAllUsers: (callback) => {
    const query = 'SELECT * FROM users';
    db.query(query, callback);
  },
  createUser: (user, callback) => {
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(query, [user.name, user.email], callback);
  },
};

module.exports = UserModel;
