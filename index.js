const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/db');
const account = require('./routes/account');

const app = express();

const port = 3000;

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log("База даних успішно підключена!");
});

mongoose.connection.on('error', (err) => {
  console.log("База даних не було підключено: " + err);
});

app.get('/', (req, res) => {
  res.send('Головна сторінка!!!');
});

app.use('/account', account);

app.listen(port, () => {
  console.log("Сервер запущено на порті " + port);
});
