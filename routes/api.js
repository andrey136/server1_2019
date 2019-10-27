const express = require('express');
const router = express.Router();
const ToDo = require('../models/ToDo');
const NewUser = require('../models/newUser');

router.post('/list/newUser', (req, res) => {
  NewUser.create(req.body).then((user) => {
    res.send(user);
  })
});

router.get('/list/:id', (req, res) => {
  NewUser.findById(req.params.id).then((user) => {
    console.log(user);
    res.send(user);
  });
});

router.post('/list/:id', (req, res) => {
  // ToDo.create(req.body).then((todo) => {
  //   console.log(todo);
  //   res.send({type: "POST", todo: todo});
  // });
  NewUser.findById(req.params.id).then((user) => {
    console.log(user);
    const list = user.list.concat([req.body]);
    NewUser.findByIdAndUpdate({_id: req.params.id}, {list: list}).then(() => res.send(list));
  }).catch((err) => res.send({type: "ERROR: you are not logged in"}));
});

router.put('/list/:id', (req, res) => {
  res.send({type: "PUT"});
});

router.delete('/list:id', (req, res) => {
  res.send({type: 'DELETE'});
});

module.exports = router;