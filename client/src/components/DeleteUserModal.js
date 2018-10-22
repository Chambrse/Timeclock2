import React from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import Modal from 'react-responsive-modal';
import Schedule from './scheduleView';

class DeleteUserModal extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,

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
    event.preventDefault();

    // request to server to delete a new username/password
    axios.get('/addDelete/').then(response => response)
      .catch(error => error);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { open } = this.state;
    return (
      <div>

        <Button color="secondary" variant="contained" onClick={this.onOpenModal}>Delete Employee</Button>
        <Modal open={open} onClose={this.onCloseModal} center>
      Delete Box dynamically created with  + Mapped users from Database.
        Delete Button to Delete user  that is checked.
          <div className="form-group ">
            <div className="col-12">
              <Schedule />
            </div>
            <button
              className="btn btn-warning col-12 col-mr-auto"
              onClick={this.handleSubmit}
              type="submit"
            >
Delete User

            </button>

          </div>
        </Modal>
      </div>
    );
  }
}

export default DeleteUserModal;
