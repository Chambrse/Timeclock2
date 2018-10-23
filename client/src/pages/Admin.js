import PropTypes from 'prop-types';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import AddUserModal from '../components/AddUserModal';
import DeleteUserModal from '../components/DeleteUserModal';
// import Tools from '../components/toolsModal';


function Admin(props) {
  const { adminUsername } = props;
  return (
    <div>
      <Paper elevation={10}>
        <br />
        <h1> Admin Tools</h1>
        <p id="Employee"> Add Employee Or Delete Employee </p>
        <AddUserModal adminUsername={adminUsername} />
        <br />
        <br />
        <DeleteUserModal />
        <br />
        <br />
        {/* <Tools /> */}
        <br />
      </Paper>
    </div>
  );
}

Admin.propTypes = {
  adminUsername: PropTypes.string.isRequired,
};

export default Admin;
