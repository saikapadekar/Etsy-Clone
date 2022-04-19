import React, { useEffect, useState } from 'react';
import { connect,useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import '../../src/login.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { setCookie,getCookie } from 'react-use-cookie';
import {loginUser,addLoginDetails} from '../redux'
import {  Navigate } from "react-router-dom";
import {useSelector} from 'react-redux'


const Login = (props) => {

    const [user, setUser] = useState({ email: '', password: ''})
    const [authentication,setAuthenticated]=useState({isAuthenticated: false})

    
    
    // const [userFromButtonClick, setuserFromButtonClick] = useState({ email: '', password: ''})

    const dispatch = useDispatch()

    // const dispatch = useDispatch();
    const navigate = useNavigate();

    // const loginUser =(user)=>{
    //     axios
	// 		.post('http://localhost:7000/auth/login', user)
	// 		.then(response => {
	// 			const { token } = response.data;
    //             setCookie('auth', token, { path: '/' });
    //             setAuthenticated({
    //                 isAuthenticated:true
    //             })
    //             console.log('Login successful')
	// 		})
	// 		.catch(error => {
	// 			console.log(error)
	// 		})

    // };
    
    // useEffect(() => {
    //     console.log('Inside useEffect Login')
    //     axios
	// 		.post('http://localhost:7000/auth/login', userFromButtonClick)
	// 		.then(response => {
	// 			const { token } = response.data;
    //             setCookie('auth', token, { path: '/' });
    //             setAuthenticated({
    //                 authentication:true
    //             })
    //             console.log('Login successful')
	// 		})
	// 		.catch(error => {
	// 			console.log(error)
	// 		})
    //   }, [userFromButtonClick])

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
    dispatch(loginUser(user))
    dispatch(addLoginDetails(user))
    setAuthenticated(true)
    navigate('/')
};

console.log(`Printing the value of authentication`,authentication)
console.log(`Printing the value of user`,user)
// console.log(`Printing the value of state.user`,state.user)

console.log(`Printing from props`,JSON.stringify(props))
// let redirectVar=null;
//         if(user.email !== ''){//to figure out
//             console.log('Inside Login.js Navigating to home because token found')
//             redirectVar = < Navigate to= "/" />
//         }

    return (
        
        <div>
            {/* {redirectVar} */}
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
        addLoginDetails:(user) => dispatch(addLoginDetails(user))
    }
  }
  

export default connect(mapStateToProps
    ,mapDispatchToProps
    )(Login);