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
    axios.post('/user/logout').then((response) => {
      if (response.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          username: null,
        });
        this.props.history.push('/');
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
              <Button onClick={this.logout}>
                <span>logout</span>

              </Button>

            </section>
          ) : (
            <section className="navbar-section">
              <Link to="/">
                  <Button>
                    home
                  </Button>
                </Link>
              <Link to="/login">
                  <Button href="/login">
                    login
                  </Button>
                </Link>
              <Link to="/signup">
                  <Button href="/signup">
                  sign up
                  </Button>
                </Link>
            </section>
          )}
        </Toolbar>
      </AppBar>


    );
  }
}

export default withRouter(Navbar);
