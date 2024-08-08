const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
        return urlRegex.text(v)
      },
      message: props => `${props.value} no es una URL válida!`
    },
  },
  owner: {
    type: [Schema.Types.ObjectId],
    ref: 'user',
    require: true
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'user',
    default: []
  },
  createAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('card', cardSchema)