import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import InputBase from '@material-ui/core/InputBase'
import { withStyles } from '@material-ui/core/styles';
import {Navbar, Nav, NavItem, NavLink} from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import {connect} from 'react-redux'
import store from '../redux/store'
import { Link,Outlet } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import MuiLink from '@material-ui/core/Link'
import FaceIcon from '@mui/icons-material/Face';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import faceMasks from '../pages/assets/masks.png'; 
import wall_decor from '../pages/assets/wall_decor.png'; 
import gift from '../pages/assets/gift.png'; 
import garden from '../pages/assets/garden.png'; 
import self_care from '../pages/assets/self_care.png'; 
import craft from '../pages/assets/craft.png'; 


const styles = (theme) => ({
    ...theme.spread,
    button: {
        color: '#222',
        textTransform : 'capitalize',
        visibility: 'visible',
        margin: '0',
        marginLeft: '30px',
        fontFamily: 'Graphik Webfont,-apple-system,Helvetica Neue,Droid Sans,Arial,sans-serif',
        fontWeight: '900',
        fontSize: '12px',
        lineHeight: '28px'
    },
    logout: {
        color: '#222',
        textTransform : 'capitalize',
        visibility: 'visible',
        margin: '0',
        marginLeft: '0px',
        fontFamily: 'Graphik Webfont,-apple-system,Helvetica Neue,Droid Sans,Arial,sans-serif',
        fontWeight: '500',
        fontSize: '12px',
        lineHeight: '28px'
    },
    button2: {
        color: '#222',
        textTransform : 'capitalize',
        visibility: 'visible',
        margin: '0',
        marginTop:'0',
        marginLeft: '20px',
        fontFamily: 'Graphik Webfont,-apple-system,Helvetica Neue,Droid Sans,Arial,sans-serif',
        fontWeight: '50',
        fontSize: '13px',
        lineHeight: '28px'
    },
    item:{
        border:'2px',
        borderStyle:'solid',
        borderRadius:'96px',
        marginTop:'15px',
        marginBottom:'0',
        width:'75%',
        backgroundColor : '#e8e8e6',
        lineHeight:'28px',
        height:'48px',
        paddingTop:'9px',
        paddingBottom: '9px',
        paddingRight: '42px !important',
        paddingLeft: '18px',
        fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
    }
})

class NavigationBar extends Component {
    
    state = {
        delBg : 'white',
        pickBg : '#e8e8e8'
    }

    render() {
        const { classes } = this.props
        const {authenticated, authenticatedUser} = this.props.user
        console.log(`inside NavigationBar.js Is user authenticated? `,authenticated)

        return (
            <div>
            <Navbar bg='light'>
                <Container>
                    <Navbar.Brand href='/'>Etsy</Navbar.Brand>
                    <InputBase
                            id="item"
                            name="item"
                            className={classes.item}
                            placeholder='Search for anything'
                            // onChange={this.handleChange}
                            startAdornment={<SearchIcon style={{color : '#2b2b2b'}} />}
                        />
                        <Button size="large" startIcon={<FavoriteIcon />}>
                        </Button>
                       {(!authenticated && <Button size="large" startIcon={<FaceIcon />}  component = {Link} to="/login">
                        </Button>)}
                        {authenticated && (<Button size="large" startIcon={<AccountCircleIcon />}  component = {Link} to="/userprofile">
                        </Button>)}
                            <Button startIcon={<ShoppingCartIcon />} component = {Link} to="/cart">
                            </Button>  
                            {authenticated && (<Button className={classes.logout}  size="small" startIcon={<LogoutIcon />}  component = {Link} to="/logout">
                        </Button>)}                       
                            
                            <br/>
                            <br/>
                            <Button className={classes.button2} component = {Link} to="/products" >Home Favorites</Button>
                            <Button className={classes.button2} component = {Link} to="/products" >Jewelry & Accessories</Button>
                            <Button className={classes.button2} component = {Link} to="/products" >Clothing & Shoes</Button>
                            <Button className={classes.button2} component = {Link} to="/products" >Home & Living</Button>
                            <Button className={classes.button2} component = {Link} to="/products" >Wedding & Party</Button>
                            <Button className={classes.button2} component = {Link} to="/products" >Toys & Entertainment</Button>
                            <Button className={classes.button2} component = {Link} to="/products" >Art & Collectibles</Button>
                            <Button className={classes.button2} component = {Link} to="/products" >Craft Supplies</Button>
                            <Button className={classes.button2} component = {Link} to="/products" >Gifts & Gift Cards</Button>
                        {/* <Nav.Link login href="login" id="login">Sign in</Nav.Link> */}
                </Container>
            </Navbar>
            <div className='blue-box'>
                Find things you'll love. Support independent sellers. Only on Etsy.
                <br/><br/>               
                <MuiLink to="/products">
                    <a classname="img_links" href='' className="faceMasks">
                        <img className="faceMasks" src={faceMasks} alt=""/>
                    </a>
                    
                </MuiLink>  &emsp;
                <MuiLink to="/products">
                    <a href='' className="wall_decor">
                        <img className="wall_decor" src={wall_decor} alt=""/> 
                    </a>
                </MuiLink>&emsp;
                <MuiLink to="/products">
                    <a href='' className="gift">
                        <img className="gift" src={gift} alt=""/> 
                       
                    </a>
                </MuiLink>&emsp;
                <MuiLink to="/products">
                    <a href='' className="garden">
                        <img className="garden" src={garden} alt=""/> 
                       
                    </a>
                </MuiLink>&emsp;
                <MuiLink to="/products">
                    <a href='' className="self_care">
                        <img className="self_care" src={self_care} alt=""/>
                        
                    </a>
                </MuiLink>&emsp;
                <MuiLink to="/products">
                    <a href='' className="craft">
                        <img className="craft" src={craft} alt=""/> 
                       
                    </a>
                </MuiLink>&emsp;
                
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    user : state.user
})


export default connect(mapStateToProps, {} )(withStyles(styles)(NavigationBar))