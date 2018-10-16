import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {
  Button, TextField, Select, MenuItem, InputLabel, FormControl,
} from '@material-ui/core';
import Modal from 'react-responsive-modal';


const styles1 = {
  color: 'Black',
  textAlign: 'center',
  backgroundColor: 'Green',
  fontWeight: 'bold',
  padding: '20px',
};

const pstyle = {
  color: 'red',
  margin: '0px',
};

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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    console.log('sign-up handleSubmit, username: ');
    console.log(this.state.username);
    event.preventDefault();

    // request to server to add a new username/password
    axios.post('/addDelete/', this.state)
      .then((response) => {
        console.log('test');

        if (response.data.errors) {
          const newErrorsObj = {
            companyNameErrors: [],
            adminLastNameErrors: [],
            cityErrors: [],
            countryErrors: [],
            postalCodeErrors: [],
            employeeTypeErrors: [],
            passwordErrors: [],
            passwordMatchErrors: [],
          };

          for (const key in response.data) {
            console.log([key]);
            if ([key] != 'errors') {
              response.data[key].forEach((element) => {
                newErrorsObj[key].push(element.msg);
              });
            }
          }
          this.setState(newErrorsObj);
        } else if (!alert('New User Added!!')) { window.location.reload(); }
      }).catch((error) => {
        console.log('signup error: ');
        console.log(error);
      });
  }


  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <Button style={styles1} onClick={this.onOpenModal}>Add Employee</Button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="SignupForm">
            <h4>Add New Employee</h4>
            <form className="form-horizontal">
              <div className="form-group">
                <div className="col-6 col-ml-auto">
                  <label className="form-label" htmlFor="username">Username</label>
                </div>
                <div className="col-6 col-mr-auto">
                  <TextField
                    className="form-input"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                  {this.state.usernameErrors.length > 0 ? (
                    this.state.usernameErrors.map((element, i) => <p style={pstyle} key={i}>{element}</p>)
                  ) : console.log('it was false')
                  }
                </div>


              </div>
              <div className="form-group">
                <div className="col-6 col-ml-auto">
                  <label className="form-label" htmlFor="company">Company</label>
                </div>
                <div className="col-6 col-mr-auto">
                  <TextField
                    className="form-input"
                    type="text"
                    id="companyName"
                    name="companyName"
                    placeholder="companyName"
                    value={this.state.companyName}
                    onChange={this.handleChange}
                  />
                  {this.state.companyNameErrors.length > 0 ? (
                    this.state.companyNameErrors.map((element, i) => <p style={pstyle} key={i}>{element}</p>)
                  ) : console.log('it was false')
                  }
                </div>
              </div>
              <div className="form-group">
                <div className="col-6 col-ml-auto">
                  <label className="form-label" htmlFor="city">City</label>
                </div>
                <div className="col-6 col-mr-auto">
                  <TextField
                    className="form-input"
                    type="text"
                    id="city"
                    name="city"
                    placeholder="city"
                    value={this.state.city}
                    onChange={this.handleChange}
                  />
                  {this.state.cityErrors.length > 0 ? (

                    this.state.cityErrors.map((element, i) => <p style={pstyle} key={i}>{element}</p>)
                  ) : console.log('it was false')
                  }
                </div>
              </div>
              <div className="form-group">
                <div className="col-6 col-ml-auto">
                  <label className="form-label" htmlFor="country">Country</label>
                </div>
                <div className="col-6 col-mr-auto">
                  <TextField
                    className="form-input"
                    type="text"
                    id="country"
                    name="country"
                    placeholder="country"
                    value={this.state.country}
                    onChange={this.handleChange}
                  />
                  {this.state.countryErrors.length > 0 ? (
                    this.state.countryErrors.map((element, i) => <p style={pstyle} key={i}>{element}</p>)
                  ) : console.log('it was false')
                  }
                </div>
              </div>
              <div className="form-group">
                <div className="col-6 col-ml-auto">
                  <label className="form-label" htmlFor="postalCode">Postal Code</label>
                </div>
                <div className="col-6 col-mr-auto">
                  <TextField
                    className="form-input"
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    placeholder="postalCode"
                    value={this.state.postalCode}
                    onChange={this.handleChange}
                  />
                  {this.state.postalCodeErrors.length > 0 ? (
                    this.state.postalCodeErrors.map((element, i) => <p style={pstyle} key={i}>{element}</p>)
                  ) : console.log('it was false')
                  }
                </div>
              </div>
              {/* <div className="form-group"> */}
              {/* <div className="col-6 col-ml-auto">
                <label className="form-label" htmlFor="brand">Brand Statement</label>
              </div> */}
              {/* <div className="col-6 col-mr-auto">
                <TextField className="form-input"
                  type="text"
                  id="brand"
                  name="brand"
                  placeholder="brand"
                  value={this.state.brand}
                  onChange={this.handleChange}
                />
                {this.state.brandErrors.length > 0 ? (
									this.state.brandErrors.map((element, i) => {
									  return <p style={pstyle} key={i}>{element}</p>;
									})
								) : console.log('it was false')
                }
              </div> */}
              {/* </div> */}
              <div className="form-group">
                <div className="col-6 col-ml-auto">
                  <label className="form-label" htmlFor="email">Email</label>
                </div>
                <div className="col-6 col-mr-auto">
                  <TextField
                    className="form-input"
                    type="text"
                    id="email"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  {this.state.emailErrors.length > 0 ? (
                    this.state.emailErrors.map((element, i) => <p style={pstyle} key={i}>{element}</p>)
                  ) : console.log('it was false')
                  }
                </div>
              </div>
              <div className="form-group">
                <div className="col-6 col-ml-auto">
                  <label className="form-label" htmlFor="adminFirstName">First Name</label>
                </div>
                <div className="col-6 col-mr-auto">
                  <TextField
                    className="form-input"
                    type="text"
                    id="adminFirstName"
                    name="adminFirstName"
                    placeholder="first name"
                    value={this.state.adminFirstName}
                    onChange={this.handleChange}
                  />
                  {this.state.adminFirstNameErrors.length > 0 ? (
                    this.state.adminFirstNameErrors.map((element, i) => <p style={pstyle} key={i}>{element}</p>)
                  ) : console.log('it was false')
                  }
                </div>
              </div>
              <div className="form-group">
                <div className="col-6 col-ml-auto">
                  <label className="form-label" htmlFor="adminLastName">Last Name</label>
                </div>
                <div className="col-6 col-mr-auto">
                  <TextField
                    className="form-input"
                    type="text"
                    id="adminLastName"
                    name="adminLastName"
                    placeholder="last name"
                    value={this.state.adminLastName}
                    onChange={this.handleChange}
                  />
                  {this.state.adminLastNameErrors.length > 0 ? (
                    this.state.adminLastNameErrors.map((element, i) => <p style={pstyle} key={i}>{element}</p>)
                  ) : console.log('it was false')
                  }
                </div>
              </div>
              <div className="form-group">
                <div className="col-6 col-ml-auto">
                  <label className="form-label">
