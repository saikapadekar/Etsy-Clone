import React, { useEffect, useState } from 'react';
import { connect,useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import '../../src/login.css'
import { Link } from 'react-router-dom'
import {loginUser,addLoginDetails,getAuthenticatedUser} from '../redux'

const Login = (props) => {

    const [user, setUser] = useState({ email: '', password: ''})
    const [authentication,setAuthenticated]=useState({isAuthenticated: false})
    const dispatch = useDispatch()
    const navigate = useNavigate();


    const handleChange=(event)=>{
        setUser(
            {
                ...user,
                [event.target.name] : event.target.value
            }
        )
    };

const handleSubmit =(event) => {
    event.preventDefault()
    console.log('Inside HandleSubmit Login.js')

    console.log(`Dispatching addLoginDetails, loginuser for user: `, JSON.stringify(user))
    console.log(`Dispatching getAuthenticatedUser for user.email: `, JSON.stringify(user.email))

    dispatch(addLoginDetails(user))

    dispatch(loginUser(user))

    dispatch(getAuthenticatedUser(user.email))
    .then(()=>{
        localStorage.setItem('email',user.email)
    })
    setAuthenticated(true)
    navigate('/')
};

console.log(`Printing the value of authentication`,authentication)
console.log(`Printing the value of user`,user)

console.log(`Printing from props`,JSON.stringify(props))

    return (
        
        <div>
            {/* {redirectVar} */}
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
                        onClick ={handleSubmit} 
                        component = {Link} to="/"
                        >
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


const mapStateToProps = (state) => {
    return {
      userData: state.user,
      authenticated: state.authentication,
      
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        loginUser: (user) => dispatch(loginUser(user)),
        addLoginDetails:(user) => dispatch(addLoginDetails(user)),
        getAuthenticatedUser:(email) => dispatch(getAuthenticatedUser(email))

    }
  }
  

export default connect(mapStateToProps
    ,mapDispatchToProps
    )(Login);