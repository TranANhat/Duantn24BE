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
    const user = { name: req.body.name, email: req.body.email };
    UserModel.createUser(user, (err, results) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'User created successfully', userId: results.insertId });
    });
  },
};

module.exports = UserController;