Employee Type
                    {' '}

                  </label>
                </div>
                <div className="col-6 col-mr-auto">
                  <FormControl className="col-12">
                    <InputLabel htmlFor="label">Select</InputLabel>
                    <Select
                      name="employeeType"
                      value={this.state.employeeType}
                      onChange={this.handleChange}
                      inputProps={{
                        id: 'label',
                      }}
                      className="col-12"
                      style={{ minWidth: '100%' }}
                    >

                      <MenuItem value="employee">employee</MenuItem>
                      <MenuItem value="manager">manager</MenuItem>
                      <MenuItem value="admin">admin</MenuItem>
                    </Select>
                  </FormControl>
                  {this.state.employeeTypeErrors.length > 0 ? (
                    this.state.employeeTypeErrors.map((element, i) => <p style={pstyle} key={i}>{element}</p>)
                  ) : console.log('it was false')
                }
                </div>
              </div>

              <div className="form-group">
                <div className="col-6 col-ml-auto">
                  <label className="form-label" htmlFor="password">Password </label>
                </div>
                <div className="col-6 col-mr-auto">
                  <TextField
                    className="form-input"
                    placeholder="password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  {this.state.passwordErrors.length > 0 ? (
                    this.state.passwordErrors.map((element, i) => <p style={pstyle} key={i}>{element}</p>)
                  ) : console.log('it was false')
                  }
                </div>
              </div>
              <div className="form-group">
                <div className="col-6 col-ml-auto">
                  <label className="form-label" htmlFor="passwordMatch">Re-enter password</label>
                </div>
                <div className="col-6 col-mr-auto">
                  <TextField
                    className="form-input"
                    type="password"
                    id="passwordMatch"
                    name="passwordMatch"
                    placeholder="passwordMatch"
                    value={this.state.passwordMatch}
                    onChange={this.handleChange}
                  />
                  {this.state.passwordMatchErrors.length > 0 ? (
                    this.state.passwordMatchErrors.map((element, i) => <p style={pstyle} key={i}>{element}</p>)
                  ) : console.log('it was false')
                  }
                </div>
              </div>
              <br />
              <div className="form-group ">
                <div className="col-12" />
                <Button
                  className="btn btn-primary col-12 col-mr-auto"
                  onClick={this.handleSubmit}
                  type="submit"
                >
Add User

                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default AddUserModal;
