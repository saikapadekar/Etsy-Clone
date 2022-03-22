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

class shop extends Component {
  
    
    getemailId(){
        const { authenticatedUser} = this.props.user
        
        var decoded = jwt_decode(authenticatedUser.token);
 
        console.log(`decoded`,decoded.id);
        // return allProducts.map(product => <ProductCard key={product.id} />)
        // console.log("component authenticated: "+this.props.user.authenticated)
        console.log('Inside shop.js trying to get email ID')
        this.props.getSelectedUser(decoded.id)
        .then(()=>console.log( `inside then of getSelectedUser`))
        .catch((err) => {
            notify({ type: 'error', description: JSON.stringify(err.response.data.message) });
        });
        

    }
    getShopdetails(){
        const { authenticatedUser} = this.props.user
        
        var decoded = jwt_decode(authenticatedUser.token);
 
        console.log(`decoded`,decoded.id);
        // return allProducts.map(product => <ProductCard key={product.id} />)
        // console.log("component authenticated: "+this.props.user.authenticated)
        console.log('Inside shop.js trying to get email ID')
        // this.props.getSelectedUser(decoded.id)
        this.props.getAuthenticatedShopData(decoded.id)
        .then(()=>console.log( `inside then of getShopdetails`))
        .catch((err) => {
            notify({ type: 'error', description: JSON.stringify(err.response.data.message) });
        });

    }

    // componentDidMount(){
    //     const token = localStorage.userToken
    //     console.log(`localstorage token`,token)
    //     const {authenticated, authenticatedUser,selectedUser} = this.props.user
    //     var decoded = jwt_decode(authenticatedUser.token);
    //     var id=1
    //     if(decoded.id)
    //     {
    //         id=decoded.id;
    //     }
    //     console.log(`decoded`,decoded.id);
    //     this.props.getAuthenticatedShopData(id)
    //     .then((res) => {
    //         let shopData = res.data
    //         console.log(JSON.stringify(shopData))
    //         store.dispatch({
    //             type : GET_AUTHENTICATED_SHOP,
    //             payload : shopData
    //         })
    //     })
        
    // }
    // displayShopProducts(){
    //     const { authenticatedUser} = this.props.user
        
    //     var decoded = jwt_decode(authenticatedUser.token);
 
    //     console.log(`decoded`,decoded.id);
    //     this.props.getShopProducts(decoded.id)
    //     .then()
    //     .catch((err) => {
    //         notify({ type: 'error', description: JSON.stringify(err.response.data.message) });
    //     });
    // }
    

    render() {
        // this.getemailId();
        // this.getShopdetails();
        // this.displayShopProducts();
        const {authenticated, authenticatedUser,selectedUser,shopdetails,shop_products} = this.props.user
        const { classes } = this.props
        let email='user@gmail.com'
        console.log(`printing shop details`,JSON.stringify(shopdetails))

        if(selectedUser.email){
            console.log(`printing email id: `,selectedUser.email)
        }
        if (typeof(selectedUser.email) != 'undefined') {
            email=selectedUser.email;
            console.log(`Got email ID: `,selectedUser.email)
          }
        
        let shopname='Shop 1'
        console.log(shopname)
        if(shopdetails.name){
            shopname=shopdetails.name
        }
        console.log(shopname)
        let description='Skincare Products'
        if(shopdetails.owner_details){
            description=shopdetails.owner_details
        }
        if(typeof(shop_products) != 'undefined'){
            console.log(`Fetched products of this shop`,shop_products)
        }

        const owner_details=shopdetails.owner_details;
        return (
            <div>
                <h1>Welcome to: {shopname}</h1>
            <Grid container className={classes.card}>
                    <Grid container item md={1}>
                    <div>
                    <img src={shop_img} alt={shopname} className={classes.tile} />

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
                           <h2>Email: </h2> {email}
                        </div>
                    <Divider></Divider>
                    <br/>
                        <div className={classes.description}>
                        <h2>Description: </h2>{description}
                        </div>
                        <Divider></Divider>
                        <br/><br/>
                        {console.log('here')}
                        <Button variant="contained" className={classes.button}  component = {Link} to="/additem"  >Add Item </Button>
                        {/* {
                shop_products.nodes?.map((prod) => {
                console.log(`//`,prod.name)
                return <Col md={3}> <Product key={prod.id} id={prod.id} name={prod.name} price={prod.price} product={prod} /> </Col>
                 } )
            } */}
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

export default connect(mapStateToProps, {getSelectedUser,getAuthenticatedShopData} )(withStyles(styles)(shop))
