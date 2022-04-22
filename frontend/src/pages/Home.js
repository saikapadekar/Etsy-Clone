import React,{useEffect} from 'react';
import { connect,useDispatch,useSelector } from 'react-redux';
import PinkBox from "../components/PinkBox";
import Product from '../components/Product';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles"
import {getAllShopProducts} from '../redux'
import { Col } from "react-bootstrap";


const useStyles = makeStyles({
    main:{
        padding: '30px'
    },
});

const Home = () => {

    const user=useSelector(state=>state.user)
    console.log(`Printing user value from store`,JSON.stringify(user))
    const {
        token,
        authenticated
      } = user;
    const classes = useStyles();
    const store_products=useSelector(state=>state.product)
    const {products}=store_products; //to display as individual product card
    const dispatch=useDispatch();

    console.log(`Printing all product nodes`);
    console.log(JSON.stringify(products));
    var flag=false;
    if (JSON.stringify(products) !== "{}") {
       flag = true;
    }

    useEffect(() => {
    console.log(`dispatching getAllShopProducts`)
    dispatch(getAllShopProducts())

}, [])
    return (
        <div>
            <PinkBox/>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Grid direction="row" container className={classes.main}>
                <Grid
                    container
                    item
                    style={{ paddingLeft: "5px" }}
                    spacing={0.5}
                    xs={12}
                >
                    {flag &&
                    (products?.map((prod) => {
                    console.log(`Should print product cards`, prod.name);
                    return (
                        <Col md={3}>
                        {" "}
                        <Product
                            key={prod.id}
                            id={prod.id}
                            name={prod.name}
                            price={prod.price}
                            url={prod.url}
                            product={prod}
                        />{" "}
                        </Col>
                    );
                    }))}
                </Grid>
        </Grid>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
      getAllShopProducts: () => dispatch(getAllShopProducts()),
    }
  }
  
export default connect(mapDispatchToProps)(Home);