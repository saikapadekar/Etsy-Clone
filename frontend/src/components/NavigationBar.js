

// class NavigationBar extends Component {
    
//     constructor() {
//         super();
//         this.state = {
//             keyword:''
//         };
//       }
    
//     handleSearch = () => {
//         this.setState({
//             keyword:this.state.keyword,
//         })
//         console.log(`Keyword is: `,this.state.keyword)
//     }
//     render() {
//         const { classes } = this.props
//         const {authenticated, authenticatedUser,shopdetails} = this.props.user
//         console.log(`inside NavigationBar.js Is user authenticated? `,authenticated)

//         return (
//             <div>
//             <Navbar bg='light'>
//                 <Container>
//                     {/* <LinkContainer onClick={this.handleSubmit} component = {Link} to="/"> */}
//                     <Button className={classes.brand} component = {Link} to="/">Etsy</Button>
//                     {/* <Navbar.Brand >Etsy</Navbar.Brand> */}
                   
//                     <InputBase
//                             id="item"
//                             name="item"
//                             type="name"
//                             className={classes.item}
//                             placeholder='Search for anything'
//                             // onChange={this.handleChange}
//                             startAdornment={<SearchIcon style={{color : '#2b2b2b'}} />}
//                             onChange={this.handleSearch}
//                             value={this.state.keyword} 
//                         />
//                         <Button size="large" startIcon={<FavoriteIcon />} component = {Link} to="/favorite">
//                         </Button>
//                         {(!authenticated && <PopupState variant="popover" popupId="demo-popup-menu">
//   {(popupState) => (
//     <React.Fragment>
//         {(!authenticated && <Button size="large" startIcon={<FaceIcon />} {...bindTrigger(popupState)}>
//                         </Button>)}
//       <Menu {...bindMenu(popupState)}>
//         <MenuItem onClick={popupState.close} component = {Link} to="/login">Login</MenuItem>
//         {!shopdetails && (<MenuItem onClick={popupState.close} component = {Link} to="/shopname">Sell On Etsy</MenuItem>)}
//         {shopdetails && (<MenuItem onClick={popupState.close} component = {Link} to="/shop">Sell On Etsy</MenuItem>)}
//         <MenuItem onClick={popupState.close} component = {Link} to="/logout">Logout</MenuItem>
//       </Menu>
//     </React.Fragment>
//   )}
// </PopupState>)}
// {(authenticated && <PopupState variant="popover" popupId="demo-popup-menu">
//   {(popupState) => (
//     <React.Fragment>
//         {(authenticated && <Button size="large" startIcon={<AccountCircleIcon />} {...bindTrigger(popupState)}>
//                         </Button>)}
//       <Menu {...bindMenu(popupState)}>
//         <MenuItem onClick={popupState.close} component = {Link} to="/userprofile">Profile</MenuItem>
//         <MenuItem onClick={popupState.close} component = {Link} to="/shopname">Sell On Etsy</MenuItem>
//         <MenuItem onClick={popupState.close} component = {Link} to="/shop">My Shop</MenuItem>
//         <MenuItem onClick={popupState.close}><a href="/">Logout</a></MenuItem>
//       </Menu>
//     </React.Fragment>
//   )}
// </PopupState>)}
//                        {/* {(!authenticated && <Button size="large" startIcon={<FaceIcon />}  component = {Link} to="/login">
//                         </Button>)}
//                         {authenticated && (<Button size="large" startIcon={<AccountCircleIcon />}  component = {Link} to="/userprofile">
//                         </Button>)} */}
//                             <Button startIcon={<ShoppingCartIcon />} component = {Link} to="/cart">
//                             </Button> 
//                             {/* {authenticated && (<Button className={classes.logout}  size="small" startIcon={<ShopIcon />}  component = {Link} to="/logout">
//                         </Button>)}   
//                             {authenticated && (<Button className={classes.logout}  size="small" startIcon={<LogoutIcon />}  component = {Link} to="/shopname">
//                         </Button>)}                        */}
                            
