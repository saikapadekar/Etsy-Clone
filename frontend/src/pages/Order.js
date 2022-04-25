/**Things to do:
 * 1. Show image, pdt_name, shop_name, qty, price, date of purchase
 */


 import React, { useEffect,useState } from 'react';
 import { connect,useDispatch } from 'react-redux';
 import {useSelector} from 'react-redux'
 import {getOrderById} from '../redux'
 import { makeStyles } from '@material-ui/core/styles';
 import Grid from '@material-ui/core/Grid'
 import {  useNavigate, useParams } from 'react-router-dom';
 import { Col } from "react-bootstrap";
 import ProductCart from '../components/ProductCart';
 import OrderContent from '../components/OrderContent';
 import { Navigate } from "react-router-dom";
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'


const useStyles = makeStyles({
    main:{
        padding: '30px'
    },
    button:{
        borderStyle:'solid',
        width:'300px',
        backgroundColor:'rgb(240, 92, 38)',
        color:'white'
    },
});

const Order = () => {
    const classes = useStyles();

    const { orderid } = useParams();
    const dispatch=useDispatch();
    const user=useSelector(state=>state.user)
    const {
        authenticatedUser,
        authenticated,
        userLogindetails,
        authenticatedUserDetails
      } = user;

      let redirectVar=null;
    if(authenticated==false)
    {
        redirectVar = <Navigate to="/login"/>;
    }

    const user_orders=useSelector(state=>state.order)
    const {orderbyid} = user_orders;

    console.log(`Received nodes for orderbyid: `,JSON.stringify(orderbyid))
    var order_flag=false;
  
    if(JSON.stringify(orderbyid)!='{}')
        {
            order_flag=true;
        }

    useEffect(()=>{
        console.log(`Value of order_flag: `,order_flag)
        if(JSON.stringify(orderbyid)!='{}')
        {
            order_flag=true;
        }
        else{
            order_flag=false;
        }
        if(JSON.stringify(authenticatedUserDetails)!='{}')
        {
            order_flag=true;
            console.log(`Dispatching getOrderById for orderid: `, orderid)
            dispatch(getOrderById(orderid));
        }
    },[order_flag])

    const customer=useSelector(state=>state.customer)

    console.log(`Printing customer value from store`,JSON.stringify(customer))
    const {selectedCustomer} =customer;

    return(
        <div>
            <h1>{selectedCustomer.name}'s Order: {orderid}</h1>

            <Grid container className={classes.main} spacing={3}>
           {/* For individual product */}
           {order_flag &&
                    (orderbyid?.map((order_prod) => {
                    console.log(`Should print product cards name: `, order_prod.name);
                    return (
                        <Grid container item xs={12} sm={12} style={{ paddingLeft: "5px" }} spacing={0.5}>
                        <OrderContent
                            key={order_prod.id}
                            id={order_prod.id}
                            name={order_prod.name}
                            price={order_prod.price}
                            product={order_prod}
                        />
                        </Grid>
                    );
                    }))}
           </Grid>
        </div>
    )

};


const mapDispatchToProps = dispatch => {
    return {
        
        getOrderById: (orderid) => dispatch(getOrderById(orderid))

    }
  }


export default connect(mapDispatchToProps)(Order);
