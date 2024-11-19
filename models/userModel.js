// models/userModel.js
const db = require('../config/db');

const UserModel = {
  getAllUsers: (callback) => {
    const query = 'SELECT * FROM khachhang';
    db.query(query, callback);
  },
  createUser: (user, callback) => {
    const query = 'INSERT INTO khachhang (username, email , phone, diaChi) VALUES (?, ? ,? ,?)';
    db.query(query, [user.username, user.email, user.phone, user.diaChi], callback);
  },

  checkPhone: (phone, callback) => {
    const query = ' SELECT * FROM khachhang WHERE phone=?';
    db.query(query, [phone], callback)
  },
  deleteUser: (id, callback) => {
    const query = 'DELETE FROM khachhang WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Lỗi khi xóa người dùng:', err);
        return callback(err);
      }
      callback(null, results);
    });
  },
  updateUser: (id, user, callback) => {
    const query = 'UPDATE khachang  set username=?  , email=? , phone=? , diaChi=? WHERE id= ?';
    db.query(query, [id, user.username, user.email, user.phone, user.diaChi], callback);
  },
};

module.exports = UserModel;
