import React, { Component } from 'react';
import { Nav} from "react-bootstrap";
import {connect} from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles';
import cookie from "react-cookies";

import axios from 'axios'
import store from '../redux/store'
import {  GET_ALL_PRODUCTS } from '../redux/types'
import getLoginDetails from '../utils/getLoginDetails';
import faceMasks from './assets/masks.png'; 
import wall_decor from './assets/wall_decor.png'; 
import gift from './assets/gift.png'; 
import garden from './assets/garden.png'; 
import self_care from './assets/self_care.png'; 
import craft from './assets/craft.png'; 
import { Container, Row, Col } from "react-bootstrap";
import Product from '../components/Product';
import ProductCard from '../components/ProductCard';
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
        // setTimeout(()=>{
            console.log("component authenticated: "+this.props.user.authenticated)
            console.log('load all products')
            axios.get('http://localhost:7000/products/getall')
                .then(res => {
                    console.log("Inside axios getall");
                    this.setState({
                        products : this.state.products.concat(res.data)
                    });
                    console.log("products : " + JSON.stringify(res.data))
                    console.log("accessing nrsted obj : " + JSON.stringify(this.state.products[0]))

            })
    }
    displayProducts(){

        const allProducts = this.state.products;
        // return allProducts.map(product => <ProductCard key={product.id} />)

    }
    render() {
        
        return (
            <div>
                <div className='blue-box'>
                Find things you'll love. Support independent sellers. Only on Etsy.
                <br/><br/>               
                <Nav.Link to="/products">
                    <a classname="img_links" href='' className="faceMasks">
                        <img className="faceMasks" src={faceMasks} alt=""/>
                    </a>
                    
                </Nav.Link>  &emsp;
                <Nav.Link to="/products">
                    <a href='' className="wall_decor">
                        <img className="wall_decor" src={wall_decor} alt=""/> 
                    </a>
                </Nav.Link>&emsp;
                <Nav.Link to="/products">
                    <a href='' className="gift">
                        <img className="gift" src={gift} alt=""/> 
                       
                    </a>
                </Nav.Link>&emsp;
                <Nav.Link to="/products">
                    <a href='' className="garden">
                        <img className="garden" src={garden} alt=""/> 
                       
                    </a>
                </Nav.Link>&emsp;
                <Nav.Link to="/products">
                    <a href='' className="self_care">
                        <img className="self_care" src={self_care} alt=""/>
                        
                    </a>
                </Nav.Link>&emsp;
                <Nav.Link to="/products">
                    <a href='' className="craft">
                        <img className="craft" src={craft} alt=""/> 
                       
                    </a>
                </Nav.Link>&emsp;
                </div>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <Container>
                <Row>
            {this.state.products.map( (prod)=>{
                return <Col md={3}> <Product key={prod.id} id={prod.id} name={prod.name} price={prod.price} product={prod} /></Col>
            })}
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