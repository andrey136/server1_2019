const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set app express
const app = express();

app.use((req, res, next) => {
  // eslint-disable-line consistent-return
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// req.body
app.use(bodyParser.json());

app.use('/api', require('./routes/api'));
app.use(bodyParser.urlencoded({extended: false}));

// public html page of server
app.use(express.static('public'));

// connect to mongodb
mongoose.connect('mongodb+srv://andrey:tripleks@cluster0-sys07.mongodb.net/andrey');
mongoose.Promise = global.Promise;

app.listen(process.env.PORT || 5000, () => console.log('SERVER WORKS!!!'));
