const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// let dataBase = {
//   users: [{
//           login: "andrey.mardash@gmail.com",
//           password: "2002126server",
//           status: "admin",
//         }]
// };

// let list = [{
//   title: 'Some',
//   id: uniqid(),
//   done: false
// }, {
//   title: 'Google',
//   id: uniqid(),
//   done: false
// }];
// set app express
const app = express();

const PORT = 5000;

// connection between different ports
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
app.use(bodyParser.json());

app.use('/api', require('./routes/api'));
//app.use(bodyParser.urlencoded({extended: false}));


app.use(express.static('public'));

// connect to mongodb
mongoose.connect('mongodb+srv://andrey:tripleks@cluster0-sys07.mongodb.net/andrey');
mongoose.Promise = global.Promise;

// app.get("/", (req, res) => {
//     console.log(req, res);
//     res.status(201).json({message: true});
//   }
// );
//
// app.get('/', (req, res) => {
//     setTimeout(() => {
//       res.status(201).json({ message: true, list: list});
//     }, 2000)
//   }
// );
//
// app.post('/authorization', (req, res) => {
//   setTimeout(() => {
//     console.log(req, res);
//     let isUser = false;
//     Object.entries(dataBase.users).forEach(([key, value]) => {
//       if(value.login === req.body.login && value.password === req.body.password) isUser = {id: key, status: value.status};
//     });
//     if(typeof isUser !== 'boolean') {
//       res.status(200).json({message: 'Well done:)', id: isUser.id, status: isUser.status})
//     } else {
//       res.status(401).json({message: `Authorization failed. isUser === ${isUser}`});
//     }
//   }, 2000);
// });
//
// app.post('/', (req, res) => {
//   setTimeout(() => {
//     console.log(req, res);
//     res.status(200).json({message: 'Well done:)'});
//     list.push(req.body);
//   }, 2000);
// });
//
// app.delete('/', (req, res) => {
//   console.log(req, res);
//   list = list.filter(item => item.id !== req.body.id);
//   res.status(200).json({message: JSON.stringify(list)});
// });
//
// app.delete('/deleteAll', (req, res) => {
//   list = [];
//   res.status(200).json({list});
// });

app.listen(PORT, () => console.log('SERVER WORKS!!!'));
