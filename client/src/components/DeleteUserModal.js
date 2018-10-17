import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Button, Icon, Grid } from '@material-ui/core';
import Modal from 'react-responsive-modal';
import Schedule from './scheduleView';


const styles1 = {
  color: 'Black',
  textAlign: 'center',
  backgroundColor: 'Red',
  fontWeight: 'bold',
  padding: '20px',
};

const pstyle = {
  color: 'red',
  margin: '0px',
};

class DeleteUserModal extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,

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
    // console.log('sign-up handleSubmit, username: ');
    console.log(this.response);
    event.preventDefault();

    // request to server to delete a new username/password
    axios.get('/addDelete/')
      .then((response) => {
        console.log('Delete Route needs to be created!!');
        console.log(response);

        // if (response.data.errors) {
        //   let newErrorsObj = {
        //     companyNameErrors: [],
        //     usernameErrors: [],
        //     emailErrors: [],
        //     adminFirstNameErrors: [],
        //     adminLastNameErrors: [],
        //     cityErrors: [],
        //     countryErrors: [],
        //     postalCodeErrors: [],
        //     brandErrors: [],
        //     passwordErrors: [],
        //     passwordMatchErrors: [],
        //   };

        //   for (let key in response.data) {
        //     console.log([key]);
        //     if ([key] != 'errors') {
        //       response.data[key].forEach((element) => {
        //         newErrorsObj[key].push(element.msg);
        //       });
        //     }
        //   }
        //   this.setState(newErrorsObj);
        // } else {
        //   // this.props.updateUser({
        //   //   loggedIn: true,
        //   //   username: response.data.username,
        //   // });

        //   this.setState({
        //     redirectTo: '/',
        //   });
        // }
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

        <Button className="btn btn-primary" onClick={this.onOpenModal}>Delete Employee</Button>
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
