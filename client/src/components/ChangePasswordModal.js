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

const styles1 = {
  color: 'Black',
  textAlign: 'center',
  backgroundColor: 'Green',
  fontWeight: 'bold',
  padding: '20px',
};

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
        console.log('response', response);
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
        <Button style={styles1} onClick={this.onOpenModal}>
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
  }
} // end class ChangePasswordModal extends Component {

export default ChangePasswordModal;
