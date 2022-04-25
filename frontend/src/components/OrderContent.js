import React,{useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { connect,useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import OrderProduct from './OrderProduct'
import {deleteFromCart} from '../redux'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {updateCartProduct} from '../redux'
import {useSelector} from 'react-redux'


// name, price, qty, gift, note, remove

const useStyles = makeStyles({

    details:{
        fontFamily:'"Guardian-EgypTT",Charter,"Charter Bitstream",Cambria,"Noto Serif Light","Droid ',
        fontWeight:'600px',
        borderStyle:'groove',
        fontSize : '22px',
        marginTop:'40px',
        width:'1250px'
    },
    product:{
        textAlign:'center',
    },
    name: {
      fontSize: "15px",
      fontWeight: "600",
      color: "black",
      overflow: "hidden",
      maxHeight: "20px",
      maxWidth: "300px",
      textDecoration: "none",
    },
    button:{
        borderStyle:'solid',
        width:'300px',
        backgroundColor:'rgb(240, 92, 38)',
        color:'white'
    },
  });
  const OrderContent = (prod) => {
    console.log(`Inside ProductCart Component`)
    const navigate=useNavigate();

    const classes = useStyles();
    const dispatch = useDispatch();
    console.log(`Printing data for`,JSON.stringify(prod))
    const{product}=prod;
    console.log(`order_id`,product._id)
    let newD = new Date(product.date);

    newD = newD.toLocaleString("en-US", {
        timeZone: "America/Los_Angeles"
      });

    var flag=false;var order_qty=0;
    if((product.orderitems).length!=0)
    {
        flag=true;
        product.orderitems?.map((order_item) => {
            order_qty+=order_item.qty
        })
    }
    console.log(`Total order items qty`,order_qty)
 

    return(
        <div>
           
                <div className={classes.details}>
                <Grid div="row" container xs={12} md={12} sm={12}>
                
                <Grid container  sm={3}>
                    {product._id}
                </Grid>
                
                <Grid container  sm={2}>
                {product.amount}
                    </Grid>
                <Grid container  sm={1}>
                {order_qty}
                </Grid>

                <Grid container sm={1}>
                {newD}
                </Grid>

                <Grid container  sm={1}>
                </Grid>

                <Grid container  sm={4}>
                {flag &&
                    (product.orderitems?.map((order_item) => {
                        console.log(order_item)
                        return(
                            <div>
                                 <OrderProduct
                            key={order_item._id}
                            id={order_item._id}
                            name={order_item.name}
                            price={order_item.price}
                            url={order_item.url}
                            product={order_item}
                        />
                            </div>
                        );
                    }))}
                </Grid>
                
                </Grid>
                </div>
                </div>       
    )
  };
const mapDispatchToProps = dispatch => {
    return {
        // deleteFromCart: (data) => dispatch(deleteFromCart(data)),
        // updateCartProduct:(cart)=> dispatch(updateCartProduct(cart))
  
    }
  }
    
  export default connect(mapDispatchToProps)(OrderContent);
  