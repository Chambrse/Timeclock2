import React, { Component } from 'react'
import { Button, Icon, Grid } from '@material-ui/core'
import AddUserModal from '../components/AddUserModal'
import DeleteUserModal from '../components/DeleteUserModal'


const styles1 = {
    color: 'Black',
    textAlign: 'center',
    backgroundColor: 'Red',
    fontWeight: 'bold',
    padding: '20px'
};
const styles2 = {
    color: 'Black',
    textAlign: 'center',
    backgroundColor: 'Green',
    fontWeight: 'bold',
    padding: '20px'
};

//   render: function(){
//     var user = JSON.parse(localStorage.getItem('user'));
//   ...
//     return (
//       <div>
//         <h2>Welcome, {user.firstname1}!</h2>
//       </div>
class Admin extends Component {
    render() {
        // console.log(user);
        //         const user ={
        // firstname1:"Keith Jones",
        // } 
        return (
            <div>
                <div>
                    {/* <h2>Welcome, {user.username}!</h2> */}
                    <h1> Admin Tools</h1>
                    {/* Code to pull in active user */}

                    <p id="Employee"> Add Employee Or Delete Employee </p>

<AddUserModal></AddUserModal>

                    {/* <Button
                       style={styles2}
                        onClick={this.handleAdd}
                        type="submit">Add</Button> */}
                    <br></br>
                    <br></br>
                    <br></br>
                    <DeleteUserModal></DeleteUserModal>
                    {/* <Button
                        style={styles1}
                        onClick={this.handleDelete}
                        type="submit">Delete</Button> */}
                   

                </div>
            </div>

        );
    }
}
export default Admin