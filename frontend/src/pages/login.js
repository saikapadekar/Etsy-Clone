import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import '../../src/login.css'
import { Link } from 'react-router-dom'
//redux
import {connect} from 'react-redux'
import {loginUser} from '../redux/actions/userActions'
import notify from '../utils/notify';

class login extends React.Component {
    

    constructor() {
        super();
        this.state = {
            email : '',
            password : '',
            authenticated:''
        };
      }
    

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        console.log("inside handleSubmit login.js");
        event.preventDefault()
        var newUser = {
            email : this.state.email,
            password : this.state.password,
            authenticated:true
        }
        console.log("email: "+newUser.email+"password"+newUser.password);
        console.log("history: "+this.props.history);
        this.props.loginUser(newUser, this.props.history)
        .then(()=>console.log( `inside then of getShopdetails`))
        .catch((err) => {
            notify({ type: 'error', description: JSON.stringify(err.response.data.message) });
        });
        this.props.history.push('/')
        event.preventDefault()
        const loggedin_user=React.createContext();//todo
    }

    render() {
        
        return (
            
            <div>
            <form noValidate >
               
               <header>
                  <h2>Sign in</h2>
                  <p>login here using your username and password</p>
               </header>
               <br/>
               <div className='input'>
               <TextField 
                            id ="email" 
                            name="email" 
                            placeholder="Email" 
                            type="email"
                            className="textField"
                            variant="outlined"
                            value={this.state.email} 
                            onChange= {this.handleChange}
                        />
                <TextField 
                            id ="password" 
                            name="password" 
                            placeholder="Password" 
                            type="password"
                            className="textField"
                            variant="outlined"
                            value={this.state.password} 
                            onChange= {this.handleChange}
                        />
                        </div>
                        <br/>
                        <div className='buttons'>
                        <Button type="submit" variant="contained"  className="submit" onClick ={this.handleSubmit } component = {Link} to="/">
                            Sign In
                        </Button>
                        <Button type="signup" variant="contained"  className="signup" component = {Link} to="/signup" >
                            Sign Up
                        </Button>
                        </div>
            </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.newUser,
    errors : state.errors,
    
})

export default connect(mapStateToProps, {loginUser} )((login))
