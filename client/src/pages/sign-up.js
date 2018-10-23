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
      position: '',
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
            id: response.data._id,
            companyName: response.data.companyName,
            employeeType: response.data.employeeType,
            position: response.data.position,
            adminFirstName: response.data.adminFirstName,
            adminLastName: response.data.adminLastName,
            timeClockData: response.data.timeClockData,
            status: response.data.status,
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
      position,
    } = this.state;
    if (redirectTo) {
      return <Redirect to={{ pathname: redirectTo }} />;
    }
    return (
      <Paper className="container" elevation={10}>
        <br />
        <Grid className="SignupForm" container alignItems="center" justify="center" spacing={2}>

          <Grid md={12} justify="space-evenly">
            <h4>Sign up</h4>
          </Grid>

          <Grid justify="space-evenly" xs={12} md={4}>

            <TextField
              fullWidth="true"
              margin="normal"
              type="text"
              id="username"
              name="username"
              label="Username"
              value={username}
              onChange={this.handleChange}
              error={usernameErrors.length > 0}
              helperText={usernameErrors.length > 0 ? (
                usernameErrors[0]
              ) : null
                  }
            />

          </Grid>
          <Grid xs={0} md={1}>
            <br />
          </Grid>
          <Grid justify="space-evenly" xs={12} md={4}>

            <TextField
              fullWidth="true"
              margin="normal"
              type="text"
              id="companyName"
              name="companyName"
              label="Company Name"
              value={companyName}
              onChange={this.handleChange}
              error={companyNameErrors.length > 0}
              helperText={companyNameErrors.length > 0 ? (
                companyNameErrors.map(element => <p style={pstyle} key={id}>{element}</p>)
              ) : null
                  }
            />

          </Grid>
          <Grid xs={0} md={1}>
            <br />
          </Grid>
          <Grid justify="space-evenly" xs={12} md={3}>
            <TextField
              fullWidth="true"
              margin="normal"
              type="text"
              id="city"
              name="city"
              label="City"
              value={city}
              onChange={this.handleChange}
              error={cityErrors.length > 0}
              helperText={cityErrors.length > 0 ? (
                cityErrors.map(element => <p style={pstyle} key={id}>{element}</p>)
              ) : null
                  }
            />
          </Grid>
          <Grid xs={0} md={1}>
            <br />
          </Grid>
          <Grid justify="space-evenly" xs={12} md={3}>
            <TextField
              fullWidth="true"
              margin="normal"
              type="text"
              id="country"
              name="country"
              label="Country"
              value={country}
              onChange={this.handleChange}
              error={countryErrors.length > 0}
              helperText={countryErrors.length > 0 ? (
                countryErrors.map(element => <p style={pstyle} key={id}>{element}</p>)
              ) : null
                  }
            />
          </Grid>
          <Grid xs={0} md={1}>
            <br />
          </Grid>
          <Grid justify="space-evenly" xs={12} md={3}>
            <TextField
              fullWidth="true"
              margin="normal"
              type="text"
              id="postalCode"
              name="postalCode"
              label="Zip"
              value={postalCode}
              onChange={this.handleChange}
              error={postalCodeErrors.length > 0}
              helperText={postalCodeErrors.length > 0 ? (
                postalCodeErrors.map(element => <p style={pstyle} key={id}>{element}</p>)
              ) : null
                  }
            />
          </Grid>
          <Grid justify="space-evenly" xs={12} md={11}>
            <TextField
              fullWidth="true"
              margin="normal"
              type="text"
              id="brand"
              name="brand"
              label="Brand Statement here"
              value={brand}
              onChange={this.handleChange}
              error={brandErrors.length > 0}
              helperText={brandErrors.length > 0 ? (
                brandErrors.map(element => <p style={pstyle} key={id}>{element}</p>)
              ) : null
                  }
            />

          </Grid>

          <Grid justify="space-evenly" xs={12} md={4}>

            <TextField
              fullWidth="true"
              margin="normal"
              type="text"
              id="email"
              name="email"
              label="Enter Valid Email"
              value={email}
              onChange={this.handleChange}
              error={emailErrors.length > 0}
              helperText={emailErrors.length > 0 ? (
                emailErrors.map(element => <p style={pstyle} key={id}>{element}</p>)
              ) : null
                  }
            />
          </Grid>
          <Grid xs={0} md={1}>
            <br />
          </Grid>
          <Grid justify="space-evenly" xs={12} md={3}>
            <TextField
              fullWidth="true"
              margin="normal"
              type="text"
              id="adminFirstName"
              name="adminFirstName"
              label="First Name"
              value={adminFirstName}
              onChange={this.handleChange}
              error={adminFirstNameErrors.length > 0}
              helperText={adminFirstNameErrors.length > 0 ? (
                adminFirstNameErrors.map(element => <p style={pstyle} key={id}>{element}</p>)
              ) : null
                  }
            />
          </Grid>
          <Grid xs={0} md={1}>
            <br />
          </Grid>
          <Grid justify="space-evenly" xs={12} md={3}>
            <TextField
              fullWidth="true"
              margin="normal"
              type="text"
              id="adminLastName"
              name="adminLastName"
              label="Last Name"
              value={adminLastName}
              onChange={this.handleChange}
              error={adminLastNameErrors.length > 0}
              helperText={adminLastNameErrors.length > 0 ? (
                adminLastNameErrors.map(element => <p style={pstyle} key={id}>{element}</p>)
              ) : null
                  }
            />
          </Grid>

          <Grid justify="space-evenly" item xs={12} md={3}>
            <TextField
              margin="normal"
              fullWidth="true"
              type="text"
              id="position"
              name="position"
              label="Job Title"
              value={position}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid xs={0} md={1}>
            <br />
          </Grid>
          <Grid justify="space-evenly" xs={12} md={3}>
            <TextField
              fullWidth="true"
              margin="normal"
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              error={passwordErrors.length > 0}
              helperText={passwordErrors.length > 0 ? (
                passwordErrors.map(element => <p style={pstyle} key={id}>{element}</p>)
              ) : null
                  }
            />
          </Grid>
          <Grid xs={0} md={1}>
            <br />
          </Grid>
          <Grid justify="space-evenly" xs={12} md={3}>
            <TextField
              fullWidth="true"
              margin="normal"
              type="password"
              id="passwordMatch"
              name="passwordMatch"
              label="Confrim Password"
              value={passwordMatch}
              onChange={this.handleChange}
              error={passwordMatchErrors.length > 0}
              helperText={passwordMatchErrors.length > 0 ? (
                passwordMatchErrors.map(element => <p style={pstyle} key={id}>{element}</p>)
              ) : null
                  }
            />
          </Grid>
          <Grid xs={0} md={12}>
            <br />
          </Grid>
          <Grid justify="space-evenly" xs={12} md={10}>

            <Button
              color="primary"
              variant="contained"
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
