const express = require('express');
const router = express.Router();
const NewUser = require('../models/newUser');

// connection between different ports
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// registration
router.post('/list/newUser', (req, res) => {
  console.log(req.body);
  NewUser.create(req.body).then((user) => {
    res.send(user);
  }).catch(err => res.send(err))
});

// authorization
router.post('/authorization', (req, res, next) => {
  console.log(req.body);
  NewUser.find({login: req.body.login, password: req.body.password})
    .then((user) => {
      if(user[0] === undefined) {
        throw new Error('Wrong login or password');
      } else {
        res.send(user[0]);
      }
    })
    .catch((err) => res.send({err: "Wrong login or password"}));
});

// get all user info by id
router.get('/list/:id', (req, res) => {
  NewUser.findById(req.params.id).then((user) => {
    res.send(user);
  });
});

// add a new todo to your list
router.post('/list/:id', (req, res) => {
  NewUser.findById(req.params.id).then((user) => {
    console.log(user);
    const list = user.list.concat([req.body]);
    NewUser.findByIdAndUpdate({_id: req.params.id}, {list: list}).then(() => res.send(list));
  }).catch((err) => res.send({type: "ERROR: you are not logged in"}));
});

// delete all your todos from the list
router.delete('/list/deleteAll/:id', (req, res) => {
  NewUser.findByIdAndUpdate({_id: req.params.id}, {list: []}).then((user) => res.send({type: 'DELETED ALL', list: []})).catch((err) => res.send({type: `ERROR: ${err}`}));
});

// delete one specific todo
router.delete('/list/deleteItem/:id', (req, res) => {
  NewUser.findById(req.params.id).then((user) => {
    const list = [];
    user.list.map(el => el.id === req.body.id && list.push(...user.list.filter(item => item !== el)));
    console.log(req.body.id);
    NewUser.findByIdAndUpdate({_id: req.params.id},{list: list}).then(() => res.send(list));
  }).catch(err => res.send("ERROR: something went wrong"));

});

// change the state of your todo: title value
router.put('/list/changeValue/:id', (req, res) => {
  NewUser.findById(req.params.id).then((user) => {
    user.list.map(el => el.id === req.body.id ? el.title = req.body.title : '');
    NewUser.findByIdAndUpdate({_id: req.params.id},{list: user.list}).then(() => res.send(user.list));
  }).catch(err => res.send({message: "ERROR: something went wrong"}));
});

// change the state of your todo: done value
router.put('/list/changeDone/:id', (req, res) => {
  console.log(req.body);
  NewUser.findById(req.params.id).then((user) => {
    user.list.map(el => el.id === req.body.id ? el.done = !el.done : '');
    NewUser.findByIdAndUpdate({_id: req.params.id},{list: user.list}).then(() => res.send(user.list));
  }).catch(err => res.send({message: "ERROR: something went wrong"}));
});

module.exports = router;