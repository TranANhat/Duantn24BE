// controllers/userController.js
const UserModel = require('../models/userModel');

const UserController = {
  getAllUsers: (req, res) => {
    UserModel.getAllUsers((err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
  },
  createUser: (req, res) => {
    const user = { username: req.body.username, email: req.body.email, phone: req.body.phone, diaChi: req.body.diaChi };
    UserModel.createUser(user, (err, results) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'User created successfully', userId: results.insertId });
    });
  },

  deleteUser: (req, res) => {
    const userID = req.params.id;


    UserModel.deleteUser(userID, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (results.affectedRows === 0) {

        return res.status(404).json({ message: 'Người dùng không tồn tại' });
      }


      res.json({ message: 'Người dùng đã được xóa thành công' });
    });
  },

  updateUser: (req, res) => {
    const userID = req.params.id
    const user = { username: req.body.username, email: req.body.email, phone: req.body.phone, diaChi: req.body.diaChi };
    UserModel.updateUser(userID, user, (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User updated uccessfully' });
    })
  },

  searchKhachHang: (req, res) => {
    const phone = req.query.phone || req.body.number;

    if (!phone) {
      return res.status(400).json({ message: 'Số điện thoại không được cung cấp' });
    }

    UserModel.searchKhachHang(phone, (err, results) => {
      if (err) {
        console.error('Chi tiết lỗi:', err.sqlMessage || err.message || err);
        res.status(500).json({
          error: 'Lỗi khi tìm kiếm khách hàng theo SĐT',
          details: err.sqlMessage || err.message || err
        });
      } else {
        if (results.length === 0) {
          return res.status(404).json({ message: 'Không tìm thấy khách hàng với số điện thoại này' });
        }
        res.json(results);
      }
    });
  }

  //---------------------

};

module.exports = UserController;
