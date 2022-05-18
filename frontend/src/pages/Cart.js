/**Things to do
 * 1. Display all items in cart(useEffect for logged-in user) --remaining
 * 2. Call Product card to display(Image not required) --remaining
 * 3. Display total while checking out --remaining
 * 4. Navigate to Orders.js --remaining
 * 5. Item qty to be decremented after placing an order(backend) --remaining
 * while placing order get latest cart
 */

 import React, { useEffect } from 'react';
 import { connect,useDispatch } from 'react-redux';
 import {useSelector} from 'react-redux'
 import {getCartByUserid,createOrder} from '../redux'
 import { makeStyles } from '@material-ui/core/styles';
 import Grid from '@material-ui/core/Grid'
 import { Col } from "react-bootstrap";
 import ProductCart from '../components/ProductCart';
 import { Navigate, useNavigate } from "react-router-dom";
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

const Cart = () => {
    const classes = useStyles();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user=useSelector(state=>state.user)
    const {
        authenticatedUser,
        authenticated,
        userLogindetails,
        authenticatedUserDetails
      } = user;
    const user_cart=useSelector(state=>state.cart)
    const {userCart} = user_cart;
    const customer=useSelector(state=>state.customer)
    const id_user=localStorage.getItem('user_id');

    console.log(`Printing customer value from store`,JSON.stringify(customer))
    const {selectedCustomer} =customer;

    console.log(`Received nodes for userCart: `,JSON.stringify(userCart))
    var cart_flag=false;
  
    if(JSON.stringify(userCart)!='{}')
        {
            cart_flag=true;
        }
        else{
            cart_flag=false;
        }
        
    useEffect(()=>{
        console.log(`Value of cart_flag: `,cart_flag)
        if(JSON.stringify(userCart)!='{}')
        {
            cart_flag=true;
        }
        else{
            cart_flag=false;
        }
        if(JSON.stringify(authenticatedUserDetails)!='{}')
        {
            cart_flag=true;
            const userid=id_user;
            console.log(`Dispatching getCartByUserid for userid: `, userid)
            dispatch(getCartByUserid(userid));
        }
    },[cart_flag])


    let redirectVar=null;
    if(authenticated==false)
    {
        redirectVar = <Navigate to="/login"/>;
    }
    const handleSubmit=(event)=>{
        event.preventDefault()
        console.log(`Inside handleSubmit placing an order`)
        dispatch(createOrder(id_user))
        .then(()=>{
            navigate('/orders')
        })
    }

    return(
        <div>
            {redirectVar}
            <h1>Malcolm's Cart</h1>

            <Grid container className={classes.main} spacing={3}>
           {/* For individual product */}
           
           {cart_flag &&
                    (userCart?.map((cart_prod) => {
                    console.log(`Should print product cards name: `, cart_prod.name);
                    return (
                        <Grid container item xs={12} sm={12} style={{ paddingLeft: "5px" }} spacing={0.5}>
                        <ProductCart
                            key={cart_prod.id}
                            id={cart_prod.id}
                            name={cart_prod.name}
                            price={cart_prod.price}
                            product={cart_prod}
                        />
                        </Grid>
                    );
                    }))}
           
           </Grid>
           <Button variant="contained" 
           className={classes.button}
           onClick={handleSubmit}  
        //    component = {Link} 
        //    to="/order"
           >Place an Order</Button>
        </div>
    )
};


const mapDispatchToProps = dispatch => {
    return {
        
        getCartByUserid: (userid) => dispatch(getCartByUserid(userid))

    }
  }


export default connect(mapDispatchToProps)(Cart);
