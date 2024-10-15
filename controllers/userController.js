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
    const user = { name: req.body.name, email: req.body.email, phone: req.body.phone, diachia: req.body.diachia };
    UserModel.createUser(user, (err, results) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'User created successfully', userId: results.insertId });
    });
  },
  deleteUser: (req, res) => {
    const userID = req.params.id
    UserModel.deleteUse(userID, (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted uccessfully' });
    })
  },
  updateUser: (req, res) => {
    const userID = req.params.id
    const user = { name: req.body.name, email: req.body.email, phone: req.body.phone, diachia: req.body.diachia };
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
