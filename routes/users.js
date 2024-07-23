const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// obtener todos los usuarios
router.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '../data/users.json'), 'utf8',(err, data) => {
    if (err) {
      return res.status(500).json({message: 'Error al leer el archivo de usuario'});
    }
    const users = JSON.parse(data);
    res.json(users);
  });
});

// usuarios por ID
router.get('/:id', (req, res) => {
  fs.readFile(path.join(__dirname, '../data/users.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({message: 'Error al leer el archivo de usuarios'});
    }
    const users = JSON.parse(data);
    const user = users.find(u => u._id === req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({message: "ID de usuario no encontrado"});
    }
  });
});

module.exports = router;