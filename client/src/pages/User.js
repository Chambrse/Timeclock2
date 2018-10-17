import React from 'react';
import { Button, /* Icon, */ Grid, Paper } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Clock from '../components/clock';
import Admin from './Admin';
import profile from '../blank-profile-picture.png';


const User = ({
  clockInData,
  clockOutData,
  status,
  loggedIn,
  username,
  companyName,
  clockIn,
  clockOut,
  adminFirstName,
  adminLastName,
  employeeType,
}) => {
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
                  <Admin adminUsername={username} />
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
                <br />
              </Paper>
            </Grid>
          </Grid>
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
};

export default User;
