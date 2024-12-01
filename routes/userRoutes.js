// routes/userRoutes.js
const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

router.get('/users', UserController.getAllUsers);

router.post('/users', UserController.createUser);

router.delete('/users/:id', UserController.deleteUser);

router.put('/users/:id', UserController.updateUser);



module.exports = router;
