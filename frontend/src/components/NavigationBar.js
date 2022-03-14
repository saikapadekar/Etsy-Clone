import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

class NavigationBar extends Component {
    
    state = {
        delBg : 'white',
        pickBg : '#e8e8e8'
    }

    render() {
        return (
            <div>
            <Navbar bg='light'>
                <Container>
                    <Navbar.Brand>Etsy</Navbar.Brand>
                    <InputBase
                            id="item"
                            name="item"
                            className='item'
                            placeholder='Search for anything'
                            // onChange={this.handleChange}
                            startAdornment={<SearchIcon style={{color : '#2b2b2b'}} />}
                        />
                        <Button component = {Link} to="/login" >
                                Sign in
                            </Button>
                        {/* <Nav.Link login href="login" id="login">Sign in</Nav.Link> */}
                </Container>
            </Navbar>
            </div>
        );
    }
}


export default NavigationBar