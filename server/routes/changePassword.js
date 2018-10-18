const express = require('express');

const router = express.Router();
const User = require('../database/models/user');
const passport = require('../passport');

router.post('/:id', (req, res) => {
  console.log('--------- body ---------', req.body);
  const errors = req.validationErrors();
  if (errors) {
    console.log('JSON.stringify(errors)', JSON.stringify(errors));
  } else {
    const { id, newPassword1 } = req.body;
    console.log(' --------- ID -------- ', id);
    User.findOne({ _id: id }, (err, user) => {
      if (err) {
        console.log('Error finding ID in DB: ', err);
      } else if (user) {
        console.log('user', user);
        const userTemp = user;
        userTemp.password = newPassword1;

        console.log('*********************************************', user);
        // update the password in the db
        const newUser = new User(user);
        console.log(' --------------------------------- newUser', newUser);
        newUser.save((err, savedUser) => {
          if (err) return res.json(err);

          console.log('test zzzzzzzzzzzzzzzzzzzzz savedUser', savedUser);
          User.findOneAndUpdate({ _id: id }, { password: newUser.password }, (err, match) => {
            if (err) {
              console.log('ERRRRRROR: cannot find ID', id);
            } else if (match) {
              console.log(' found match', match);
            } else {
              console.log('something happened');
            }
          });
        });
      } else {
        console.log(' ******************* FOUND NONE BY ID ******************** ');
      }
    });
  }
  res.send({ msg: 'i got here' });
});


module.exports = router;
