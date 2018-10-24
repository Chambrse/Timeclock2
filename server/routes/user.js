const express = require('express');

const router = express.Router();
const User = require('../database/models/user');
const passport = require('../passport');

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
  req.checkBody('brand', 'Brand Statement field cannot be empty.').notEmpty();
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
    const brandErrors = [];
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
        case 'brand':
          brandErrors.push(element);
          break;
        case 'password':
          passwordErrors.push(element);
          break;
        case 'passwordMatch':
          passwordMatchErrors.push(element);
          break;
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
      brandErrors,
      passwordErrors,
      passwordMatchErrors,
    });
  } else {
    console.log('user signup');

    const { username, password } = req.body;
    // ADD VALIDATION
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

router.post('/login',
  (req, res, next) => {
    console.log('routes/user.js, login, req.body: ');
    console.log(req.body);
    console.log(req.session);
    next();
  },
  passport.authenticate('local'),
  (req, res) => {
    console.log('logged in', req.user.username);
    const userInfo = {
      username: req.user.username,
      _id: req.user._id,
      companyName: req.user.companyName,
      employeeType: req.user.employeeType,
      position: req.user.position,
      adminFirstName: req.user.adminFirstName,
      adminLastName: req.user.adminLastName,
      timeClockData: req.user.timeClockData,
      status: req.user.status,
      photo_url: req.user.photo_url,
    };
    res.send(userInfo);
  });

router.get('/', (req, res, next) => {
  console.log('===== user!!======');
  // console.log(req.user.username);
  if (req.user) {
    User.findOne({ username: req.user.username }, (err, user) => {
      console.log('req.user', req.user);
      res.json({ user });
    });
  } else {
    res.json({ user: null });
  }
});

router.post('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: 'logging out' });
  } else {
    res.send({ msg: 'no user to log out' });
  }
});

router.post('/clockIn/:id', (req, res) => {
  User
    .findOneAndUpdate({ _id: req.params.id }, {
      $push: {
        timeClockData: {
          time: Date.now(),
          coords: req.body.coords,
          clockType: 'clockIn',
        },
      },
      status: true,
    }, { new: true })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

router.post('/clockOut/:id', (req, res) => {
  User
    .findOneAndUpdate({ _id: req.params.id }, {
      $push: {
        timeClockData: {
          time: Date.now(),
          coords: req.body.coords,
          clockType: 'clockOut',
        },
      },
      status: false,
    }, { new: true })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

router.get('/getEmpData', (req, res) => {
  if (req.user.username0) {
    User.find({ manager: req.user.username }).then(results => res.json(results));
  }
});

router.get('/getAll', (req, res) => {
  User.find({}).then(results => res.json(results));
});

router.delete('/Dlete/:username', (req, res) => {
  console.log(req.params.username);
  User.findOneAndDelete({ username: req.params.username }).then(results => console.log(results));
});


module.exports = router;
