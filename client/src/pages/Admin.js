import PropTypes from 'prop-types';
import React from 'react';
import AddUserModal from '../components/AddUserModal';
import DeleteUserModal from '../components/DeleteUserModal';


function Admin(props) {
  const { adminUsername } = props;
  return (
    <div>
      <div>
        <h1> Admin Tools</h1>
        <p id="Employee"> Add Employee Or Delete Employee </p>
        <AddUserModal adminUsername={adminUsername} />
        <br />
        <br />
        <br />
        <DeleteUserModal />
      </div>
    </div>
  );
}

Admin.propTypes = {
  adminUsername: PropTypes.string.isRequired,
};

export default Admin;
