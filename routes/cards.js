const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Obtener todas las tarjetas
router.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '../data/cards.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({message: 'Error al leer el archivo de cartas'});
    }
    const cards = JSON.parse(data);
    res.json(cards)
  });
});

module.exports =router;