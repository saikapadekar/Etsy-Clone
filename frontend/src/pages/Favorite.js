/*Things to do:
1. Display all favorites (useEffect to call favorites logged in user_id)
2. Display user_name with hyperlink to /userprofile
3. Search within fav items
4. Item can be added/removed from fav page

*/

import React, { useEffect } from 'react';
import { connect,useDispatch } from 'react-redux';
import {useSelector} from 'react-redux'
import {getfavoriteByUserid} from '../redux'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import { Col } from "react-bootstrap";
import ProductFav from '../components/ProductFav';


const useStyles = makeStyles({
    main:{
        padding: '30px'
    },
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
const id_user=localStorage.getItem('user_id');

   const {userfavs} = user_favs;
   console.log(`Received nodes for userfavs: `,JSON.stringify(userfavs))
   var fav_flag=false;
  
    if(JSON.stringify(userfavs)!='{}')
        {
            fav_flag=true;
        }
        else{
            fav_flag=false;
        }


   useEffect(()=>{
    if(JSON.stringify(userfavs)!='{}')
    {
        fav_flag=true;
    }
    else{
        fav_flag=false;
    }
       if(JSON.stringify(authenticatedUserDetails)!='{}')
       {
           fav_flag=true;
           const userid=id_user;
           dispatch(getfavoriteByUserid(userid));
       }
   },[fav_flag])

   return (
       <div>
           <Grid direction="row" container className={classes.main}>
           {/* For Username and search tab */}
           </Grid>
           <Grid direction="row" container className={classes.main}>
               {/* For displaying products */}
               <Grid
                    container
                    item
                    style={{ paddingLeft: "5px" }}
                    spacing={0.5}
                    xs={12}
                >
                {fav_flag &&
                    (userfavs?.map((fav) => {
                    console.log(`Should print product cards name: `, fav.name);
                    return (
                        <Col md={3}>
                        {" "}
                        <ProductFav
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
