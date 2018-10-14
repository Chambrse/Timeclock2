import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {
  Button, TextField, Grid, Paper,
} from '@material-ui/core';


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
    console.log('sign-up handleSubmit, username: ');
    console.log(this.state.username);
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
            if ([key] != 'errors') {
              response.data[key].forEach((element) => {
                newErrorsObj[key].push(element.msg);
              });
            }
          });
          this.setState(newErrorsObj);

        } else {
          this.props.updateUser({
            loggedIn: true,
            username: response.data.username,
            id: response.data.user._id,
            companyName: response.data.user.companyName,
            employeeType: response.data.user.employeeType
          });

          this.setState({
            redirectTo: '/',
          });
        }
      }).catch((error) => {
        console.log('signup error: ');
        console.log(error);
      });
  }


  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
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
              value={this.state.username}
              onChange={this.handleChange}
            />
            {this.state.usernameErrors.length > 0 ? (
              this.state.usernameErrors.map((element, i) => <p style={pstyle} key={i}>{element}</p>)
            ) : console.log('it was false')
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
              value={this.state.companyName}
              onChange={this.handleChange}
            />
            {this.state.companyNameErrors.length > 0 ? (
              this.state.companyNameErrors.map((element, i) => <p style={pstyle} key={i}>{element}</p>)
            ) : console.log('it was false')
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
              value={this.state.city}
              onChange={this.handleChange}
            />
            {this.state.cityErrors.length > 0 ? (

              this.state.cityErrors.map((element, i) => <p style={pstyle} key={i}>{element}</p>)
            ) : console.log('it was false')
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
              value={this.state.country}
              onChange={this.handleChange}
            />
            {this.state.countryErrors.length > 0 ? (
              this.state.countryErrors.map((element, i) => <p style={pstyle} key={i}>{element}</p>)
            ) : console.log('it was false')
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
              value={this.state.postalCode}
              onChange={this.handleChange}
            />
            {this.state.postalCodeErrors.length > 0 ? (
              this.state.postalCodeErrors.map((element, i) => <p style={pstyle} key={i}>{element}</p>)
            ) : console.log('it was false')
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
              value={this.state.brand}
              onChange={this.handleChange}
            />
            {this.state.brandErrors.length > 0 ? (
              this.state.brandErrors.map((element, i) => <p style={pstyle} key={i}>{element}</p>)
            ) : console.log('it was false')
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
              value={this.state.email}
              onChange={this.handleChange}
            />
            {this.state.emailErrors.length > 0 ? (
              this.state.emailErrors.map((element, i) => <p style={pstyle} key={i}>{element}</p>)
            ) : console.log('it was false')
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
              value={this.state.adminFirstName}
              onChange={this.handleChange}
            />
            {this.state.adminFirstNameErrors.length > 0 ? (
              this.state.adminFirstNameErrors.map((element, i) => <p style={pstyle} key={i}>{element}</p>)
            ) : console.log('it was false')
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
              value={this.state.adminLastName}
              onChange={this.handleChange}
            />
            {this.state.adminLastNameErrors.length > 0 ? (
              this.state.adminLastNameErrors.map((element, i) => <p style={pstyle} key={i}>{element}</p>)
            ) : console.log('it was false')
                }
          </Grid>

          <Grid item xs={12} md={4}>

            Password: Must be 8 characters long with 1 capital and 1 symbol

            <TextField
              className="form-input"
              placeholder="Password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            {this.state.passwordErrors.length > 0 ? (
              this.state.passwordErrors.map((element, i) => <p style={pstyle} key={i}>{element}</p>)
            ) : console.log('it was false')
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
              value={this.state.passwordMatch}
              onChange={this.handleChange}
            />
            {this.state.passwordMatchErrors.length > 0 ? (
              this.state.passwordMatchErrors.map((element, i) => <p style={pstyle} key={i}>{element}</p>)
            ) : console.log('it was false')
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

export default Signup;
