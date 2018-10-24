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
import profile from '../blank-profile-picture.png';


class ChangePhotoModal extends Component {
  constructor({ id }) {
    super();
    this.state = {
      open: false,
      photo: '',
      id,
      imageURL: profile,
    }; // end this.state = {
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUploadImage2 = this.handleUploadImage2.bind(this);
    // this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  // end constructor() {


  onOpenModal = () => this.setState({ open: true });

  onCloseModal = () => this.setState({ open: false });

  // handleUploadImage(ev) {
  //   ev.preventDefault();
  //   console.log('working');
  //   const data = new FormData();
  //   data.append('file', this.uploadInput.files[0]);
  //   data.append('filename', this.fileName.value);

  //   fetch('http://localhost:8080/upload', {
  //     method: 'POST',
  //     body: data,
  //   }).then((response) => {
  //     response.json().then((body) => {
  //       this.setState({ imageURL: `http://localhost:8080/${body.file}` });
  //     });
  //   });
  // }


  handleUploadImage2(event) {
    const { id, photo, imageURL } = this.state;
    event.preventDefault();
    console.log('Change photo event: ', event);
    console.log(this.uploadInput.files[0]);
    console.log(this.fileName.value);
    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);
    console.log(data);
    // if (photo === !'') {
    axios.post('/upload', this.state).then((response) => {
      console.log('Response', response);
      // response.json().then((body) => {
      this.setState({ imageURL: this.uploadInput.files[0] });
      console.log(imageURL);
      if (response.status === 400) {
        alert(response.data.errors);
      } else {
        alert('Unable to load Photo');
      }
    }).catch((error) => {
      // handle error
      console.log(error);
      // alert('Error: Unable to change the password. Please try again.');
    });
    // }

    // this.setState({ open: false });
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <div> Click the photo to change!</div>
        <Button color="secondary" onClick={this.onOpenModal}>
          <img
            id="PIC"
            img
            src={this.state.imageURL}
            // onClick={this.handleEvent}
            width="200"
            height="200"
            alt="img"
          />
        </Button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="container">
            {/* <form onSubmit={this.handleUpload}>
              <div className="form-group">
                <input className="form-control" ref={(ref) => { this.uploadInput = ref; }} type="file" />
              </div>

              {/* <div className="form-group">
                <input className="form-control" ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Optional name for the file" />
              </div> */}

            {/* <button className="btn btn-success" type>Upload</button> */}

            {/* </form> */}
            {/* </div> */}
            <form onSubmit={this.handleUploadImage}>
              <div>
                <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
              </div>
              <div>
                <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
              </div>
              <br />
              <div>
                <button>Upload</button>
              </div>
              <img src={this.state.imageURL} alt="img" height="50%" width="50%" />
            </form>
          </div>
        </Modal>
      </div>
    );
  }// end render() {
} // end class ChangePhotoModal extends Component {


export default ChangePhotoModal;
