import React, { Component } from 'react';
import axios from 'axios';
import { Route /* , Link */ } from 'react-router-dom';
// components
// import EditorFormatListBulleted from 'material-ui/SvgIcon';
import Grid from '@material-ui/core/Grid';
import Signup from './pages/sign-up';
import LoginForm from './pages/login-form';
import Navbar from './components/navbar';
import Home from './pages/home';
import User from './pages/User';
import Admin from './pages/Admin';
import Map1 from './components/map1';
import BottomNav from './components/bottomNav';


class App extends Component {
  constructor() {
    super();
    this.state = {
      EmpData: {},
      getAll: {},
      timeClockData: [],
      loggedIn: null,
      username: null,
      companyName: null,
      employeeType: null,
      position: null,
      id: null,
      status: false,
      currentLocation: {
        lat: 0,
        lng: 0,
      },
      adminFirstName: null,
      adminLastName: null,
      markers: [],
      Dlete: {},
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.clockIn = this.clockIn.bind(this);
    this.clockOut = this.clockOut.bind(this);
    this.getGeoLocation = this.getGeoLocation.bind(this);
    this.getEmpData = this.getEmpData.bind(this);
    this.getAll = this.getAll.bind(this);
    this.updateMarkers = this.updateMarkers.bind(this);
    this.Dlete = this.Dlete.bind(this);
  }

  // Upon loading the page, see if there is a user stored in the session
  // and update the state variables appropriately

  componentWillMount() {
    this.getGeoLocation();
  }

  componentDidMount() {
    this.getUser();
  }


  getAll() {
    axios.get('user/getAll').then((results) => {
      this.setState({
        getAll: results,
      });
    });
  }

  getEmpData(cb) {
    axios.get('user/getEmpData').then((results) => {
      this.setState({
        EmpData: results,
      });
      cb();
    });
  }

  // Used navigator to store the latitude and longitude from the browser. Returns a promise.
  getGeoLocation = () => new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          currentLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
        resolve();
      });
    } else {
      reject();
    }
  });


  // Get the user data from the database, if there is any.
  getUser() {
    axios.get('/user/').then((response) => {
      console.log(response);
      if (response.data.user) {
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          id: response.data.user._id,
          companyName: response.data.user.companyName,
          employeeType: response.data.user.employeeType,
          position: response.data.user.position,
          adminFirstName: response.data.user.adminFirstName,
          adminLastName: response.data.user.adminLastName,
          timeClockData: response.data.user.timeClockData,
          EmpData: response.data.user.EmpData,
          getAll: response.data.user.getAll,
          status: response.data.user.status,
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

  Dlete() {
    axios.delete('user/Dlete').then((results) => {
      this.setState({
        Dlete: results,
      });
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
        axios.post(`/user/clockIn/${id}`, { coords: currentLocation }).then((response) => {
          this.setState({
            status: true,
            timeClockData: response.data.timeClockData,
          });
        });
      });
  }

  // Clock out; gets current geolocation before making the post request.
  clockOut() {
    const { id, currentLocation } = this.state;
    this.getGeoLocation()
      .then(() => {
        axios.post(`/user/clockOut/${id}`, { coords: currentLocation }).then((response) => {
          this.setState({
            status: false,
            timeClockData: response.data.timeClockData,
          });
        });
      });
  }

  updateMarkers() {
    const { EmpData } = this.state;
    const coords = [];
    const alph = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    EmpData.data.forEach((n, index) => {
      if (n.timeClockData[0]) {
        coords.push({
          coords: n.timeClockData[0].coords,
          name: n.adminFirstName,
          icon: require(`./img/Google Maps Markers/blue_Marker${alph[index]}.png`),
        });
      }
    });

    this.setState({
      markers: coords,
    });
    console.log(this.state.markers);
  }

  render() {
    const {
      loggedIn,
      username,
      companyName,
      employeeType,
      status,
      timeClockData,
      position,
      currentLocation,
      EmpData,
      getAll,
      id,
      adminFirstName,
      adminLastName,
      markers,
      Dlete,
    } = this.state;
    return (
      <Grid className="App">

        <Navbar updateUser={this.updateUser} loggedIn={loggedIn} />
        <br />
        <br />
        {/* greet user if logged in: */}
        {
          loggedIn
          // &&
          //   <p>Join the party, {this.state.username}!</p>
        }
        {/* Routes to different components */}
        <Route exact path="/" component={Home} />
        <Route path="/login" render={() => <LoginForm updateUser={this.updateUser} />} />
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
              id={id}
              adminFirstName={adminFirstName}
              adminLastName={adminLastName}
              timeClockData={timeClockData}
              position={position}
              EmpData={EmpData}
              getEmpData={this.getEmpData}
              getGeoLocation={this.getGeoLocation}
              currentLocation={currentLocation}
              getAll={getAll}
              markers={markers}
              updateMarkers={this.updateMarkers}
              Dlete={Dlete}
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
        <Route path="/admin" render={() => <Admin User={this.username} />} />
        <Route
          path="/signup"
          render={() => (
            <Signup updateUser={this.updateUser} signup={this.signup} />
          )}
        />

        <Route
          path="/map"
          render={() => (
            <Map1
              currentLocation={this.currentLocation}
              getGeoLocation={this.getGeoLocation}
            />
          )}
        />
        <br />
        <br />
        <BottomNav />
      </Grid>
    );
  }
}

export default App;
