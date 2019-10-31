const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set app express
const app = express();

// req.body
app.use(bodyParser.json());

app.use('/api', require('./routes/api'));
app.use(bodyParser.urlencoded({extended: false}));

// public html page of server
app.use(express.static('public'));

// connect to mongodb
mongoose.connect('mongodb+srv://andrey:tripleks@cluster0-sys07.mongodb.net/andrey');
mongoose.Promise = global.Promise;

app.listen(5000, () => console.log('SERVER WORKS!!!'));
