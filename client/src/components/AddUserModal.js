import React from 'react';
import axios from 'axios';
import {
  Button, TextField, Select, MenuItem, InputLabel, FormControl, Grid,
} from '@material-ui/core';
import Modal from 'react-responsive-modal';

class AddUserModal extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      username: '',
      usernameErrors: [],
      companyName: '',
      companyNameErrors: [],
      city: '',
      cityErrors: [],
      country: '',
      countryErrors: [],
      postalCode: '',
      postalCodeErrors: [],
      email: '',
      emailErrors: [],
      adminFirstName: '',
      adminFirstNameErrors: [],
      adminLastName: '',
      adminLastNameErrors: [],
      employeeType: [],
      employeeTypeErrors: [],
      password: '',
      passwordErrors: [],
      passwordMatch: '',
      passwordMatchErrors: [],
      redirectTo: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

    onOpenModal = () => {
      this.setState({ open: true });
    };

    onCloseModal = () => {
      this.setState({ open: false });
    };

    handleSubmit(event) {
      console.log('sign-up handleSubmit, username: ');
      console.log(this.username);
      event.preventDefault();

      // request to server to add a new username/password
      axios.post('/addDelete/', this.state)
        .then((response) => {
          console.log('response', response);

          if (response.data.errors) {
            const newErrorsObj = {
              usernameErrors: [],
              emailErrors: [],
              adminFirstNameErrors: [],
              adminLastNameErrors: [],
              employeeTypeErrors: [],
              passwordErrors: [],
              passwordMatchErrors: [],
            };

            Object.keys(response.data).forEach((key) => {
              console.log([key]);
              if ([key].toString() !== 'errors') {
                response.data[key].forEach((element) => {
                  newErrorsObj[key].push(element.msg);
                });
              }
            });
            this.setState(newErrorsObj);
          } else {
            this.setState({ open: false });
          }
        }).catch((error) => {
          console.log('signup error: ');
          console.log(error);
        });
    }


    handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }

    render() {
      const {
        username, usernameErrors,
        email, emailErrors,
        adminFirstName, adminFirstNameErrors,
        adminLastName, adminLastNameErrors,
        password, passwordErrors,
        passwordMatch, passwordMatchErrors,
        employeeTypeErrors, open,
        employeeType,
      } = this.state;
      return (
        <div>
          <Button color="primary" variant="contained" onClick={this.onOpenModal}>Add Employee</Button>
          <Modal open={open} onClose={this.onCloseModal} center>
            <div className="SignupForm">
              <h4>Add New Employee</h4>
              <form className="form-horizontal">
                <Grid xs={12}>
                  <TextField
                    margin="normal"
                    type="text"
                    id="username"
                    name="username"
                    label="Username"
                    value={username}
                    onChange={this.handleChange}
                    error={usernameErrors > 0}
                    helperText={usernameErrors.length > 0 ? (
                      usernameErrors[0]
                    ) : (null)
                    }
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    margin="normal"
                    type="text"
                    id="email"
                    name="email"
                    label="email"
                    value={email}
                    onChange={this.handleChange}
                    error={emailErrors > 0}
                    helperText={emailErrors.length > 0 ? (
                      emailErrors[0]
                    ) : (null)
                    }
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    margin="normal"
                    type="text"
                    id="adminFirstName"
                    name="adminFirstName"
                    label="first name"
                    value={adminFirstName}
                    onChange={this.handleChange}
                    error={adminFirstNameErrors > 0}
                    helperText={adminFirstNameErrors.length > 0 ? (
                      adminFirstNameErrors[0]
                    ) : (null)
                    }
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    margin="normal"
                    type="text"
                    id="adminLastName"
                    name="adminLastName"
                    label="last name"
                    value={adminLastName}
                    onChange={this.handleChange}
                    error={adminLastNameErrors > 0}
                    helperText={adminLastNameErrors.length > 0 ? (
                      adminLastNameErrors[0]
                    ) : (null)
                    }
                  />
                </Grid>
                <Grid xs={12}>
                  <FormControl className="col-12">
                    <InputLabel htmlFor="label">Select</InputLabel>
                    <Select
                      name="employeeType"
                      value={employeeType}
                      onChange={this.handleChange}
                      inputProps={{
                        id: 'label',
                      }}
                      className="col-12"
                      style={{ minWidth: '100%' }}
                    >
                      <MenuItem value="employee">employee</MenuItem>
                      <MenuItem value="admin">admin</MenuItem>
                    </Select>
                  </FormControl>
                  {employeeTypeErrors.length > 0 ? (
                    employeeTypeErrors[0]
                  ) : (null)
                  }
                </Grid>
                <Grid xs={12}>
                  <TextField
                    margin="normal"
                    type="text"
                    id="position"
                    name="position"
                    label="job title"
                    value={this.state.position}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    margin="normal"
                    label="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    error={passwordErrors > 0}
                    helperText={passwordErrors.length > 0 ? (
                      passwordErrors[0]
                    ) : (null)
                    }
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    margin="normal"
                    type="password"
                    id="passwordMatch"
                    name="passwordMatch"
                    label="passwordMatch"
                    value={passwordMatch}
                    onChange={this.handleChange}
                    error={passwordMatchErrors > 0}
                    helperText={passwordMatchErrors.length > 0 ? (
                      passwordMatchErrors[0]
                    ) : (null)
                    }
                  />
                </Grid>
                <br />
                <Grid xs={12}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={this.handleSubmit}
                    type="submit"
                  >
                  Add User
                  </Button>
                </Grid>
              </form>
            </div>
          </Modal>
        </div>
      );
    }
}


export default AddUserModal;
