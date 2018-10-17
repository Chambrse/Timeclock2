import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Route, Link, withRouter } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
} from '@material-ui/core';


class Navbar extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    console.log('logging out');
    this.props.history.push('/');
    axios.post('/user/logout').then((response) => {
      console.log(response.data);
      if (response.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          username: null,
        });
      }
    }).catch((error) => {
      console.log('Logout error');
    });
  }

  render() {
    const loggedIn = this.props.loggedIn;
    console.log('navbar render, props: ');
    console.log(this.props);

    return (

      <AppBar position="static">
        <Toolbar>
          
          
          <Typography variant="h6" color="inherit">
            TimeClock 9000
          </Typography>
          {loggedIn ? (
            <section className="navbar-section">
              <Button href="/logout" onClick={this.logout}>
                <span>logout</span>

              </Button>

            </section>
          ) : (
            <section className="navbar-section">
              <Button href="/">
                home
              </Button>
              <Button href="/login">
                login
              </Button>
              <Button href="/signup">
                sign up
              </Button>
            </section>
          )}
        </Toolbar>
      </AppBar>


    );
  }
}

export default withRouter(Navbar);
