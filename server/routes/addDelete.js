const express = require('express');

const router = express.Router();
const User = require('../database/models/user');
// const passport = require('../passport');

router.post('/', (req, res) => {
  req.checkBody('companyName', 'Company field cannot be empty.').notEmpty();
  req.checkBody('username', 'Username field cannot be empty.').notEmpty();
  req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
  req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
  req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
  req.checkBody('adminFirstName', 'First name field cannot be empty.').notEmpty();
  req.checkBody('adminLastName', 'Last name field cannot be empty.').notEmpty();
  req.checkBody('city', 'City field cannot be empty.').notEmpty();
  req.checkBody('country', 'Country field cannot be empty.').notEmpty();
  req.checkBody('postalCode', 'Postal code field cannot be empty.').notEmpty();
  req.checkBody('employeeType', 'Please select the Employee Type.').notEmpty();
  req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody('password', 'Password must include one lowercase character, one uppercase character, a number, and a special character.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, 'i');
  req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    console.log(JSON.stringify(errors));

    const companyNameErrors = [];
    const usernameErrors = [];
    const emailErrors = [];
    const adminFirstNameErrors = [];
    const adminLastNameErrors = [];
    const cityErrors = [];
    const countryErrors = [];
    const postalCodeErrors = [];
    const employeeTypeErrors = [];
    const passwordErrors = [];
    const passwordMatchErrors = [];

    errors.forEach((element) => {
      switch (element.param) {
        case 'companyName':
          companyNameErrors.push(element);
          break;
        case 'username':
          usernameErrors.push(element);
          break;
        case 'email':
          emailErrors.push(element);
          break;
        case 'adminFirstName':
          adminFirstNameErrors.push(element);
          break;
        case 'adminLastName':
          adminLastNameErrors.push(element);
          break;
        case 'city':
          cityErrors.push(element);
          break;
        case 'country':
          countryErrors.push(element);
          break;
        case 'postalCode':
          postalCodeErrors.push(element);
          break;
        case 'employeeType':
          postalCodeErrors.push(element);
          break;
        case 'password':
          passwordErrors.push(element);
          break;
        case 'passwordMatch':
          passwordMatchErrors.push(element);
        default:
      }
    });

    res.send({
      errors: true,
      companyNameErrors,
      usernameErrors,
      emailErrors,
      adminFirstNameErrors,
      adminLastNameErrors,
      cityErrors,
      countryErrors,
      postalCodeErrors,
      employeeTypeErrors,
      passwordErrors,
      passwordMatchErrors,
    });
  } else {
    console.log('user signup');

    const { username } = req.body;
    // ADD VALIDATION
    User.find().map(i => i.item);

    User.findOne({ username }, (err, user) => {
      if (err) {
        console.log('User.js post error: ', err);
      } else if (user) {
        res.json({
          error: `Sorry, already a user with the username: ${username}`,
        });
      } else {
        const newUser = new User(req.body);
        newUser.save((err, savedUser) => {
          if (err) return res.json(err);

          console.log('test 111');

          req.login(savedUser, (err) => {
            if (!err) {
              console.log('inside the login stuff!!!');
              res.send(savedUser);
            } else {
              res.json(err);
            }
          });
        });
      }
    });
  }
});

// router.post(
//     '/login',
//     function(req, res, next) {
//       console.log('routes/user.js, login, req.body: ');
//       console.log(req.body);
//       console.log(req.session);
//       next();
//     },
//     passport.authenticate('local'),
//     (req, res) => {
//       console.log('logged in', req.user);
//       console.log(req.session);
//       let userInfo = {
//         username: req.user.username,
//       };
//       res.send(userInfo);
//     }
// );

router.get('/', (req, res, err) => {
  User.find(
    { companyName: '1983' }).sort({ name: 1 });
  console.log('kebo');
  // console.log(res.user);
  if (err) {
    res.json(err);
  } else {
    res.json(res);
  }
});
// .find().map(i => i.item);
// router.post('/logout', (req, res) => {
//   if (req.user) {
//     req.logout();
//     res.send({msg: 'logging out'});
//   } else {
//     res.send({msg: 'no user to log out'});
//   }
// });

module.exports = router;
