import React,{useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { connect,useDispatch,useSelector } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom';
import {deleteFromCart} from '../redux'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


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
  const ProductCart = (prod) => {
    console.log(`Inside ProductCart Component`)
    const navigate=useNavigate();

    const classes = useStyles();
    const dispatch = useDispatch();
    console.log(`Printing data for`,JSON.stringify(prod))
    const{name,price,product}=prod;
    console.log(`ProductCart product: `,JSON.stringify(product))//object of cart

    var data={userid:product.userid,productId:product.productId}
    const [cart_var, setCartvar] = useState({ qty:'',isGift:false,note:''})
    const [gift, setGift] = useState({ isGift:false})


    const handleChange = (event) =>{
        setCartvar(
            {
                ...cart_var,
                [event.target.name] : event.target.value,              
            })
            setGift({
                isGift:!(gift.isGift)
            })
            console.log(`Value of cart is now: `, cart_var)
            console.log(`Value of gift is now: `, gift)


    };
    const removeFromCart = () =>{
        console.log(`Dispatching deleteFromCart for data: `, data)
        dispatch(deleteFromCart(data))
        navigate('/')
    };

    useEffect(()=>{
        console.log(`Called useEffect from ProductCart.js`)

        return()=>{
            console.log(`Called from useEffect return ProductCart.js`)
        }
    })
    

    return(
        <div>
           
                <div className={classes.details}>
                <Grid div="row" container xs={12} md={12} sm={12}>
                
                <Grid container  sm={4}>
                <Link to={`/productview/${product.productId}`}>{product.name}
                </Link>
                </Grid>
                
                <Grid container  sm={2}>$ {product.price}</Grid>
                <Grid container  sm={1}>
                    <TextField id="qty" name="qty" 
                        // className ={classes.field} 
                        placeholder='1'
                        value={cart_var.qty} 
                        onChange={handleChange} variant="outlined">
                        </TextField>
                
                </Grid>
                <Grid container  sm={1}></Grid>

                <Grid container sm={2}>
                    <TextField id="note" name="note"
                        placeholder='Notes'
                        value={cart_var.note} 
                        onChange={handleChange} variant="outlined">
                        </TextField>
                
                </Grid>
                <Grid container  sm={1}>

                <FormControlLabel control={<Checkbox />} label="Gift" value={gift.isGift} onChange={handleChange}/>
                </Grid>
                <Grid container  sm={1}>
                    <Button variant="inherit" className={classes.button} onClick={removeFromCart}> Remove</Button>
                </Grid>
                
                </Grid>
                </div>
                </div>       
    )
  };
const mapDispatchToProps = dispatch => {
    return {
        deleteFromCart: (data) => dispatch(deleteFromCart(data)),
  
    }
  }
    
  export default connect(mapDispatchToProps)(ProductCart);
  