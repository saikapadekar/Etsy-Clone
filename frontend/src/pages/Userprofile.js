/**
 * Things to do:
 * 1. Call useEffect to load userprofile data if already present--remaining
 * 2. Red asterisk to show address is mandatory --remaining
 * 3. Dropdown for country_name --remaining
 * 4. Figure out a way to store userid along with customer
 */

import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import { Divider } from '@mui/material'
import {connect, useSelector,useDispatch} from 'react-redux'
import jwt_decode from "jwt-decode";
import {createCustomer,getCustomerByEmail} from '../redux'

const useStyles = makeStyles({
    avatar : {
        height :'200px',
        width :'200px',
    },
    field : {
        paddingTop : '15px',
        fontSize : '22px',
        width : '300px',
        fontWeight : '700'
    }
});

const Userprofile = (props) => {
    const classes = useStyles();
    const user=useSelector(state=>state.user)
    const customer=useSelector(state=>state.customer)

    console.log(`Printing user value from store`,JSON.stringify(user))
    console.log(`Printing customer value from store`,JSON.stringify(customer))
    const {selectedCustomer} =customer;
    

    const {
        authenticatedUser,
        authenticated,
        userLogindetails,
        authenticatedUserDetails
      } = user;

      const [profile, setProfile] = useState({
        userid:'',
        url:'',
        name:'',
        email:'',
        about:'',
        gender:'',
        dob:'',
        city:'',
        state:'',
        country:'',
        contact_no:'',
        address:'' })
        

    const handleChange=(event)=>{
        profile.email=authenticatedUserDetails.email
        profile.userid=authenticatedUserDetails._id
        setProfile(
            {
                ...profile,
                [event.target.name] : event.target.value,
                
            }
        )
    };

    useEffect(() => {
            profile.email=authenticatedUserDetails.email
            profile.userid=authenticatedUserDetails._id
            console.log("Dispatching getCustomerByEmail" +profile.email)
            console.log(`Obtained userid:`, profile.userid)

            dispatch(getCustomerByEmail(profile.email))
    }, [profile])

    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // var decoded = jwt_decode(authenticatedUser.token);
    // profile.id=decoded.id;
    // profile.email=userLogindetails.email;

    const handleSubmit =(event) =>{
        event.preventDefault()
    console.log(`Dispatching createCustomer from Userprofile.js with profile: `,profile)
    dispatch(createCustomer(profile))
    navigate('/')
    };

    // console.log(`Printing from props`,JSON.stringify(props))


    return (
        <div>
                <br/>
                
            <h2>Your Public Profile</h2>
                <h3>Everything on this page can be seen by anyone</h3><br/><br/>
            <form className="profile-box">
            <div>
                <h3> Profile Picture: </h3><Button>Choose File</Button>
                <Avatar className={classes.avatar} src={selectedCustomer.url ? selectedCustomer.url : profile.url}>
                        </Avatar>
            
            <div>
            <TextField id="url" name="url" className ={classes.field} placeholder={selectedCustomer.url ? selectedCustomer.url :'Image' }
                            value={profile.url} 
                            onChange={handleChange} variant="outlined">
                    
                    </TextField>
                <TextField id="name" name="name" className ={classes.field} placeholder={selectedCustomer.name ? selectedCustomer.name : 'Full Name'}
                            value={profile.name} 
                            onChange={handleChange} variant="outlined">
                    
                    </TextField>
                    <br/><br/><br/>
                    <Divider />
                    {/* <TextField id="email" name="email" className ={classes.field} placeholder="email address"
                            value={profile.email} 
                            onChange={handleChange} variant="outlined">
                    
                    </TextField> */}
                    {authenticatedUserDetails.email}
                    <br/><br/><br/>
                    <Divider />

                    {/* <FormControl>
                    <RadioGroup
                    row
                    aria-labelledby="gender"
                    name="gender"
                    defaultValue="female"
                    >
                    <FormControlLabel id ="gender" name="gender" onChange={handleChange}  value={profile.gender} control={<Radio />} label="Female" />
                    <FormControlLabel id ="gender" name="gender" onChange={handleChange}  value={profile.gender} control={<Radio />} label="Male" />
                    <FormControlLabel id ="gender" name="gender" onChange={handleChange}  value={profile.gender} control={<Radio />} label="Other" />
                    
                    </RadioGroup>
                    <Divider />
                    </FormControl> */}

                    <TextField id ="address" name="address" className ={classes.field} 
                    placeholder={selectedCustomer.address ? selectedCustomer.address : 'Address'}
                    value={profile.address} label="Address" variant="outlined" onChange={handleChange}/>
                    <br/><br/><br/>
                    <Divider />

                    <TextField id ="city" name="city" className ={classes.field} 
                    placeholder={selectedCustomer.city ? selectedCustomer.city : 'City'}
                    value={profile.city} label="City" variant="outlined" onChange={handleChange}/>
                    <br/><br/><br/>
                    <Divider />

                    <TextField id ="state" name="state" className ={classes.field} 
                    placeholder={selectedCustomer.state ? selectedCustomer.state : 'State'}
                    value={profile.state} label="State" variant="outlined" onChange={handleChange}/>
                    <br/><br/><br/>
                    <Divider />

                    <TextField  id ="country" name="country" className ={classes.field} 
                    placeholder={selectedCustomer.country ? selectedCustomer.country : 'Country'}
                    value={profile.country} label="Country" variant="outlined"onChange={handleChange} />
                    <br/><br/><br/>
                    <Divider />

                    <TextField  id ="contact_no" name="contact_no" className ={classes.field} 
                    placeholder={selectedCustomer.contact_no ? selectedCustomer.contact_no : 'Contact Number'}
                    value={profile.contact_no} label="Contact No" variant="outlined" onChange={handleChange}/>
                    <br/><br/><br/>
                    <Divider />
                    {/* <TextField
                        id="date"
                        label="Birthday"
                        type="date"
                        onChange={handleChange}
                        defaultValue="1996-08-01"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    /> */}
                    <br/><br/><br/>
                    <Divider />

                    <TextField  id ="about" name="about" className ={classes.field} 
                    placeholder={selectedCustomer.about ? selectedCustomer.about : 'About'}
                    value={profile.about} label="About" variant="outlined" onChange={handleChange} />
                    <br/><br/><br/>

                    <Button variant="contained" color="success" 
                    onClick ={handleSubmit }
                    >
                    Save
                    </Button>

            </div>
            </div>
            </form>
            </div>
    );
};


const mapStateToProps = (state) => {
    return {
        customer: state.profile
      
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        createCustomer: (profile) => dispatch(createCustomer(profile)),
        getCustomerByEmail: (email) => dispatch(getCustomerByEmail(email)),

        
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Userprofile);