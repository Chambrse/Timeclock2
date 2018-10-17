import React, { Component } from 'react';
import axios from 'axios';
import { Route /* , Link */} from 'react-router-dom';
import Signup from './pages/sign-up';
import LoginForm from './pages/login-form';
import Navbar from './components/navbar';
import Home from './pages/home';
import User from './pages/User';
import Admin from './pages/Admin';
import Map from './components/map';
import BottomNav from './components/bottomNav';


class App extends Component {
  constructor() {
    super();
    this.state = {
      clockInData: [],
      clockOutData: [],
      loggedIn: false,
      username: null,
      companyName: null,
      employeeType: null,
      id: null,
      status: false,
      currentLocation: {
        lat: 0,
        lng: 0,
      },
      adminFirstName: null,
      adminLastName: null,
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.clockIn = this.clockIn.bind(this);
    this.clockOut = this.clockOut.bind(this);
    this.getGeoLocation = this.getGeoLocation.bind(this);
  }

  // Upon loading the page, see if there is a user stored in the session
  // and update the state variables appropriately

  componentWillMount() {
    this.getGeoLocation();
  }

  componentDidMount() {
    this.getUser();
  }
  // Change the user data


  // Used navigator to store the latitude and longitude from the browser. Returns a promise.
  getGeoLocation = () => new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            currentLocation: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
          resolve();
        },
      );
    } else {
      error => console.log(error);
      reject();
    }
  })


  // Get the user data from the database, if there is any.
  getUser() {
    axios.get('/user/').then((response) => {
      console.log('Get user response: ');
      console.log(response.data);
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ', response.data.user);

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          id: response.data.user._id,
          companyName: response.data.user.companyName,
          employeeType: response.data.user.employeeType,
          adminFirstName: response.data.user.adminFirstName,
          adminLastName: response.data.user.adminLastName,
        });
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null,
          id: null,
        });
      }
    });
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  // Clock in; gets current geolocation before making the post request.
  clockIn() {
    const { id, currentLocation } = this.state;
    this.getGeoLocation()
      .then(() => {
        axios.post(`/user/clockIn/${id}`, { coords: currentLocation }).then(() => {
          this.setState({
            status: true,
          });
        });
      });
  }

  // Clock out; gets current geolocation before making the post request.
  clockOut() {
    const { id, currentLocation } = this.state;
    this.getGeoLocation()
      .then(() => {
        axios.post(`/user/clockOut/${id}`, { coords: currentLocation }).then(() => {
          this.setState({
            status: false,
          });
        });
      });
  }


  render() {
    const {
      clockInData, clockOutData, loggedIn, username, companyName, employeeType, status, adminFirstName, adminLastName,
    } = this.state;
    return (
      <div className="App">

        <Navbar updateUser={this.updateUser} loggedIn={loggedIn} />
        {/* greet user if logged in: */}
        {loggedIn
          // &&
          //   <p>Join the party, {this.state.username}!</p>
        }
        {/* Routes to different components */}
        <Route
          exact
          path="/"
          component={Home}
        />
        <Route
          path="/login"
          render={() => (
            <LoginForm
              updateUser={this.updateUser}
            />
          )}
        />
        <Route
          path="/user"
          render={() => (
            <User
              loggedIn={loggedIn}
              username={username}
              companyName={companyName}
              employeeType={employeeType}
              clockIn={this.clockIn}
              clockOut={this.clockOut}
              status={status}
              adminFirstName={adminFirstName}
              adminLastName={adminLastName}
            />
          )}
        />
        <Route
          path="/admin"
          render={() => (
            <Admin
              User={this.username}
            />
          )}
        />
        <Route
          path="/signup"
          render={() => (
            <Signup
              updateUser={this.updateUser}
              signup={this.signup}
            />
          )}
        />

        <Route
          path="/map"
          render={() => (
            <Map
              currentLocation={this.currentLocation}
              getGeoLocation={this.getGeoLocation}
            />
          )}
        />

        <br />
        <BottomNav />
      </div>
    );
  }
}

export default App;
