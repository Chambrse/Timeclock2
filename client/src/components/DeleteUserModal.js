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
    
    this.handleChange = this.handleChange.bind(this);
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };



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
            
          </div>
        </Modal>
      </div>
    );
  }
}

export default DeleteUserModal;
