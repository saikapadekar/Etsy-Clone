import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import '../../src/login.css'
import { Link } from 'react-router-dom'

const Signup = () => {

    const [user, setUser] = useState({ email: '', password: '', role:'customer', isAuthenticated: false })
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
            <form noValidate 
            // onSubmit ={handleSubmit }
            >
               
               <header>
                  <h2>Register</h2>
                  <p>Register here using your username and password</p>
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
                        <br/><br/><br/>
                        <div className='buttons'>
                        <Button type="signup" variant="contained"  className="signup" 
                        // onClick={this.handleSubmit}
                        >
                            Sign Up
                        </Button>
                        </div>
            </form>
            </div>
    );
};

export default Signup;