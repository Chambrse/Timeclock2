import React, {Component} from 'react';
import axios from 'axios';
import {Route, Link} from 'react-router-dom';
// components
import Signup from './pages/sign-up'
import LoginForm from './pages/login-form'
import Navbar from './components/navbar'
import Home from './pages/home'
import User from './pages/User'
import Admin from './pages/Admin'
import EditorFormatListBulleted from 'material-ui/SvgIcon';


class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
      id: null,
      status: false
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)

  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  clockIn() {
    axios.post('/user/clockIn/' + this.state.id, { coords: "Some fake coords"}).then((response) => {
      console.log("stuff clockIn");
      this.setState({
        status: true
      });
    });
  };


  getUser() {
    axios.get('/user/').then((response) => {
      console.log('Get user response: ');
      console.log(response.data);
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ', response.data.user);

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          id: response.data.user._id
        });
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null,
          id: null
        });
      }
    });
  }

  render() {
    return (
      <div className="App">

        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {this.state.loggedIn 
        // &&
        //   <p>Join the party, {this.state.username}!</p>
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
              clockIn={this.clockIn}
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

      </div>
    );
  }
}

export default App;
