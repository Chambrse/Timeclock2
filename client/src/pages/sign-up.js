import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {
  Button, TextField, Grid, Paper,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const pstyle = {
  color: 'red',
  margin: '0px',
  root: {
    flexGrow: 1,
  },
};

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      username: '',
      usernameErrors: [],
      companyName: '',
      companyNameErrors: [],
      city: '',
      cityErrors: [],
      country: '',
      countryErrors: [],
      postalCode: '',
      postalCodeErrors: [],
      brand: '',
      brandErrors: [],
      email: '',
      emailErrors: [],
      adminFirstName: '',
      adminFirstNameErrors: [],
      adminLastName: '',
      adminLastNameErrors: [],
      password: '',
      passwordErrors: [],
      passwordMatch: '',
      passwordMatchErrors: [],
      redirectTo: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const { username } = this.state;
    console.log('sign-up handleSubmit, username: ', username);
    event.preventDefault();

    // request to server to add a new username/password
    axios.post('/user/', this.state)
      .then((response) => {
        console.log('response', response.data.errors);

        if (response.data.errors) {
          const newErrorsObj = {
            companyNameErrors: [],
            usernameErrors: [],
            emailErrors: [],
            adminFirstNameErrors: [],
            adminLastNameErrors: [],
            cityErrors: [],
            countryErrors: [],
            postalCodeErrors: [],
            brandErrors: [],
            passwordErrors: [],
            passwordMatchErrors: [],
          };

          Object.keys(response.data).forEach((key) => {
            console.log([key]);
            if ([key].toString() !== 'errors') {
              response.data[key].forEach((element) => {
                newErrorsObj[key].push(element.msg);
              });
            }
          });
          this.setState(newErrorsObj);
        } else {
          const { updateUser } = this.props;
          updateUser({
            loggedIn: true,
            username: response.data.username,
            id: response.data.id,
            companyName: response.data.companyName,
            employeeType: response.data.employeeType,
          });

          this.setState({
            redirectTo: '/user',
          });
        }
      }).catch((error) => {
        console.error('signup error: ', error);
      });
  }


  render() {
    const {
      id,
      username, usernameErrors,
      companyName, companyNameErrors,
      city, cityErrors,
      country, countryErrors,
      postalCode, postalCodeErrors,
      brand, brandErrors,
      email, emailErrors,
      adminFirstName, adminFirstNameErrors,
      adminLastName, adminLastNameErrors,
      password, passwordErrors,
      passwordMatch, passwordMatchErrors,
      redirectTo,
    } = this.state;
    if (redirectTo) {
      return <Redirect to={{ pathname: redirectTo }} />;
    }
    return (
      <Paper className="container" elevation={10}>
        <br />
        <Grid className="SignupForm" container alignItems="center" justify="center" spacing={24}>

          <Grid item xs={12}>
            <h4>Sign up</h4>
          </Grid>

          <Grid item xs={12} md={4}>
            Username
            <TextField
              className="form-input"
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={this.handleChange}
            />
            {usernameErrors.length > 0 ? (
              usernameErrors.map(element => <p style={pstyle} key={id}>{element}</p>)
            ) : null
                }
          </Grid>
          <Grid item xs={12} md={6}>
            Company
            <TextField
              className="form-input"
              type="text"
              id="companyName"
              name="companyName"
              placeholder="companyName"
              value={companyName}
              onChange={this.handleChange}
            />
            {companyNameErrors.length > 0 ? (
              companyNameErrors.map(element => <p style={pstyle} key={id}>{element}</p>)
            ) : null
                }
          </Grid>

          <Grid item xs={12} md={4}>
            City
            <TextField
              className="form-input"
              type="text"
              id="city"
              name="city"
              placeholder="city"
              value={city}
              onChange={this.handleChange}
            />
            {cityErrors.length > 0 ? (

              cityErrors.map(element => <p style={pstyle} key={id}>{element}</p>)
            ) : null
                }
          </Grid>

          <Grid item xs={12} md={4}>

            Country

            <TextField
              className="form-input"
              type="text"
              id="country"
              name="country"
              placeholder="country"
              value={country}
              onChange={this.handleChange}
            />
            {countryErrors.length > 0 ? (
              countryErrors.map(element => <p style={pstyle} key={id}>{element}</p>)
            ) : null
                }
          </Grid>

          <Grid item xs={12} md={4}>

            Postal Code

            <TextField
              className="form-input"
              type="text"
              id="postalCode"
              name="postalCode"
              placeholder="postalCode"
              value={postalCode}
              onChange={this.handleChange}
            />
            {postalCodeErrors.length > 0 ? (
              postalCodeErrors.map(element => <p style={pstyle} key={id}>{element}</p>)
            ) : null
                }
          </Grid>

          <Grid item xs={12} md={10}>

            Brand Statement

            <TextField
              className="form-input"
              type="text"
              id="brand"
              name="brand"
              placeholder="Brand Statement here"
              value={brand}
              onChange={this.handleChange}
            />
            {brandErrors.length > 0 ? (
              brandErrors.map(element => <p style={pstyle} key={id}>{element}</p>)
            ) : null
                }
          </Grid>

          <Grid item xs={12} md={4}>

            Email

            <TextField
              className="form-input"
              type="text"
              id="email"
              name="email"
              placeholder="enter valid email"
              value={email}
              onChange={this.handleChange}
            />
            {emailErrors.length > 0 ? (
              emailErrors.map(element => <p style={pstyle} key={id}>{element}</p>)
            ) : null
                }
          </Grid>

          <Grid item xs={12} md={4}>

           First Name

            <TextField
              className="form-input"
              type="text"
              id="adminFirstName"
              name="adminFirstName"
              placeholder="Enter first name"
              value={adminFirstName}
              onChange={this.handleChange}
            />
            {adminFirstNameErrors.length > 0 ? (
              adminFirstNameErrors.map(element => <p style={pstyle} key={id}>{element}</p>)
            ) : null
                }
          </Grid>

          <Grid item xs={12} md={4}>

            Last Name

            <TextField
              className="form-input"
              type="text"
              id="adminLastName"
              name="adminLastName"
              placeholder="Enter last name"
              value={adminLastName}
              onChange={this.handleChange}
            />
            {adminLastNameErrors.length > 0 ? (
              adminLastNameErrors.map(element => <p style={pstyle} key={id}>{element}</p>)
            ) : null
                }

          </Grid>

          <Grid item xs={12} md={4}>

            Password: Must be 8 characters long with 1 capital and 1 symbol

            <TextField
              className="form-input"
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            {passwordErrors.length > 0 ? (
              passwordErrors.map(element => <p style={pstyle} key={id}>{element}</p>)
            ) : null
                }
          </Grid>

          <Grid item xs={12} md={4}>

            Re-enter password:
            <br />
             Passwords must match

            <TextField
              className="form-input"
              type="password"
              id="passwordMatch"
              name="passwordMatch"
              placeholder="Please re-enter password"
              value={passwordMatch}
              onChange={this.handleChange}
            />
            {passwordMatchErrors.length > 0 ? (
              passwordMatchErrors.map(element => <p style={pstyle} key={id}>{element}</p>)
            ) : null
                }
          </Grid>

          <Grid item xs={12} md={10}>

            <Button
              className="btn btn-primary"
              onClick={this.handleSubmit}
              type="submit"
            >
            Sign up
            </Button>


          </Grid>

        </Grid>
        <br />
      </Paper>
    );
  }
}

Signup.propTypes = {
  updateUser: PropTypes.func.isRequired,
};

export default Signup;
