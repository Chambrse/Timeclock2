import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {
  Paper, TextField, Grid, Button,
} from '@material-ui/core';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
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
    event.preventDefault();
    console.log('handleSubmit');

    axios
      .post('/user/login', {
        username: this.state.username,
        password: this.state.password,
      })
      .then((response) => {
        console.log('login response: ');
        console.log(response);
        if (response.status === 200) {
          // update App.js state
          this.props.updateUser({
            loggedIn: true,
            username: response.data.username,
            id: response.data._id,
            companyName: response.data.companyName,
            employeeType: response.data.employeeType,
            adminFirstName: response.data.adminFirstName,
            adminLastName: response.data.adminLastName,
            timeClockData: response.data.timeClockData,
          });
          // update the state to redirect to home
          this.setState({
            redirectTo: '/user',
          });
        }
      }).catch((error) => {
        console.log('login error: ');
        console.log(error);
        alert('Username or password is incorrect');
      });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    }
    return (
      <Paper className="container" elevation={10}>
        <br />
        <Grid container spacing={24} alignItems="center" justify="center">
          <Grid item xs={12}>
            <h4>Login</h4>
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
          </Grid>

          <Grid item xs={12} md={4}>
              Password:
            <TextField
              className="form-input"
              placeholder="password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />

          </Grid>
          <Grid item xs={12}>
            <Button
              className="btn btn-primary col-1 col-mr-auto"
              onClick={this.handleSubmit}
              type="submit"
            >
Login

            </Button>
          </Grid>
        </Grid>
        <br />
      </Paper>
    );
  }
}

export default LoginForm;
