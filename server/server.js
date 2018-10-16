require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const dbConnection = require('./database');
const expressValidator = require('express-validator');

const passport = require('./passport');
const app = express();
const PORT = process.env.PORT || 8080;
// Route requires
const user = require('./routes/user');
const addDelete = require('./routes/addDelete');

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// MIDDLEWARE
app.use(morgan('dev'));
app.use(
    bodyParser.urlencoded({
      extended: false,
    })
);
app.use(bodyParser.json());
app.use(expressValidator());


// Sessions
app.use(
    session({
      secret: 'fraggle-rock', // pick a random string to make the hash that is generated secure
      resave: false, // required
      saveUninitialized: false, // required
    })
);

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser


// Routes

app.use('/user', user);
app.use('/addDelete', addDelete);

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Starting Server
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
