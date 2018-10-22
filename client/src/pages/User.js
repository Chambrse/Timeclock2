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
      id,
      EmpData,
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
      <div>
        <h2>
          Welcome,
          {' '}
          {username}
          !
        </h2>


        <Grid container spacing={40} justify="space-evenly">
          <Grid item xs={12} md={3}>
            <Clock size={300} timeFormat="24hour" hourFormat="standard" />&emsp;
          </Grid>
          <Grid item xs={12} md={3}>
            <img id="PIC" img src={profile} width="200" alt="profile" />
            <h6>{companyName}</h6>
            <h6>CEO / CO-FOUNDER</h6>
            <h4>
              {adminFirstName}
              {''}
              {adminLastName}
            </h4>
          </Grid>
        </Grid>


        <div className="row">
          <Grid container spacing={40} justify="space-evenly">
            {employeeType === 'admin'
              ? (
                <Grid item xs={12} md={4}>
                  <Admin
                    adminUsername={username}
                  />
                </Grid>
              ) : (
                null
              )
            }
            <Grid item xs={12} md={4}>
              <Paper elevation={10}>
                <br />
                <h1>Clock IN/OUT</h1>
                {status}
                <p id="ClockIN/OUT">
                  {status ? (
                    <div>
                      You are clocked in.
                      <br />
                      <Button className="btn btn-primary" onClick={clockOut}>
                        Clock Out

                      </Button>
                    </div>
                  ) : (
                    <div>
                        You are clocked out.
                      <br />
                      <Button className="btn btn-success" onClick={clockIn}>
                          Clock In
                      </Button>
                    </div>
                  )}

                </p>
                <ChangePasswordModal id={id} />
              </Paper>
            </Grid>
          </Grid>
        </div>
        {employeeType === 'admin' && EmpData && EmpData.data
          ? (
            <div className="row" style={{ margin: '15px', marginTop: '50px' }}>
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
          ) : (
            null
          )
        }
        <div className="row" style={{ margin: '15px', marginTop: '50px' }}>
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
      </div>
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
  clockInData: PropTypes.arrayOf.isRequired,
  clockOutData: PropTypes.arrayOf.isRequired,
};

export default User;
