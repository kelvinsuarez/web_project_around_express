const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about:{
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar:{
    type: String,
    required: true,
    validate: {
      validator(v) {
        const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
        return urlRegex.test(v)
      },
      message: props => `${props.value} no es una URL válida!`
    }
  }
});

module.exports = mongoose.model('user', userSchema);