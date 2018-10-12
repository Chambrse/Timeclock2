import React, { Component } from 'react'
import Clock from './clock'
import Admin from './Admin'


var styles1 = {
	color:'red',
    textAlign:'center',
	backgroundColor:'black',
	fontWeight:'bold',
    padding:'20px'
};
var styles2 = {
	color:'Green',
    textAlign:'right',
	backgroundColor:'orange',
	fontWeight:'bold',
    padding:'20px'
};
// console.log("User.js"+this.user);
//   render: function(){
//     var user = JSON.parse(localStorage.getItem('user'));
//   ...
//     return (
//       <div>
//         <h2>Welcome, {user.firstname1}!</h2>
//       </div>
class User extends Component {
    
    render() {
        // console.log(user);
        const user ={
firstname1:"Keith Jones",
isAdmin:true,
} 

        return (
            <div>
                <div>
                    <h2>Welcome, {user.firstname1}!</h2>
                    {/* <h1>Hello Keith</h1> */}
                    {/* Code to pull in active user */}
                    <div className="row">

                        <Clock size={300} timeFormat="24hour" hourFormat="standard" />&emsp;
                                                 <ul>
                                 <li>
                                     Monday: 8AM-5PM
                                     </li>
                                 <li>
                                    
                                     Tuesday: 8AM-5PM
                                     </li>
                                 <li>
                                     Wednesday: 8AM-5PM
                                     </li> 
                                 <li> 
                                     Thursday: 8AM-5PM
                                     </li>
                                 <li>
                                     Fiday: 8AM-5PM
                                     </li>
                                 <li>
                                     Saturday: Off
                                     </li>
                                 <li>
                                     Sunday: Off
                                     </li>
                             </ul>
                        <img id="Keith" img src="http://images6.fanpop.com/image/user_images/5768000/kebo83-5768074_650_567.jpg" width="225" height="200" alt="Keith Jones" className="col-lg-3"></img>
                    </div>
                    <div className="row"style={styles1}>
                    {/* {col1}{col2} */}
                        <div className="col-lg-3">
                        stuff
                            {/* </div> */}
                        <div className="col-lg-3">
                            <h6>CEO / CO-FOUNDER</h6>
                            <h4>Keith Jones</h4>

<Admin></Admin>                            
                            <p id="ClockIN/OUT"> See Your Clock Status Here!! </p>

{/* <div */}
 {/* style={styles2}> */}
                        
                           
                            <button  onClick={() => { document.getElementById("ClockIN/OUT").innerHTML = "You Are Now Clocked IN!" }} style={styles2} color="primary" >
                                Clock In
                        </button>
                            <br></br>
                            <button onClick={() => { console.log(document.getElementById("ClockIN/OUT").innerHTML = "You Are Now Clocked OUT!") }} color="primary" >
                                Clock Out
                         </button>
                          {/* </div> */}
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default User