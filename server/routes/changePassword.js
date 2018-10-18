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

        // update the password in the db
        // const newUser = new User(user);
      } else {
        console.log(' *************************************** ');
      }
    });
  }
  res.send({ msg: 'i got here' });
});


module.exports = router;
