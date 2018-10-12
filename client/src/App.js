import React, {Component} from 'react';
import axios from 'axios';
import {Route, Link} from 'react-router-dom';
// components
import Signup from './components/sign-up'
import LoginForm from './components/login-form'
import Navbar from './components/navbar'
import Home from './components/home'
import User from './components/User'
import Manager from './components/manager'
import Admin from './components/Admin'

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios.get('/user/').then((response) => {
      console.log('Get user response: ');
      console.log(response.data);
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ');

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
        });
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null,
        });
      }
    });
  }

  render() {
    return (
      <div className="App">

        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {this.state.loggedIn &&
          <p>Join the party, {this.state.username}{this.state.adminFirstName}!</p>
        }
        {/* Routes to different components */}
        <Route
          exact path="/"
          component={Home} />
        <Route
          path="/login"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
            />}
        />
        <Route
          path="/user"
          render={() =>
            <User
              User={this.username}
            />}
        />
        <Route
          path="/admin"
          render={() =>
            <Admin
              User={this.username}
            />}
        />
        <Route
          path="/signup"
          render={() =>
            <Signup
              updateUser={this.updateUser}
              signup={this.signup}
            />}
        />
         <Route
          path="/manager"
          render={() =>
            <Manager
              manager={this.manager}
            />}
        />

        <Route path="/admin" component={Admin} />
      </div>
    );
  }
}

export default App;
