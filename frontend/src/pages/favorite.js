import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getSelectedUser,getAuthenticatedShopData,getShopProducts} from '../redux/actions/userActions'
import jwt_decode from "jwt-decode";
import Grid from '@material-ui/core/Grid'
import shop_img from '../components/assets/shop.jpg'
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core'
import { Divider } from '@mui/material'
import { Link } from 'react-router-dom'
import Product from '../components/Product';
import { Container, Row, Col } from "react-bootstrap";
import notify from '../utils/notify'

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

class favorite extends Component {
    render() {
        const { classes } = this.props

        return (
            <div>
                <h1>Favorites page</h1>
            <Grid container className={classes.card}>
                    <Grid container item md={3}>
                    <div>
                        <div style={{width: "10px"}}>
                            <img src='https://cmpe273-lab.s3.us-east-2.amazonaws.com/masks.png' style={{width:"300px",height:"250px"}} alt="ShopName" className={classes.tile} />
                        </div>
                    <br/>
                    <h3>Women's Satin Nude Tapered Cut Face Mask</h3><br/>
                    <h4>5.99</h4>
                    </div>
                        </Grid>
            
            <Grid container item md={3}>
            <div>
                        <div style={{width: "10px"}}>
                            <img src='https://cmpe273-lab.s3.us-east-2.amazonaws.com/towel.png' style={{width:"300px",height:"250px"}} alt="ShopName" className={classes.tile} />
                        </div>
                    <br/>
                    <h3>Poppy and Peony Dish Towel Twin Set - 2pk - Kitchen Towel Tea Towel Floral Flower Towel - 16''x24''</h3><br/>
                    <h4>3.99</h4>
                    </div>
                    </Grid>

                    <Grid container item md={3}>
            <div>
                        <div style={{width: "10px"}}>
                            <img src='https://cmpe273-lab.s3.us-east-2.amazonaws.com/think.png' style={{width:"300px",height:"250px"}} alt="ShopName" className={classes.tile} />
                        </div>
                    <br/>
                    <h3>Thinking of You - Succulent Gift Box - Missing You - Friendship Gift Box - Care Package - Thinking of You Gift -FREE SHIPPING</h3><br/>
                    <h4>7.99</h4>
                    </div>
                    </Grid>
                    <Grid container item md={3}>
            <div>
                        <div style={{width: "10px"}}>
                            <img src='https://cmpe273-lab.s3.us-east-2.amazonaws.com/neonsign.png' style={{width:"300px",height:"250px"}} alt="ShopName" className={classes.tile} />
                        </div>
                    <br/>
                    <h3>Wedding Neon Sign, Custom Neon Sign, Neon Sign, Neon Sign Custom, Wedding Custom Neon Sign, Neon Sign Wedding, Wedding Sign, Flex Neon</h3><br/>
                    <h4>125</h4>
                    </div>
                    </Grid>
                    </Grid>
                
                    
                
                </div>
            
        );
    }
}

export default (withStyles(styles)(favorite));