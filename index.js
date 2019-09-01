const express = require('express');
const bodyParser = require('body-parser');
const uniqid = require('uniqid');
let users = [{
    login: "andrey.mardash@gmail.com",
    password: "2002126server",
    id: "5CFEE39D812461A67D865C819934895A3FB1A23934941847217A5B5ECB862FDBB2D41B538F",
    status: "admin",
  }
];

let list = [{
  title: 'Some',
  id: uniqid(),
  done: false
}, {
  title: 'Google',
  id: uniqid(),
  done: false
}];

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


app.get("/5CFEE39D812461A67D865C819934895A3FB1A23934941847217A5B5ECB862FDBB2D41B538F",(req, res) =>{
    console.log(req, res);
    res.status(201).json({message: true});
  }
);

app.get('/',(req, res) =>{
    console.log(req, res);
    res.status(201).json(list);
  }
);

app.post('/authorization',(req, res) => {
  setTimeout(() => {
    console.log(req, res);
    if(req.body.login === users[0].login && req.body.password === users[0].password){
      res.status(200).json({ message: 'Well done:)', id: users[0].id, status: "admin"});
    } else {
      res.status(401).json({message: "Authorization failed."})
    }
  }, 2000);
});

app.post('/',(req, res) => {
  setTimeout(() => {
    console.log(req, res);
    res.status(200).json({ message: 'Well done:)'});
    list.push(req.body);
  }, 3000);
});

app.delete('/', (req,res) => {
  console.log(req, res);
  list = list.filter(item => item.id !== req.body.id);
  res.status(200).json({message: JSON.stringify(list)});
});

app.delete('/deleteAll', (req, res) => {
    list = [];
    res.status(200).json({list});
});

app.listen(PORT, () => console.log('SERVER WORKS!!!'));