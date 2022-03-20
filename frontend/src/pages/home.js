import React, { Component } from 'react';
import { Nav} from "react-bootstrap";
import {connect} from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles';
import cookie from "react-cookies";

import axios from 'axios'
import store from '../redux/store'
import {  GET_ALL_PRODUCTS } from '../redux/types'
 
import { Container, Row, Col } from "react-bootstrap";
// import Product from '../components/Product';
import ProductCard from '../components/ProductCard';
import PinkBox from '../components/PinkBox';
const styles = (theme) => ({
    ...theme.spread,
    main : {
        // padding : '30px'
    }
})

class home extends Component {
    constructor() {
        super();
        this.state = {
          products: [],
        };
      }
    componentDidMount(){
        const token = localStorage.userToken

            
    }
    displayProducts(){

        const allProducts = this.state.products;
        // return allProducts.map(product => <ProductCard key={product.id} />)
        // console.log("component authenticated: "+this.props.user.authenticated)
        //     console.log('load all products')
        //     axios.get('http://localhost:7000/products/getall')
        //         .then(res => {
        //             console.log("Inside axios getall");
        //             this.setState({
        //                 products : this.state.products.concat(res.data)
        //             });
        //             console.log("products : " + JSON.stringify(res.data))
        //             console.log("accessing nrsted obj : " + JSON.stringify(this.state.products[0]))

        //     })

    }
    render() {
        
        return (
            <div>
                <PinkBox></PinkBox>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <Container>
                <Row>
            {/* {this.state.products.map( (prod)=>{
                return <Col md={3}> <Product key={prod.id} id={prod.id} name={prod.name} price={prod.price} product={prod} /></Col>
            })} */}
            </Row>
                </Container>
                {this.displayProducts()}
                </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user : state.user,
    restaurant : state.restaurant
})

export default connect(mapStateToProps, {} )(withStyles(styles)(home));