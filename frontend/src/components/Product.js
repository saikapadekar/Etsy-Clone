import React from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Card from "react-bootstrap/Card";
import { CardContent, CardMedia, Box, Button } from "@mui/material";
import { connect,useDispatch,useSelector } from 'react-redux';
import {insertfavorite,insertoCart} from '../redux'
import {  useNavigate } from 'react-router-dom';
/**1. Handle cart qty
 * 2. 
 */
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
    color:'rgb(240, 92, 38)',
    fontFamily:
      "Graphik Webfont,-apple-system,Helvetica Neue,Droid Sans,Arial,sans-serif",
    fontWeight: "50",
    fontSize: "13px",
  },
});

const Product = (prod) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(`Printing data for`,JSON.stringify(prod))
  const{name,price,product}=prod;

  var favorite={ userid:'',shopId:'',productId:'',url:'',name: '', description: '',price:'',qty_available:'',category:''};
  var cart={ userid:'',shopId:'',productId:'',name: '',price:'',qty:'',isGift:false,note:''};


  const user=useSelector(state=>state.user)
    const {
        authenticatedUser,
        authenticated,
        userLogindetails,
        authenticatedUserDetails
      } = user;
      
  const insertFav = () =>{
    //Should be able to add only if user is logged in
    console.log(`Inside insert fav`)
    if(JSON.stringify(authenticatedUserDetails)!='{}')
    {
      favorite={
        userid:authenticatedUserDetails._id,
        shopId:product.shopId,
        productId:product._id,
        url:product.url,
        name:product.name,
        description:product.description,
        price:product.price,
        qty_available:product.qty_available,
        category:product.category
      }
      console.log(`Dispatching insertFavorite fav: `, favorite)
      dispatch(insertfavorite(favorite));
      // navigate('/favorite')  
    }
  };
  const addToCart =()=>{
    console.log(`Inside addToCart`)
    if(JSON.stringify(authenticatedUserDetails)!='{}')
    {
      cart={
        userid:authenticatedUserDetails._id,
        shopId:product.shopId,
        productId:product._id,
        name:product.name,
        price:product.price,
      }
      console.log(`Dispatching insertoCart cart: `, cart)
      dispatch(insertoCart(cart));
      navigate('/cart')  
    }
  }
  return (
    <div>
        <Grid container className={classes.card}>
          <Grid container item xs={12} sm={12}>
            <Box sx={{ width: 350, height: 300, borderColor: "orange" }}>
              <Card className={classes.cardSize}>
                <CardContent>
                    <Link to={`/productview/${product._id}`}>
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
                        >
                          Add to Cart
                        </Button>
                       { (<Button
                          size="large"
                          startIcon={<FavoriteBorderIcon></FavoriteBorderIcon>}
                          className={classes.button}
                          // component={Link}
                          // to="/fav"
                          onClick={insertFav}
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
    insertfavorite: (favorite) => dispatch(insertfavorite(favorite)),
    insertoCart: (cart) => dispatch(insertoCart(cart)),
  }
}


export default connect(mapDispatchToProps)(Product);
