const express = require('express');
const router = express.Router();
const {getUsers, getUserById, createUser, updateUserProfile, updateUserAvatar} = require('../controllers/users');

//Crear usuario
router.post('/', createUser);

//Obtener un usuario por id
router.get ('/:id', getUserById);

//Obtener todos los usuarios
router.get ('/', getUsers);

//Actualizar usuario
router.patch('/users/me', updateUserProfile);

//Actualizar avatar
router.patch('/users/me/avatar', updateUserAvatar);


module.exports = router;