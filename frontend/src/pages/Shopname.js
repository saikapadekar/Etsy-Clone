import React,{ useEffect, useState }  from 'react';
import { createShop } from "../redux/";
import {connect, useSelector,useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    button: {
        color: "blue",
        border: "2px",
    
        borderStyle: "solid",
        borderColor: "#1B6BEE",
      },
      search: {
        border: "2px",
        borderStyle: "solid",
        marginTop: "15px",
        marginBottom: "0",
        width: "65%",
        lineHeight: "28px",
        height: "40px",
        borderColor: "grey",
      },
});
const Shopname = () => {
    const classes = useStyles();
    const user=useSelector(state=>state.user)
    console.log(`Printing user value from store`,JSON.stringify(user))
    const {
        authenticatedUser,
        authenticated,
        userLogindetails,
        authenticatedUserDetails
      } = user;
    const [shop, setShop] = useState({ userid: '',url:'', name: '',owner_details:''})
    const dispatch=useDispatch();
    const navigate = useNavigate();

    // var decoded = jwt_decode(authenticatedUser.token);

    // shop.id=decoded.id;
    // shop.owner_details=userLogindetails.email;

    const checkAvailability=(event)=>{

        console.log("inside checkAvailability shopname.js");
        event.preventDefault();

        console.log(JSON.stringify(shop));

        axios.defaults.withCredentials = true;
        axios
        .get(`${window.BACKEND_API_URL}/shops/name/${shop.name}`, shop.name)
        .then((response) => {
            console.log("Status Code : ", response.status);
            if (response.status === 200) {
            console.log("creating new shop");
            dispatch(createShop(shop))
            alert(`Shop Name is Available`);
            navigate(`/shop/${shop.name}`)
            }
        })
        .catch((e) => {
            console.error(e);
            console.log("User name is unavailable");
            alert(`Shop Name Already Present`);
        });
        event.preventDefault();
    };
    
    const handleChange=(event)=>{
      shop.userid=authenticatedUserDetails._id;
      shop.owner_details=authenticatedUserDetails.email;
        setShop(
            {
                ...shop,
                [event.target.name] : event.target.value
            }
        )
    
    };

    return (
        <div>
        <br />
        <center>
          <h2>Name Your Shop</h2>
        </center>
        <br />
        <center>
          <h4>Choose a memorable name that reflects your stlye</h4>
        </center>
        <center>
          <div className="input-group">
            <input
              type="search"
              className={classes.search}
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              width={50}
              onChange={handleChange}
              name="name"
              value={shop.name}
            />
            <Button
              type="button"
              className={classes.button}
              onClick={checkAvailability}
            >
              Check Availability
            </Button>
          </div>
        </center>
        <center>
          <h5>
            Your shop name will appear in your shop and next to each of your
            listings throughout Etsy
          </h5>
        </center>
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
};


const mapStateToProps = (state) => {
    return {
        shopData:state.shop
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        createShop: (shop) => dispatch(createShop(shop)),
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Shopname);