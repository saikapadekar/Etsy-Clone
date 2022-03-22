import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getSelectedUser,getAuthenticatedShopData,getShopProducts,getProductbyId} from '../redux/actions/userActions'
import jwt_decode from "jwt-decode";
import Grid from '@material-ui/core/Grid'
import user from '../components/assets/user.png'
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core'
import { Divider } from '@mui/material'
import { Link } from 'react-router-dom'
import Product from '../components/Product';
import { Container, Row, Col } from "react-bootstrap";
import notify from '../utils/notify';

const styles = (theme) => ({
    ...theme.spread,
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
})

class productview extends Component {
  
    // componentDidMount(){
    //     console.log(`Inside component mount of productview`)
    //     this.props.getProductbyId({
    //         variables: {
    //             id : this.props.match.params.id     
    //         }
    //     })//need to get id
    // }
    
    

    render() {
        const {authenticated, authenticatedUser,selectedUser,shopdetails,shop_products,product} = this.props.user
        const { classes } = this.props
        // const{name,price,category,description,qty_available}=this.user.product;
        var url,name,price,category,description,quantity;
        if(JSON.stringify(product)!=='{}'){
            console.log(`printing product`,JSON.stringify(product))
            url=product.url;
            name=product.name;
            price=product.price;
            category=product.category;
            description=product.description;
            quantity=product.qty_available;
        }
        return (
            <div>
                <h1>Product page</h1>
            <Grid container className={classes.card}>
                    
                    
                    <Grid container item xs={12} md={2}>
                    <img src={url} alt={name} className={classes.tile} />

                    <br/><br/>
                    </Grid>
                   
                        
            
            <Grid container item xs={12}  >
                
                <div className={classes.details}>
                
                    <br/><br/>
                    <h2>Product Details</h2>
                    <Divider></Divider>
                    <br/>
                        <div className={classes.description}>
                           <h2>Product Name: </h2> {name}
                        </div>
                    <Divider></Divider>
                    <br/>
                        <div className={classes.description}>
                        <h2>Price: </h2>{price}
                        </div>
                        <Divider></Divider>
                        <br/>
                        <div className={classes.description}>
                        <h2>Category: </h2>{category}
                        </div>
                        <Divider></Divider>
                        <br/>
                        <div className={classes.description}>
                        <h2>Description: </h2>{description}
                        </div>
                        <Divider></Divider>
                        <br/>
                        <div className={classes.description}>
                        <h2>Quantity: </h2>{quantity}
                        </div>
                        <Divider></Divider>
                        <br/><br/>
                        {console.log('here')}
                        <Button variant="contained" className={classes.button}  component = {Link} to="/cart"  >Add to Cart </Button>
                        
                </div>
                <Divider></Divider>
                    <br/>
                    </Grid>
                    </Grid>
                
                    
                
                </div>
            
        );
    }
}




const mapStateToProps = (state) => ({
    user : state.user
  })

export default connect(mapStateToProps, {getSelectedUser,getAuthenticatedShopData,getProductbyId} )(withStyles(styles)(productview))
