import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'    
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase'
import '../../src/login.css'
import { Link } from 'react-router-dom'

//redux
import {connect} from 'react-redux'
import {loginUser} from '../redux/actions/userActions'

const styles = theme => ({
    textField: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',            
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500
    },
    input: {
        color: 'white'
    }
});
class login extends React.Component {
    
    state = {
        email : '',
        password : ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        var newUser = {
            email : this.state.email,
            password : this.state.password
        }
        this.props.loginUser(newUser, this.props.history)
    }

    render() {
        const { classes } = this.props;
        return (
            
            <div>
            <form noValidate onSubmit ={this.handleSubmit }>
               
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
                        <Button type="submit" variant="contained"  className="submit" >
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
    user : state.user,
    errors : state.errors
})

export default connect(mapStateToProps, {loginUser} )((login))
