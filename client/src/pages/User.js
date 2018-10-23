import React from 'react';
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
// import Map from '../components/map';
import ChangePasswordModal from '../components/ChangePasswordModal';

const User = ({
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
}) => {
  console.log(position);

  timeClockData.forEach((element, index, theArray) => {
    theArray[index].time = new Date(element.time).toLocaleString();
  });

  if (!loggedIn) {
    return <Redirect to={{ pathname: '/login' }} />;
  }
  return (
    <div>
      <h2>
        Welcome,
        {' '}
        {`${adminFirstName } ${ adminLastName}`}
        !
      </h2>


      <Grid container spacing={40} justify="space-evenly">
        <Grid item xs={12} md={3}>
          <Clock size={300} timeFormat="24hour" hourFormat="standard" />&emsp;
        </Grid>
        <Grid item xs={12} md={3}>
          <img id="PIC" img src={profile} width="200" alt="profile" />
          <h4>
            {`${adminFirstName } ${ adminLastName}`}
          </h4>
          <h6>Company: {companyName}</h6>
          <h6>Job Title: {position}</h6>
          <h6>User Name: {username} </h6>
          <h6><ChangePasswordModal id={id} /></h6>
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
              {/* <ChangePasswordModal id={id} /> */}
            </Paper>
          </Grid>
        </Grid>
      </div>
      {/* <Map /> */}
      <div className="row">
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
                  {n.time}
                </TableCell>
                <TableCell>{n.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

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
};

export default User;
