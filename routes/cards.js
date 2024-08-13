const express = require('express');
const router = express.Router();
const {getCards, createCard, deleteCard, likeCard, dislikeCard} = require("../controllers/cards")

// Obtener todas las tarjetas
router.get('/', getCards);

// Crear targetas
router.post('/', createCard);

// Borrar targetas
router.delete('/cards/:cardId', deleteCard);

// Dar like
router.put('/cards/:cardId/likes', likeCard);

// quitar like
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports =router;