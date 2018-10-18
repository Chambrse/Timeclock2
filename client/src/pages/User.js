import React from 'react';
import { Button, /* Icon, */ Grid } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Clock from '../components/clock';
import Admin from './Admin';
import profile from '../blank-profile-picture.png';
import ChangePasswordModal from '../components/ChangePasswordModal';


const styles1 = {
  color: 'red',
  textAlign: 'center',
  backgroundColor: 'black',
  fontWeight: 'bold',
  padding: '20px',
};
const styles2 = {
  color: 'Black',
  textAlign: 'center',
  backgroundColor: 'Red',
  fontWeight: 'bold',
  padding: '20px',
};
const styles3 = {
  color: 'Black',
  textAlign: 'center',
  backgroundColor: 'Green',
  fontWeight: 'bold',
  padding: '20px',
};

// class User extends Component {
//   constructor() {
//     super();
//     this.state = {
//       // redirectTo: null,
//     };
//   }

//   render() {
const User = ({
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
}) => {
  if (!loggedIn) {
    return <Redirect to={{ pathname: '/login' }} />;
  }

  console.log('++++++++++++++++++++++++++id', id);
  return (
    <div>
      <div>
        <h2>
            Welcome,
          {' '}
          {username}
            !
        </h2>
        <div className="row">

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

        </div>

        <div className="row" style={styles1}>
          <Grid container spacing={40} justify="space-evenly">
            {employeeType === 'admin'
              ? (
                <Grid item xs={12} md={4}>
                  <Admin />
                </Grid>
              ) : (
                null
              )
          }
            <Grid item xs={12} md={4}>
              <h1>Clock IN/OUT</h1>
              {status}
              <p id="ClockIN/OUT">
                {status ? (
                  <div>
                                        You are clocked in.
                    <br />
                    <Button onClick={clockOut} style={styles2}>
                                    Clock Out

                    </Button>
                  </div>
                ) : (
                  <div>
                                    You are clocked out.
                    <br />
                    <Button onClick={clockIn} style={styles3}>
                                    Clock In
                    </Button>
                  </div>
                )}

              </p>
              <ChangePasswordModal id={id} />
            </Grid>
          </Grid>
        </div>
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
