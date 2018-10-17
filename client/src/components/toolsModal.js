import React from 'react';
import { Button } from '@material-ui/core';
import Modal from 'react-responsive-modal';
import SimpleTable from './SimpleTable';

class ToolsModal extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,

    };
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

        <Button className="btn" variant="contained" color="secondary" onClick={this.onOpenModal}>
        Who
          {"'"}
        s Clocked In?
        </Button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <SimpleTable />
          <br />
        </Modal>
      </div>
    );
  }
}

export default ToolsModal;
