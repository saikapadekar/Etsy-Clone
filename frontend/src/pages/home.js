import React, { Component } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import jwt_decode from "jwt-decode";
import Grid from "@material-ui/core/Grid";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import PinkBox from "../components/PinkBox";
import { getAllShopProducts } from "../redux/actions/userActions";
import { GET_ALL_PRODUCTS } from "../redux/types";
import store from "../redux/store";

const styles = (theme) => ({
  ...theme.spread,
  main: {
    padding: "30px",
  },
});

class home extends Component {
  constructor() {
    super();
    this.state = {
      flag: false,
    };
  }
  componentDidMount() {
    // const token = localStorage.userToken
    // console.log(`Printing token from localStorage`,JSON.stringify(token))
    console.log("load all products");
    this.props.getAllShopProducts();
    // this.forceUpdate();
    // .then((res)=>{
    //     console.log(`Inside componentDidMount, data: `, res.data)
    //     store.dispatch({
    //         type : GET_ALL_PRODUCTS,
    //         payload : res.data})
    //     this.setState({
    //         flag: true,
    //       });

    // })
    // .catch((err)=>console.log(err))
    // this.state.flag=true;
  }

  render() {
    const { classes } = this.props;
    const {
      authenticated,
      authenticatedUser,
      selectedUser,
      products,
      shopdetails,
    } = this.props.user;
    console.log(`inside home.js Is user authenticated? `, authenticated);
    if (authenticated) {
      var decoded = jwt_decode(authenticatedUser.token);

      console.log(`decoded`, decoded.id);
      console.log(authenticatedUser.token);
      console.log(authenticated);
      console.log(selectedUser);
    }
    // if(JSON.stringify(shopdetails) !== '{}'){
    //    let flag=true;
    // }
    // else{
    //     console.log('load all products')
    //     this.props.getAllShopProducts()
    // }

    console.log(`Printing all node`);
    console.log(JSON.stringify(products));
    var flag=false;
    if (JSON.stringify(products) !== "{}") {
       flag = true;
    }

    return (
      <div>
        {/* { this.forceUpdate()} */}
        <PinkBox></PinkBox>
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
                    product={prod}
                  />{" "}
                </Col>
              );
            }))}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  // restaurant : state.restaurant
});

export default connect(mapStateToProps, { getAllShopProducts })(
  withStyles(styles)(home)
);
