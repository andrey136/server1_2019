const express = require('express');
const bodyParser = require('body-parser');
const uniqid = require('uniqid');

const app = express();
const PORT = 5000;

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/',(req, res) =>{
    console.log(req, res);
    return res.status(201).json({ title: 'Alice' , id: uniqid(), done: false});
  }
);


app.post('/',(req, res) => {
  setTimeout(() => {
    console.log(req, res);
    res.status(200).json({ message: `Hello ${req.body.name}` });
  }, 3000);
});

app.listen(PORT, () => console.log('SERVER WORKS!!!'));