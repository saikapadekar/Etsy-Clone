/**Things to do:
 * 1. Show all user orders list(useEffect on logged-in user)
 * 2. selecting on single order navigate to Order.js (of that Order_id)
 */

 import React, { useEffect,useState } from 'react';
 import { connect,useDispatch } from 'react-redux';
 import {useSelector} from 'react-redux'
 import {getOrdersByUserId} from '../redux'
 import { makeStyles } from '@material-ui/core/styles';
 import Grid from '@material-ui/core/Grid'
 import ProductCart from '../components/ProductCart';
 import { Navigate, useNavigate } from "react-router-dom";
 import Box from '@mui/material/Box';
 import InputLabel from '@mui/material/InputLabel';
 import MenuItem from '@mui/material/MenuItem';
 import FormControl from '@mui/material/FormControl';
 import Select from '@mui/material/Select';
 import OrderContent from '../components/OrderContent';
import { Button } from '@material-ui/core'



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
    outer:{
        borderStyle:'groove',
    }
});
const Orders = () => {
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
      const orders=useSelector(state=>state.order)
      const {allorders} = orders;

    console.log(`Received nodes for userOrders: `,JSON.stringify(allorders))
    var order_flag=false;
    // const [pagination,setpagination]=useState({limit:2});
    const [limit,setLimit]=useState(2);


    if(JSON.stringify(allorders)!='{}')
        {
            order_flag=true;
        }
        else{
            order_flag=false;
        }

    useEffect(()=>{
        console.log(`Value of order_flag: `,order_flag)
        if(JSON.stringify(allorders)!='{}')
        {
            order_flag=true;
        }
        else{
            order_flag=false;
        }
        if(JSON.stringify(authenticatedUserDetails)!='{}')
        {
            order_flag=true;
            const userid=authenticatedUserDetails._id;
            console.log(`Dispatching getOrdersByUserId for userid: `, userid)
            dispatch(getOrdersByUserId(userid,limit,0));
        }
    },[order_flag])

    const handleSubmit= (event)=>{
        event.preventDefault();
        console.log(`Changing pageSize`,limit)
        dispatch(getOrdersByUserId(authenticatedUserDetails._id,limit,0))
        .then(()=>{
            navigate('/orders')
        })

    };

    const customer=useSelector(state=>state.customer)
    console.log(`Printing customer value from store`,JSON.stringify(customer))
    const {selectedCustomer} =customer;

    let redirectVar=null;
    if(authenticated==false)
    {
        redirectVar = <Navigate to="/login"/>;
    }
    const handleDropdown = (event) =>{
        console.log(`inside handleDropdown `)
        setLimit(event.target.value);        
    };
    return (
        <div>
            {redirectVar}
            <h1>{selectedCustomer.name}'s Orders</h1>
            <div className={classes.outer}>
                <h2>Order_id &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Amount
                    &emsp;&emsp;&emsp;&emsp;Quantity
                    &emsp;&emsp;&emsp;Date
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Items
                    

                    </h2>
            {order_flag &&
                    (allorders?.map((order_prod) => {
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
                    <Grid container direction="row">
                    <Box sx={{ minWidth: 120, }}>
      <FormControl fullWidth>
        <InputLabel id="Page size">Page size</InputLabel>
        <Select
          labelId="limit"
          id="limit"
          value={limit}
          label="limit"
          onChange={handleDropdown}
        >
          <MenuItem value={2} >2</MenuItem>
          <MenuItem value={5} > 5</MenuItem>
          <MenuItem value={10} >10</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Button onClick={handleSubmit}>set</Button>
                    </Grid>   
                    </div>      
        </div>
    );
};


const mapDispatchToProps = dispatch => {
    return {
        
        getOrdersByUserId: (userid) => dispatch(getOrdersByUserId(userid))

    }
  }


export default connect(mapDispatchToProps)(Orders);