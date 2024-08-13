const Cards = require('../models/card');

module.exports.getCards = (req, res) => {
  Cards.find({})
  .populate(['user'])
  .then(cards => res.send({data: cards}))
  .catch(err => res.status(500).send({message: 'Error predeterminado'}))
};

module.exports.createCard = (req, res) => {
  const {name, link, userId} = req.body;
  Cards.create({name, link, owner: userId})
    .then(card => res.status(201).send({data: card}))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send ({message: 'Datos invalidos'});
      } else {res.status(500).send({message: 'Error del servidor'});
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndDelete(req.params.cardId)
  .orFail(() => {
    const error = new Error('Tarjeta no encontrada');
    error.statusCode = 404;
    throw error;
  })
  .then(card => res.send({message: 'Tarjeta eliminada'}))
  .catch(err =>  {
    if (err.statusCode === 404){
      res.status(404).send({message: 'Targena no encontrada'});
    } else {
      res.status(500).send({message: 'Error predeterminado'});
    }
  });
};

module.exports.likeCard = (req, res) => Cards.findByIdAndUpdate(
  req.params.cardId, { $addToSet: {likes: req.user._id}}, {new: true}
);

module.exports.dislikeCard = (req, res) => Cards.findByIdAndUpdate(
  req.params.cardId, {$pull: {likes: req.user._id}}, {new: true}
);