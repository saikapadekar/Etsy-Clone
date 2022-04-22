import React, {  useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import '../../src/login.css'
import { Link } from 'react-router-dom'
import {signupUser} from '../redux'
import { connect,useDispatch } from 'react-redux';

const Signup = () => {

    const [user, setUser] = useState({ email: '', password: '', role:'customer'})
    const [isAuthenticated,setAuthenticated]=useState({isAuthenticated: false})
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange=(event)=>{
        setUser(
            {
                ...user,
                [event.target.name] : event.target.value
            }
        )
    };

    // const signupUser =(user)=>{
    //     axios
	// 		.post('http://localhost:7000/auth/signup', user)
	// 		.then(response => {
	// 			// const { token } = response.data;
    //             setCookie({ path: '/login' });
    //             // setAuthenticated({
    //             //     isAuthenticated:true
    //             // })
    //             console.log('Signup successful')
    //             navigate('/login')
	// 		})
	// 		.catch(error => {
	// 			console.log(error)
	// 		})

    // };

    // useEffect(() => {
    //     signupUser(user)
    //   }, [])

    const handleSubmit=(event)=>{
        event.preventDefault()
        console.log('Inside HandleSubmit Signup.js')
        dispatch(signupUser(user))
        navigate('/login')
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
                        onClick={handleSubmit} component = {Link} to="/login"
                        >
                            Sign Up
                        </Button>
                        </div>
            </form>
            </div>
    );
};
const mapStateToProps = (state) => {
    return {
      userData: state.user
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        signupUser: (user) => dispatch(signupUser(user))
    }
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(Signup);