import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
// import user from 'https://cmpe273-lab.s3.us-east-2.amazonaws.com/neonsign.png'


import user from '../components/assets/user.png'
import TextField from '@material-ui/core/TextField'
import { Divider,FormControlLabel,Radio,FormControl,Stack } from '@mui/material'
import jwt_decode from "jwt-decode";
import {connect} from 'react-redux'
import {createCustomer} from '../redux/actions/userActions'

const styles = (theme) => ({
    ...theme.spread,
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

class userprofile extends Component {
constructor(props) {
    super(props);
    this.state={
        edit:false,
        id:'',
        url:'',
        name:'',
        email:this.props.user.email,
        about:'',
        gender:'',
        dob:'',
        city:'',
        state:'',
        country:'',
        contact_no:'',
        address:''
    }
    
}
handleChange = (event) => {
    this.setState({
        [event.target.name] : event.target.value
    })
}

handleSubmit=(event)=>{
    console.log("inside handleSubmit userprofile.js");
        event.preventDefault()
        var newUser = {
            id:this.state.id,
            url:this.state.url,
        name:this.state.name,
        email:this.state.email,
        about:this.state.about,
        gender:this.state.gender,
        dob:this.state.dob,
        city:this.state.city,
        state:this.state.state,
        country:this.state.country,
        contact_no:this.state.contact_no,
        address:this.state.address
        }
        console.log(JSON.stringify(newUser))
        event.preventDefault()
        this.props.createCustomer(newUser,this.props.history)
        this.props.history.push('/')
        event.preventDefault()


}


    render() {
        const user='https://cmpe273-lab.s3.us-east-2.amazonaws.com/lamp.png'

        const {classes} = this.props
        const {authenticated, authenticatedUser,selectedUser} = this.props.user
        
        var decoded = jwt_decode(authenticatedUser.token);
 
        console.log(`decoded`,decoded.id);
        console.log(authenticatedUser.token)
        console.log(authenticated)
        console.log(selectedUser)

        

        this.state.id=decoded.id;
        this.state.dob="1996-08-01";

        // const edit=this.state.edit;
        console.log(`Printing email inside userprofile.js`,JSON.stringify(this.props.email))
        return (
            <div>
                <br/>
                
            <h2>Your Public Profile</h2>
                <h3>Everything on this page can be seen by anyone</h3><br/><br/>
            <form className="profile-box">
            <div>
                <h3> Profile Picture: </h3><Button>Choose File</Button>
                <Avatar className={classes.avatar} src={this.state.url}>
                        </Avatar>
            
            <div>
            <TextField id="url" name="url" className ={classes.field} placeholder="Image"
                            value={this.state.url} 
                            onChange={this.handleChange} variant="outlined">
                    
                    </TextField>
                <TextField id="name" name="name" className ={classes.field} placeholder="Full Name"
                            value={this.state.name} 
                            onChange={this.handleChange} variant="outlined">
                    
                    </TextField>
                    <br/><br/><br/>
                    <Divider />
                    <TextField id="email" name="email" className ={classes.field} placeholder="email address"
                            value={this.state.email} 
                            onChange={this.handleChange} variant="outlined">
                    
                    </TextField>
                    <br/><br/><br/>
                    <Divider />

                    {/* <FormControl>
                    <RadioGroup
                    row
                    aria-labelledby="gender"
                    name="gender"
                    defaultValue="female"
                    >
                    <FormControlLabel id ="gender" name="gender" onChange={this.handleChange}  value={this.state.gender} control={<Radio />} label="Female" />
                    <FormControlLabel id ="gender" name="gender" onChange={this.handleChange}  value={this.state.gender} control={<Radio />} label="Male" />
                    <FormControlLabel id ="gender" name="gender" onChange={this.handleChange}  value={this.state.gender} control={<Radio />} label="Other" />
                    
                    </RadioGroup>
                    <Divider />
                    </FormControl> */}

                    <TextField id ="address" name="address" className ={classes.field} value={this.state.address} label="Address" variant="outlined" onChange={this.handleChange}/>
                    <br/><br/><br/>
                    <Divider />

                    <TextField id ="city" name="city" className ={classes.field} value={this.state.city} label="City" variant="outlined" onChange={this.handleChange}/>
                    <br/><br/><br/>
                    <Divider />

                    <TextField id ="state" name="state" className ={classes.field} value={this.state.state} label="State" variant="outlined" onChange={this.handleChange}/>
                    <br/><br/><br/>
                    <Divider />

                    <TextField  id ="country" name="country" className ={classes.field} value={this.state.country} label="Country" variant="outlined"onChange={this.handleChange} />
                    <br/><br/><br/>
                    <Divider />

                    <TextField  id ="contact_no" name="contact_no" className ={classes.field} value={this.state.contact_no} label="Contact No" variant="outlined" onChange={this.handleChange}/>
                    <br/><br/><br/>
                    <Divider />
                    {/* <TextField
                        id="date"
                        label="Birthday"
                        type="date"
                        onChange={this.handleChange}
                        defaultValue="1996-08-01"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    /> */}
                    <br/><br/><br/>
                    <Divider />

                    <TextField  id ="about" name="about" className ={classes.field} value={this.state.about} label="About" variant="outlined" onChange={this.handleChange} />
                    <br/><br/><br/>

                    <Button variant="contained" color="success" onClick ={this.handleSubmit }>
                    Save
                    </Button>

            </div>
            </div>
            </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user : state.user
})

// export default userprofile;

export default connect(mapStateToProps, {createCustomer} )(withStyles(styles)(userprofile))
