import React from 'react';
import axios from 'axios';
import { Button, Dialog } from '@material-ui/core';
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
        <Dialog open={open} onClose={this.onCloseModal}>
          <div className="form-group ">
            <div style={{ overflow: 'auto' }}>
              <Schedule />
            </div>

          </div>
        </Dialog>
      </div>
    );
  }
}

export default DeleteUserModal;
