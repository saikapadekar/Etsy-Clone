/*Things to do:
1. Display all favorites (useEffect to call favorites logged in user_id)
2. Display user_name with hyperlink to /userprofile
3. Search within fav items
4. Item can be added/removed from fav page

*/

import React, { useEffect, useState } from 'react';
import { connect,useDispatch } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core'
import { Link ,Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getfavoriteByUserid} from '../redux'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Product from '../components/Product';
import { Container, Row, Col } from "react-bootstrap";
import FavoriteIcon from '@mui/icons-material/Favorite';


const useStyles = makeStyles({
    main:{
        padding: '30px'
    },
   nameLoc : {
       position: 'absolute',
       top: '240px',
       left: '30px',
       fontWeight: '800',
       fontSize : '40px',
       color : 'white'
   }, 
   shop : {
       width:'1349px',
       height:'250px',
       objectFit: 'cover',
       position: 'relative',
       backgroundPosition: 'center'
   },
   details:{
       fontFamily:'"Guardian-EgypTT",Charter,"Charter Bitstream",Cambria,"Noto Serif Light","Droid ',
       fontWeight:'600px',
       borderStyle:'ridge',
       fontSize : '22px',

   },
   header:{
       margin:'100px'
   },
   button:{
       borderStyle:'solid',
       width:'300px',
       backgroundColor:'rgb(240, 92, 38)',
       color:'white'
   },
   tile : {
       width:'380px',
       height:'410px'
   },
   image :{
       margin:'50px'
   }
});


const Favorite = () => {

   const classes = useStyles();
   const dispatch=useDispatch();
   const user=useSelector(state=>state.user)
    const {
        authenticatedUser,
        authenticated,
        userLogindetails,
        authenticatedUserDetails
      } = user;
   const user_favs=useSelector(state=>state.favorite)
//    console.log(`Received nodes for user_favs: `,JSON.stringify(user_favs))

   const {userfavs} = user_favs;
   console.log(`Received nodes for userfavs: `,JSON.stringify(userfavs))
   var flag=false;
   if(JSON.stringify(authenticatedUserDetails)!='{}')
       {
           flag=true;
       }


   useEffect(()=>{
       if(JSON.stringify(authenticatedUserDetails)!='{}')
       {
           flag=true;
           const userid=authenticatedUserDetails._id;
           dispatch(getfavoriteByUserid(userid));
       }
   },[authenticatedUserDetails])

   


   
   return (
       <div>
           <Grid direction="row" container className={classes.main}>
           {/* For Username and search tab */}
           </Grid>
           <Grid direction="row" container className={classes.main}>
               {/* For displaying products */}
               Hello from Favorite.js
               <Grid
                    container
                    item
                    style={{ paddingLeft: "5px" }}
                    spacing={0.5}
                    xs={12}
                >
                {flag &&
                    (userfavs?.map((fav) => {
                    console.log(`Should print product cards name: `, fav.name);
                    return (
                        <Col md={3}>
                        {" "}
                        <Product
                            key={fav.id}
                            id={fav.id}
                            name={fav.name}
                            price={fav.price}
                            product={fav}
                        />{" "}
                        </Col>
                    );
                    }))}
                </Grid>
           </Grid>
       </div>
   );

}

const mapDispatchToProps = dispatch => {
    return {
        
        getfavoriteByUserid: (userid) => dispatch(getfavoriteByUserid(userid))

    }
  }


export default connect(mapDispatchToProps)(Favorite);
