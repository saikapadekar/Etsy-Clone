/**
 * Things to do:
 * 1. Get Shop details according to shopname: Write useEffect()--done
 * 2. Get Products of that particular shop --done
 * 3. Display products of that particular shop --remaining
 * 4. Display products sales count --remaining
 * 
 * Owner:
 * 1.Display add item button, only if logged in user is Shop Owner --done
 * 2. Edit item -- remaining
 * 3. Edit shop image -- remaining
 * 4. Display total sales of all items in that shop -- remaining
 */


import React, { useEffect, useState } from 'react';
import { connect,useDispatch } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core'
import { Link ,Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getShopProducts,getShopDataByNameTwo} from '../redux'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import { Divider } from '@mui/material'
import jwt_decode from "jwt-decode";


const useStyles = makeStyles({
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
        marginLeft:'600px'
    },
    button:{
        borderStyle:'solid',
        backgroundColor:'#1B6BEE',
        color:'white'
    },
    tile : {
        width:'400px',
        height:'400px'
    },
});

    

const Shop = () => {
    const classes = useStyles();
    const { shopname } = useParams();
    const dispatch=useDispatch();
    console.log(`Received shopname from URL params`,shopname)

    //To check if the shop belongs to loggedin user and change functionalities
    const user=useSelector(state=>state.user)
    const store_shop=useSelector(state=>state.shop)
    const store_products=useSelector(state=>state.product)


    console.log(`Printing user value from store`,JSON.stringify(user))
    console.log(`Printing shop value from store`,JSON.stringify(store_shop))
    console.log(`Printing products value from store`,JSON.stringify(store_products))


    const {
        authenticatedUser,
        authenticated,
        userLogindetails
      } = user;
      
      const {shopdetails, shopbyname}=store_shop;

      const {shop_products}=store_products; //to display as individual product card

      let flag=false;
      if(typeof(authenticatedUser.token)!='undefined' && typeof(shopbyname.id)!='undefined')
      {
        var decoded = jwt_decode(authenticatedUser.token);

        if(decoded.id==shopbyname.id)
        {
            flag=true;
            console.log('Logged in user is owner of shop')
        }
     }

     let id=1
     if(typeof(shopbyname.id)!='undefined'){
        id=shopbyname.id
     }

    //Get Shop details according to shopname
    useEffect(() => {
        dispatch(getShopDataByNameTwo(shopname))
    }, [shopname])

    useEffect(() => {
        console.log(`Fetching products of shop id:`,id)
        let products=dispatch(getShopProducts(id))
        console.log(`Printing products object`,JSON.stringify(products))

    }, [id])

    return (
        <div>
                <h1>Welcome to: {shopbyname.name}
                    </h1>
            <Grid container className={classes.card}>
                    <Grid container item md={1}>
                    <div>
                    <img src={shopbyname.url} alt={shopname} className={classes.tile} />

                    <br/><br/>
                    Upload a different shop photo.
                    </div>
                        </Grid>
            
            <Grid container item md={4}>
                
                <div className={classes.details}>
                
                    <br/><br/>
                    <h2>Shop Details</h2>
                    <Divider></Divider>
                    <br/>
                        <div className={classes.description}>
                           <h2>Email: </h2> {shopbyname.owner_details} 
                           {/* why is this showing null */}
                        </div>
                    <Divider></Divider>
                    <br/>
                        <div className={classes.description}>
                        {/* <h2>Description: </h2>{description} */}
                        </div>
                        <Divider></Divider>
                        <br/><br/>
                        { <Button variant="contained" className={classes.button}  
                        component = {Link} 
                        to='additem'>Add Item </Button>}
                        <Outlet />
                        
                </div>
                <Divider></Divider>
                    <br/>
                    </Grid>
                    </Grid>               
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
        
        getShopDataByNameTwo: (shopname) => dispatch(getShopDataByNameTwo(shopname)),
        getShopProducts: (shopname) => dispatch(getShopProducts(shopname))

    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Shop);