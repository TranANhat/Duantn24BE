// models/userModel.js
const db = require('../config/db');

const UserModel = {
  getAllUsers: (callback) => {
    const query = 'SELECT * FROM khachhang';
    db.query(query, callback);
  },
  createUser: (user, callback) => {
    const query = 'INSERT INTO khachhang (name, email , phone, diachia) VALUES (?, ? ,? ,?)';
    db.query(query, [user.name, user.email, user.phone, user.diachi], callback);
  },
  deleteUser: (id, callback) => {
    const query = 'DELETE FROM users WHERE id= ?';
    db.query(query, [id], callback);
  },
  updateUser: (id, user, callback) => {
    const query = 'UPDATE khachang  set name=?  , email=? , phone=? , diachia=? WHERE id= ?';
    db.query(query, [id, user.name, user.email, user.phone, user.diachi], callback);
  },
};

module.exports = UserModel;
