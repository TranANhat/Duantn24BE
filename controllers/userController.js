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
        if (err.code === 'ER_ROW_IS_REFERENCED_2') {
          return res.status(400).json({
            message: 'Không thể xóa người dùng này vì đang có hóa đơn liên kết với người dùng này.'
          });
        }
        return res.status(500).send(err);
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ message: 'User deleted successfully' });
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
  }
};

module.exports = UserController;
