import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import { Divider } from '@mui/material'
import {connect, useSelector,useDispatch} from 'react-redux'
import jwt_decode from "jwt-decode";
import {createCustomer} from '../redux'

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
    console.log(`Printing user value from store`,JSON.stringify(user))
    const {
        authenticatedUser,
        authenticated,
        userLogindetails
      } = user;

    const handleChange=(event)=>{
        setProfile(
            {
                ...profile,
                [event.target.name] : event.target.value
            }
        )
    };

    const [profile, setProfile] = useState({
    id:'',
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
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    var decoded = jwt_decode(authenticatedUser.token);
    profile.id=decoded.id;

    const handleSubmit =(event) =>{
        event.preventDefault()
    console.log('Inside HandleSubmit Userprofile.js')
    dispatch(createCustomer(profile))
    navigate('/')
    };

    console.log(`Printing from props`,JSON.stringify(props))


    return (
        <div>
            Hello from userprofile.js
                <br/>
                
            <h2>Your Public Profile</h2>
                <h3>Everything on this page can be seen by anyone</h3><br/><br/>
            <form className="profile-box">
            <div>
                <h3> Profile Picture: </h3><Button>Choose File</Button>
                <Avatar className={classes.avatar} src={profile.url}>
                        </Avatar>
            
            <div>
            <TextField id="url" name="url" className ={classes.field} placeholder="Image"
                            value={profile.url} 
                            onChange={handleChange} variant="outlined">
                    
                    </TextField>
                <TextField id="name" name="name" className ={classes.field} placeholder="Full Name"
                            value={profile.name} 
                            onChange={handleChange} variant="outlined">
                    
                    </TextField>
                    <br/><br/><br/>
                    <Divider />
                    {/* <TextField id="email" name="email" className ={classes.field} placeholder="email address"
                            value={profile.email} 
                            onChange={handleChange} variant="outlined">
                    
                    </TextField> */}
                    {userLogindetails.email}
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

                    <TextField id ="address" name="address" className ={classes.field} value={profile.address} label="Address" variant="outlined" onChange={handleChange}/>
                    <br/><br/><br/>
                    <Divider />

                    <TextField id ="city" name="city" className ={classes.field} value={profile.city} label="City" variant="outlined" onChange={handleChange}/>
                    <br/><br/><br/>
                    <Divider />

                    <TextField id ="state" name="state" className ={classes.field} value={profile.state} label="State" variant="outlined" onChange={handleChange}/>
                    <br/><br/><br/>
                    <Divider />

                    <TextField  id ="country" name="country" className ={classes.field} value={profile.country} label="Country" variant="outlined"onChange={handleChange} />
                    <br/><br/><br/>
                    <Divider />

                    <TextField  id ="contact_no" name="contact_no" className ={classes.field} value={profile.contact_no} label="Contact No" variant="outlined" onChange={handleChange}/>
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

                    <TextField  id ="about" name="about" className ={classes.field} value={profile.about} label="About" variant="outlined" onChange={handleChange} />
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
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Userprofile);