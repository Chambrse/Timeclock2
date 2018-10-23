import axios from 'axios';
import React, { Component } from 'react';
import { Button, /* Icon, */ Grid, Paper } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Clock from '../components/clock';
import Admin from './Admin';
import profile from '../blank-profile-picture.png';
import ChangePasswordModal from '../components/ChangePasswordModal';
import Map1 from '../components/map1';


class User extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentWillMount() {
    const { getEmpData } = this.props;
    getEmpData();
  }

  render() {
    const {
      timeClockData,
      status,
      loggedIn,
      username,
      companyName,
      clockIn,
      clockOut,
      adminFirstName,
      adminLastName,
      employeeType,
      position,
      id,
      EmpData,
      getGeoLocation,
      currentLocation,
    } = this.props;
    console.log(this.props);
    console.log(EmpData);

    timeClockData.forEach((element, index, theArray) => {
      theArray[index].time = new Date(element.time).toLocaleString();
    });

    timeClockData.reverse();

    if (!loggedIn) {
      return <Redirect to={{ pathname: '/login' }} />;
    }

    return (
      <Grid justify="space-evenly" spacing={12}>
        <h2>
          Welcome,
          {' '}
          {`${adminFirstName} ${adminLastName}`}
          !
        </h2>


        <Grid container justify="space-evenly">
          <Grid item xs={12} md={3}>
            <Clock size={300} timeFormat="24hour" hourFormat="standard" />&emsp;
          </Grid>
          <Grid item xs={12} md={3}>
            <img id="PIC" img src={profile} width="200" alt="profile" />
            <h4>
              {`${adminFirstName} ${adminLastName}`}
            </h4>
            <h6>
              Company:
              {' '}
              {companyName}
            </h6>
            <h6>
              Job Title:
              {' '}
              {position}
            </h6>
            <h6>
              User Name:
              {' '}
              {username}
              {' '}
            </h6>
            <h6><ChangePasswordModal id={id} /></h6>
          </Grid>
        </Grid>


        <Grid container justify="space-evenly" spacing={12} xs={12}>
          {employeeType === 'admin'
            ? (
              <Grid item xs={12} md={4} style={{ marginTop: '50px' }}>
                <Admin
                  adminUsername={username}
                />
              </Grid>

            ) : (
              null
            )
            }
          <Grid item xs={12} md={4} style={{ marginTop: '50px' }}>
            <Paper elevation={10}>
              <br />
              <h1>Clock IN/OUT</h1>
              {status}
              <p id="ClockIN/OUT">
                {status ? (
                  <div>
                      You are clocked in.
                    <br />
                    <Button color="primary" variant="contained" onClick={clockOut}>
                        Clock Out

                    </Button>
                  </div>
                ) : (
                  <div>
                        You are clocked out.
                    <br />
                    <Button color="primary" variant="contained" onClick={clockIn}>
                          Clock In
                    </Button>
                  </div>
                )}

              </p>
              {/* <ChangePasswordModal id={id} /> */}
              <br />
            </Paper>
          </Grid>
        </Grid>

        {employeeType === 'admin' && EmpData && EmpData.data
          ? (
            <div>
              <div className="row" style={{ margin: '15px', marginTop: '50px', overflow: 'auto' }}>
                <h2>Recent data from your employees:</h2>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Event</TableCell>
                      <TableCell>Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {EmpData.data.map(n => (
                      n.timeClockData.length > 0 ? (
                        <TableRow>
                          <TableCell>{n.adminFirstName}</TableCell>
                          <TableCell component="th" scope="row">
                            {n.timeClockData[n.timeClockData.length - 1].clockType}
                          </TableCell>
                          <TableCell>{new Date(n.timeClockData[n.timeClockData.length - 1].time).toLocaleString()}</TableCell>
                        </TableRow>) : null
                    ))}
                  </TableBody>
                </Table>
              </div>
              {/*               <div
                className="row"
                style={{
                  height: '400px', width: '80vw', margin: '15px', marginTop: '50px',
                }}
              > */}
              <Map1
                getGeoLocation={getGeoLocation}
                currentLocation={currentLocation}
                EmpData={EmpData}
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCKrVlx0xjdrNE4co1DPg8617iC-dwcfDQ&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: '400px' }} />}
                mapElement={<div style={{ height: '100%' }} />}
              />
              {/*               </div>
 */}
              {' '}

            </div>
          ) : (
            null
          )
        }
        <div className="row" style={{ margin: '15px', marginTop: '50px', overflow: 'auto' }}>
          <h2>Your TimeClock Data:</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Event</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {timeClockData.map(n => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {n.clockType}
                  </TableCell>
                  <TableCell>{n.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Grid>
    );
  }
}

User.propTypes = {
  status: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  clockIn: PropTypes.func.isRequired,
  clockOut: PropTypes.func.isRequired,
  adminFirstName: PropTypes.string.isRequired,
  adminLastName: PropTypes.string.isRequired,
  employeeType: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  clockInData: PropTypes.arrayOf.isRequired,
  clockOutData: PropTypes.arrayOf.isRequired,
  EmpData: PropTypes.objectOf.isRequired,
  getAll: PropTypes.objectOf.isRequired,
};

export default User;
