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
      } else if (user) {
        console.log(' ----------------------------------------------- user', user);
        const existingUser = user;
        if (existingUser.checkPassword(password)) {
          console.log('paswords match');
          existingUser.password = existingUser.hashPassword(newPassword1);
          console.log(existingUser.password);
          User.findOneAndUpdate(
            { _id: id },
            { password: existingUser.password },
            (err, match) => {
              if (err) {
                console.log('ERRRRRROR: cannot find ID', id);
              } else if (match) {
                console.log(' found match', match);
              } else {
                console.log('something happened');
              }
            },
          );
        } else console.log('Password does not match existing one.');

        // const userTemp = user;
        // userTemp.password = newPassword1;

        // console.log(' *********************************************** user', user);
        // const newUser = new User(user);
        // console.log(' *********************************************** newUser', newUser);
        // newUser.save((err, savedUser) => {
        //   if (err) return res.json(err);
        //   // else
        //   console.log('test zzzzzzzzzzzzzzzzzzzzz savedUser', savedUser);

        // });
      } else {
        console.log(
          ' ******************* FOUND NONE BY ID ******************** ',
        );
      }
    });
  }
  res.send({ msg: 'i got here' });
});

module.exports = router;
