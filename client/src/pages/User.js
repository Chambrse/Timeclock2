import React, { Component } from 'react';
import { Button, /* Icon, */ Grid } from '@material-ui/core';
import Clock from '../components/clock';
import Admin from './Admin';
import Dashboard from './managerClockView';


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

class User extends Component {
  render() {
    // console.log(user);
    const user = {
      firstname1: 'Keith Jones',
      isAdmin: true,
    };

    return (
      <div>
        <div>
          <h2>
Welcome,
            {' '}
            {user.firstname1}
!
          </h2>
          <div className="row">

            <Grid container spacing={40} justify="space-evenly">
              <Grid item xs={3}>
                <Clock size={300} timeFormat="24hour" hourFormat="standard" />&emsp;
              </Grid>
              <Grid item xs={3}>
                <ul>
                                    Your Schedule:
                  <li>
Monday: 8AM-5PM
                  </li>
                  <li>
Tuesday: 8AM-5PM
                  </li>
                  <li>
Wednesday: 8AM-5PM
                  </li>
                  <li>
Thursday: 8AM-5PM
                  </li>
                  <li>
Fiday: 8AM-5PM
                  </li>
                  <li>
Saturday: Off
                  </li>
                  <li>
Sunday: Off
                  </li>
                </ul>
              </Grid>
              <Grid item xs={3}>
                <img id="Keith" img src="http://images6.fanpop.com/image/user_images/5768000/kebo83-5768074_650_567.jpg" width="225" height="200" alt="Keith Jones" className="col-lg-3" />
                <h6>Kebo Co.</h6>
                <h6>CEO / CO-FOUNDER</h6>
                <h4>Keith Jones</h4>
              </Grid>
            </Grid>

          </div>

<<<<<<< HEAD
                    <div className="row" style={styles1}>
                        <Grid container spacing={40} justify="space-evenly">
                            <Grid item xs={4} >
                                <Admin></Admin>
                            </Grid>
                            <Grid item xs={4} >
                                <h1>Clock IN/OUT</h1>
                                {this.props.status}
                                <p id="ClockIN/OUT">{this.props.status ? ( 
                                    <div>
                                        You are clocked in.
                                        <br/>
                                <Button onClick={this.props.clockOut} style={styles2} >
                                    Clock Out
                         
                         </Button>
                                    </div>
                                 ): ( 
                                    <div>
                                    You are clocked out.
                                    <br/>
                                <Button onClick={this.props.clockIn} style={styles3}  >
                                    Clock In
                        </Button>
                                    </div>
                                  )}</p>
                            </Grid>
                        </Grid>
                        <Dashboard/>
                    </div>
                </div>
            </div>
        );
    }
=======
          <div className="row" style={styles1}>
            <Grid container spacing={40} justify="space-evenly">
              <Grid item xs={4}>
                {/* <h6>CEO / CO-FOUNDER</h6>
                                <h4>Keith Jones</h4>  */}
                <Admin />
              </Grid>
              <Grid item xs={4}>
                <h1>Clock IN/OUT</h1>
                <p id="ClockIN/OUT"> See Your Clock Status Here!! </p>
                <Button onClick={this.props.clockIn} style={styles3}>
                                    Clock In
                </Button>
                <br />
                <br />
                <br />
                <Button onClick={() => { document.getElementById('ClockIN/OUT').innerHTML = `${'You Are Now Clocked OUT @' + ('<br />')}${this.state.time}`; }} style={styles2}>
                                    Clock Out
                </Button>
              </Grid>
            </Grid>
            {/* </Grid> */}
            <Dashboard />
          </div>
        </div>
      </div>
    );
  }
>>>>>>> ea8f2136db950c9465bf0ac7effd73dfaaa7748c
}

export default User;
