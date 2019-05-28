const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');
const CONFIG = require('config');

// CONFIG START

// process.env.NODE_ENV = 'development';
process.env.NODE_ENV = 'production'

const dbconnect = CONFIG.get('DB');
const db = mongoose.connect(dbconnect);
const port = process.env.PORT || CONFIG.get('PORT');
const host = CONFIG.get('HOST');

// CONFIG END

const app = express();

const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);
      
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome to the API');
});

app.server = app.listen(port, host, () => {
  console.log(`running in: ${process.env.NODE_ENV}`);
  console.log(`running on ${host}:${port}`);
});

module.exports = app;
