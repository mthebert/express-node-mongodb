const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

if (process.env.ENV === 'Test') {
  console.log('THIS IS A TEST');
  const db = mongoose.connect('mongodb://localhost/bookAPI-test');
} else {
  console.log('THIS IS REAL');
  const db = mongoose.connect('mongodb://localhost/bookAPI');
}

const port = process.env.PORT || 4000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);
      
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome to the API');
});

app.server = app.listen(port, () => {
  console.log(`running on port: ${port}`);
});

module.exports = app;