//                             <br/>
//                             <br/>
//                             <Button className={classes.button2} component = {Link} to="/products" >Home Favorites</Button>
//                             <Button className={classes.button2} component = {Link} to="/products" >Jewelry & Accessories</Button>
//                             <Button className={classes.button2} component = {Link} to="/products" >Clothing & Shoes</Button>
//                             <Button className={classes.button2} component = {Link} to="/products" >Home & Living</Button>
//                             <Button className={classes.button2} component = {Link} to="/products" >Wedding & Party</Button>
//                             <Button className={classes.button2} component = {Link} to="/products" >Toys & Entertainment</Button>
//                             <Button className={classes.button2} component = {Link} to="/products" >Art & Collectibles</Button>
//                             <Button className={classes.button2} component = {Link} to="/products" >Craft Supplies</Button>
//                             <Button className={classes.button2} component = {Link} to="/products" >Gifts & Gift Cards</Button>
//                         {/* <Nav.Link login href="login" id="login">Sign in</Nav.Link> */}
//                 </Container>
//             </Navbar>
//             </div>
//         );
//     }
// }
// const mapStateToProps = (state) => ({
//     user : state.user
// })


// export default connect(mapStateToProps, {} )(withStyles(styles)(NavigationBar))

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Navbar} from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MenuItem,Menu } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import FaceIcon from '@mui/icons-material/Face';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const useStyles = makeStyles({
    brand:{
        color:'rgb(240, 92, 38)',
        fontSize:'32px',
        fontFamily:'Graphik Webfont,-apple-system,Helvetica Neue,Droid Sans,Arial,sans-serif',
        fontWeight:'bold',
        textTransform:'none',
        marginLeft:'20px'
    },
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
    },
  });

const NavigationBar = () => {
    const classes = useStyles();
    return (
        <div>
            <Navbar bg='light'>
                <Container>
                <Button className={classes.brand} component = {Link} to="/">Etsy</Button>
                <InputBase
                            id="item"
                            name="item"
                            type="name"
                            className={classes.item}
                            placeholder='Search for anything'
                            // onChange={this.handleChange}
                            startAdornment={<SearchIcon style={{color : '#2b2b2b'}} />}
                            // onChange={this.handleSearch}
                            // value={this.state.keyword} 
                        />
                        <Button size="large" startIcon={<FavoriteIcon />} component = {Link} to="/favorite">
                        </Button>
                        {(<PopupState variant="popover" popupId="demo-popup-menu">
  {(popupState) => (
    <React.Fragment>
        {(<Button size="large" startIcon={<FaceIcon />} {...bindTrigger(popupState)}>
                        </Button>)}
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={popupState.close} component = {Link} to="/login">Login</MenuItem>
        { (<MenuItem onClick={popupState.close} component = {Link} to="/shopname">Sell On Etsy</MenuItem>)}
        { (<MenuItem onClick={popupState.close} component = {Link} to="/shop">Sell On Etsy</MenuItem>)}
        <MenuItem onClick={popupState.close} component = {Link} to="/logout">Logout</MenuItem>
      </Menu>
    </React.Fragment>
  )}
</PopupState>)}
                        {/* {( <PopupState variant="popover" popupId="demo-popup-menu">
  {(popupState) => (
    <React.Fragment>
        {( <Button size="large" startIcon={<AccountCircleIcon />} {...bindTrigger(popupState)}>
                        </Button>)}
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={popupState.close} component = {Link} to="/userprofile">Profile</MenuItem>
        <MenuItem onClick={popupState.close} component = {Link} to="/shopname">Sell On Etsy</MenuItem>
        <MenuItem onClick={popupState.close} component = {Link} to="/shop">My Shop</MenuItem>
        <MenuItem onClick={popupState.close}><a href="/">Logout</a></MenuItem>
      </Menu>
    </React.Fragment>
  )}
</PopupState>)} */}
<Button startIcon={<ShoppingCartIcon />} component = {Link} to="/cart">
                            </Button> 
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
                </Container>
                </Navbar>
        </div>
    );
};

export default NavigationBar;