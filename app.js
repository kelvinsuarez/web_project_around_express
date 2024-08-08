const express = require('express');
const mongoose = require('mongoose');
const {PORT = 3000} = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb', {
useNewUrlParser: true,
useCreateIndex: true,
useFindAndModify: false
});

app.use(express.json());

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).json({message:'Recurso no encontrado'})
})

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`)
});

