import React, { Component } from 'react';
import axios from 'axios';
import {
  Button,
} from /*  TextField,
  Select,
  MenuItem,
  InputLabel,
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
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleSubmit(event) {
    const { id, newPassword1, newPassword2 } = this.state;
    event.preventDefault();
    console.log("Change password's handleSubmit, event: ", event);

    if (newPassword1 === newPassword2) {
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
        <Button onClick={this.onOpenModal}>
          Change password
        </Button>
        <Modal open={open} onClose={this.onCloseModal} center>
          Change password
          <div className="form-group">
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="name">
                Password:
                <input
                  type="password"
                  id="password"
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="name">
                New Password:
                <input
                  type="password"
                  id="newPassword1"
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="name">
                Repeat New Password:
                <input
                  type="password"
                  id="newPassword2"
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>

        </Modal>
      </div>
    );
  }// end render() {
} // end class ChangePasswordModal extends Component {

export default ChangePasswordModal;
