import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import '../../src/login.css'
import { Link } from 'react-router-dom'



const Login = () => {

        const [user, setUser] = useState({ email: '', password: '', isAuthenticated: false })
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange=(event)=>{
        setUser(
            {
                ...user,
                [event.target.name] : event.target.value
            }
        )
    };
    return (
        <div>
            Hello from Login.js
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
                            value={user.email} 
                            onChange= {handleChange}
                        />
                <TextField 
                            id ="password" 
                            name="password" 
                            placeholder="Password" 
                            type="password"
                            className="textField"
                            variant="outlined"
                            value={user.password} 
                            onChange= {handleChange}
                        />
                        </div>
                        <br/>
                        <div className='buttons'>
                        <Button type="submit" variant="contained"  className="submit" 
                        // onClick ={this.handleSubmit } 
                        component = {Link} to="/">
                            Sign In
                        </Button>
                        <Button type="signup" variant="contained"  className="signup" component = {Link} to="/signup" >
                            Sign Up
                        </Button>
                        </div>
            </form>
        </div>
    );
};

export default Login;