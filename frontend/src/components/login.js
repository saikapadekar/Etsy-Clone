import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'    
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'

import { Link } from 'react-router-dom'

//redux
import {connect} from 'react-redux'
import {loginUser} from '../redux/actions/userActions'


class login extends Component {
    
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
        const { classes } = this.props
        return (
            <div>
                <form noValidate onSubmit ={this.handleSubmit }>
                        <TextField 
                            id ="email" 
                            name="email" 
                            placeholder="Email" 
                            type="email"
                            variant="outlined"
                            value={this.state.email} 
                            onChange= {this.handleChange} fullWidth 
                        />
                         <TextField 
                            id ="password" 
                            name="password" 
                            placeholder="Password" 
                            type="password"
                            variant="outlined"
                            value={this.state.password} 
                            onChange= {this.handleChange} fullWidth 
                        />

                        <Button type="submit" variant="contained" fullWidth  >
                            Login
                        </Button>
                        <br/>
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
