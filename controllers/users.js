const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
  .then(user => res.send({data: user}))
  .catch(err => res.status(500).send({message: 'Error predeterminado.'}))
}

module.exports.getUserById = (req, res) => {
  User.findById(req.params._id)
  .orFail(() => {
    const error = new Error('No se ha encontrado ningun usuario con esa id');
    error.statusCode = 404;
    throw error;
  })
  .then(user => res.send({data: user}))
  .catch(err => {
    if(err.statusCode === 404){
      res.status(404).send({message: 'Usuario no encontrado'})
    } else {
      res.status(500).send({message: 'Error predeterminado'})
    }
  });
};

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body;
  User.create({name, about, avatar})
    .then(user => res.status(201).send({data: user}))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send ({message: 'Se pasaron datos inválidos a los métodos para crear un usuario/tarjeta o para actualizar el avatar/perfil de un usuario.'});
      } else {res.status(500).send({message: 'Error predeterminado.'});
      }
    });
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about} = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId, {name, about}, {new: true, runValidators: true}
  )
  .orFail(() => {
    const error = new Error('No se ha encontrado ningun usuario con esa id');
    error.statusCode = 404;
    throw error;
  })
  .then(user => res.send({data: user}))
  .catch(err => {
    if(err.statusCode === 404){
      res.status(404).send({message: 'Usuario no encontrado'})
    } else {
      res.status(500).send({message: 'Error predeterminado'})
    }
  });
};

module.exports.updateUserAvatar = (req, res) => {
  const {avatar} = req.body;
  const userId = req.user._id;

  User.findOneAndUpdate(
    userId, {avatar}, {new: true, runValidators: true}
  )
  .orFail(() => {
    const error = new Error('No se ha encontrado ningun usuario con esa id');
    error.statusCode = 404;
    throw error;
  })
  .then(user => res.send({data: user}))
  .catch(err => {
    if(err.statusCode === 404){
      res.status(404).send({message: 'Usuario no encontrado'})
    } else {
      res.status(500).send({message: 'Error predeterminado'})
    }
  });
};

module.exports