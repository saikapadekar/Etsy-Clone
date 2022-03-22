import React, { Component } from 'react';
import {signupUser} from '../redux/actions/userActions'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import notify from '../utils/notify';

class signup extends Component {
    state = {
        email : '',
        password : '',
        role:'customer',
        authenticated:''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        console.log("inside handleSubmit signup user");
        let redirectVar = null;
        event.preventDefault()
        var newUser = {
            email : this.state.email,
            password : this.state.password,
            role:this.state.role,
            authenticated:true
        }
        console.log("email: "+newUser.email+" password: "+newUser.password+" role: "+newUser.role);
        // console.log("history: "+this.props.history);
        const {history}=this.props;
        this.props.signupUser(newUser, history)
        .then(()=>console.log( `inside then of getShopdetails`))
        .catch((err) => {
            notify({ type: 'error', description: JSON.stringify(err.response.data.message) });
        });
        history.push('/login'); 
        console.log(JSON.stringify(history))

        // <Navigate to="/login" />
        // return(<Navigate to="/login" />);
    }

    render() {
        const { classes } = this.props
        const {authenticated}= this.state.authenticated
    // const navigate = useNavigate();

        console.log(`Printing if user is logged in`,authenticated)
        // if(authenticated)
        
        // {
        //     console.log(`Authenticated user`);
        //     return <Navigate to='/login'/>
        // }

        return (
            <div>
            <form noValidate onSubmit ={this.handleSubmit }>
               
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
                        <br/><br/><br/>
                        <div className='buttons'>
                        <Button type="signup" variant="contained"  className="signup" onClick={this.handleSubmit}>
                            Sign Up
                        </Button>
                        </div>
            </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user : state.newUser,
    errors : state.errors
})



export default (connect(mapStateToProps,{signupUser}) (signup));