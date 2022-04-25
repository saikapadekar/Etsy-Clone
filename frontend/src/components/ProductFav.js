import React from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Card from "react-bootstrap/Card";
import { CardContent, CardMedia, Box, Button } from "@mui/material";
import { connect,useDispatch,useSelector } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom';
import {deletefavorite,insertoCart} from '../redux'
import { ADD_PRODUCT } from '../redux/product/productTypes';
// remove from fav

const useStyles = makeStyles({
  avatar : {
      height :'200px',
      width :'200px',
  },
  field : {
      paddingTop : '15px',
      fontSize : '22px',
      width : '300px',
      fontWeight : '700'
  },
  root: {
    display: "flex",
    flexGrow: 1,
    // padding: theme.spacing(2),
  },
  card: {
    width: "300px",
    height: "290px",
    position: "relative",
    display: "flex",
    FavoriteBorderIcon,
  },
  image: {
    width: "450px",
    height: "210px",
    // backgroundSize: 'cover',
    // objectFit : 'cover',
    // resize: 'both',
    // backgroundPosition: 'center',
    // margin:'10px'
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
  button: {
    color:'white',
    backgroundColor:'rgb(240, 92, 38)'
    // fontFamily:
    //   "Graphik Webfont,-apple-system,Helvetica Neue,Droid Sans,Arial,sans-serif",
    // fontWeight: "50",
    // fontSize: "13px",
  },
});

const ProductFav = (prod) => {
    console.log(`Inside ProductFav Component`)
    const navigate=useNavigate();

  const classes = useStyles();
  const dispatch = useDispatch();
  console.log(`Printing data for`,JSON.stringify(prod))
  const{name,price,product}=prod;
  console.log(`ProductFav product: `,JSON.stringify(product))//object of favorite

    const user=useSelector(state=>state.user)
    const {
        authenticatedUser,
        authenticated,
        userLogindetails,
        authenticatedUserDetails
      } = user;
      var data={userid:product.userid,productId:product.productId}

    const removeFav = () =>{
        console.log(`Dispatching deletefavorite for data: `, data)
        dispatch(deletefavorite(data))
        navigate('/')
    };
    var cart={ url:'',userid:'',shopId:'',productId:'',name: '',price:'',qty:'',isGift:false,note:''};

    const addToCart =()=>{
      console.log(`Inside addToCart`)
      if(JSON.stringify(authenticatedUserDetails)!='{}')
      {
        cart={
          userid:authenticatedUserDetails._id,
          shopId:product.shopId,
          url:product.url,
          productId:product._id,
          name:product.name,
          price:product.price,
        }
        console.log(`Dispatching insertoCart cart: `, cart)
        dispatch(insertoCart(cart));
        // navigate('/favorite')  
      }
    }
  return (
    <div>
        <Grid container className={classes.card}>
          <Grid container item xs={12} sm={12}>
            <Box sx={{ width: 350, height: 300, borderColor: "orange" }}>
              <Card className={classes.cardSize}>
                <CardContent>
                    <Link underline="none" variant='inherit'to={`/productview/${product.productId}`} >
                        <div key={prod.id} className="productStyle">
                          <CardMedia
                            component="img"
                            image={product.url}
                            className={classes.image}
                          />
                          <Grid container item xs={12} className={classes.name}>
                            {product.name} 
                          </Grid>
                          <Grid container item xs={12} className={classes.name}>
                            $ {product.price}
                          </Grid>
                        </div>
                    </Link>
                    <Grid container item xs={12}>
                        <Button
                          className={classes.button}
                          onClick={addToCart}
                          component={Link}
                          to="/buy"
                        >
                          Add to Cart
                        </Button>
                        {(<Button
                          size="large"
                          startIcon={<FavoriteIcon></FavoriteIcon>}
                          className={classes.button}
                          // component={Link}
                          // to="/fav"
                          onClick={removeFav}
                        ></Button>)}
                    </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    deletefavorite: (data) => dispatch(deletefavorite(data)),
    insertoCart: (cart) => dispatch(insertoCart(cart)),
  }
}


export default connect(mapDispatchToProps)(ProductFav);
