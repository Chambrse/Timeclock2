import React, { Component } from 'react';
import axios from 'axios';
import {
  Button, TextField, Grid,
} from /*  TextField,
  Select,
  MenuItem,
  TextFieldLabel,
  FormControl, */
  '@material-ui/core';
import Modal from 'react-responsive-modal';

class ChangePasswordModal extends Component {
  constructor({ id }) {
    super();
    this.state = {
      open: false,
      password: '',
      newPassword1: '',
      newPassword2: '',
      id,
    }; // end this.state = {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  } // end constructor() {

  onOpenModal = () => this.setState({ open: true });

  onCloseModal = () => this.setState({ open: false });

  handleChange(event) {
    // console.log('[event.target.id]: event.target.value,', [event.target.id], event.target.value);
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleSubmit(event) {
    const { id, newPassword1, newPassword2 } = this.state;
    event.preventDefault();
    console.log("Change password's handleSubmit, event: ", event);
    console.log(this.state);

    if (newPassword1 === newPassword2) {
      console.log(this.state);
      axios.post(`changePassword/${id}`, this.state).then((response) => {
        console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRresponse', response);
        if (response.status === 400) {
          alert(response.data.errors);
        }
      }).catch((error) => {
        // handle error
        console.log(error);
        alert('Error: Unable to change the password. Please try again.');
      });
    } else {
      alert('passwords do not match');
    }
    this.setState({ open: false });
  } // end handleSubmit(event) {

  render() {
    const { open } = this.state;
    return (
      <div>
        <Button color="secondary" onClick={this.onOpenModal}>
          <b>Change password</b>
        </Button>
        <Modal open={open} onClose={this.onCloseModal} center>
          Change password
          <div className="form-group">
            <br />
            <form onSubmit={this.handleSubmit}>
              <Grid xs={12}>
                <TextField
                  type="password"
                  label="Old Password"
                  id="password"
                  onChange={this.handleChange}
                />
              </Grid>
              <br />
              <Grid xs={12}>
                <TextField
                  type="password"
                  label="New Password"
                  id="newPassword1"
                  onChange={this.handleChange}
                />
              </Grid>
              <br />
              <Grid xs={12}>
                <TextField
                  type="password"
                  label="Confrim Password"
                  id="newPassword2"
                  onChange={this.handleChange}
                />
              </Grid>
              <br />
              <Button color="secondary" variant="contained" type="submit">
              Submit
              </Button>
              <br />
            </form>
          </div>

        </Modal>
      </div>
    );
  }// end render() {
} // end class ChangePasswordModal extends Component {

export default ChangePasswordModal;
