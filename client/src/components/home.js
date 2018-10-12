import React, { Component } from 'react'
import { Button, Icon, Grid } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import color from '@material-ui/core/colors/pink';
import axios from 'axios'

const styles1 = {
    color: 'Black',
    textAlign: 'center',
    backgroundColor: 'Green',
    fontWeight: 'bold',
    padding: '20px'
};
const styles2 = {
    color: 'Black',
    textAlign: 'center',
    backgroundColor: 'Yellow',
    fontWeight: 'bold',
    padding: '20px'
};

class Home extends Component {
    constructor() {
        super()
    
this.routeChange = this.routeChange.bind(this);
this.routeChange2 = this.routeChange2.bind(this);
   
   }
   routeChange(){
    let path = "/login";
    this.props.history.push(path);
   }
   
   routeChange2(){
    let path = "/signup";
    this.props.history.push(path);
    }
    
    render() {

        const imageStyle = {
            width: 300,
            height:200,
            
        }
        
            return (
            <div >
                
                   
                 <p >Welcome to</p>
                   <Grid item xs={12}>
                <img style={imageStyle} src={ require('../TC9000.jpg') }></img>
                   </Grid>
                   <br ></br>
                   <p>Please click the Log-in or Sign-Up Button below to be redirected to the appropriate page.</p>
                   <Button onClick={this.routeChange}style={styles1}>
                       Login
                   </Button>&emsp;
                   <Button onClick={this.routeChange2}style={styles2}>
                       Sign-Up
                   </Button>
            </div>
        )
        }

    }


export default Home
