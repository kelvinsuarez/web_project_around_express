const User = require('../models/user');

module.exporst.getUsers = (req, res) => {
  User.find({})
  .then(user => res.send({data: user}))
  .catch(err => res.status(500).send({message: 'Error'}))
}

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
  .then(user => res.send({data: user}))
  .catch(err => res.status(500).send({message: 'Error'}))
}

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body;
  User.create({name, about, avatar})
    .then(user => res.status(201).send({data: user}))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send ({message: 'Datos invalidos'});
      } else {res.status(500).send({message: 'Error del servidor'});
      }
    })
}