import React from 'react';
import AddUserModal from '../components/AddUserModal';
import DeleteUserModal from '../components/DeleteUserModal';

function Admin() {
  return (
    <div>
      <div>
        <h1> Admin Tools</h1>
        <p id="Employee"> Add Employee Or Delete Employee </p>
        <AddUserModal />
        <br />
        <br />
        <br />
        <DeleteUserModal />
      </div>
    </div>
  );
}

export default Admin;
