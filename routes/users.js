const express = require('express');
const router = express.Router();
const {getUsers, getUserById, createUser} = require('../controllers/users');

//crear usuario
router.post('/', createUser)

//obtiene un usuario por id
router.get ('/:id', getUserById)

//obtiene todos los usuarios
router.get ('/', getUsers)


module.exports = router;