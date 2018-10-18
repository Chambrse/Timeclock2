const express = require('express');
const User = require('../database/models/user');

const router = express.Router();

router.post('/:id', (req, res) => {
  console.log('--------- body ---------', req.body);
  const {
    id, password, newPassword1, newPassword2,
  } = req.body;
  const errors = req.validationErrors();

  if (newPassword1 !== newPassword2) res.end('Passwords do not match');
  else if (errors) res.json(errors);
  else {
    console.log(' --------- ID -------- ', id);
    User.findOne({ _id: id }, (err, user) => {
      if (err) {
        console.log('Error finding ID in DB: ', err);
        res.status(err.status || 500);
      } else if (user) {
        console.log(' ----------------------------------------------- user', user);
        const existingUser = user;
        if (existingUser.checkPassword(password)) {
          console.log('passwords match');
          existingUser.password = existingUser.hashPassword(newPassword1);
          console.log(existingUser.password);
          User.findOneAndUpdate(
            { _id: id },
            { password: existingUser.password },
            (error, match) => {
              if (error) {
                console.log('ERRRRRROR: cannot find ID', id);
                res.status(err.status || 500);
              } else if (match) {
                console.log(' found match', match);
              } else {
                console.log('something happened');
                res.status(err.status || 500);
              }
            },
          );
        } else {
          console.log('***Password does not match existing one.');
          res.status(400).send(new Error('Password does not match existing one'));
        }
      } else {
        console.log(' *************** FOUND NONE BY ID **************** ');
        res.status(err.status || 500);
      }
    });
  }
  // res.send({ msg: 'Password changed' });
});

module.exports = router;
