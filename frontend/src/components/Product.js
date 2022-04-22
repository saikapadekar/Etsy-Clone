import React,{useEffect,useState} from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Card from "react-bootstrap/Card";
import { CardContent, CardMedia, Box, Button } from "@mui/material";
import { connect,useDispatch,useSelector } from 'react-redux';
import {insertfavorite} from '../redux'
import axios from 'axios'
// check if fav exists - set flag to true, if true call removefromFav
// else - insertFavorite

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
    color: "black",
    fontFamily:
      "Graphik Webfont,-apple-system,Helvetica Neue,Droid Sans,Arial,sans-serif",
    fontWeight: "50",
    fontSize: "13px",
  },
});

const Product = (prod) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  console.log(`Printing data for`,JSON.stringify(prod))
  const{name,price,product}=prod;

  // const [favorite, setfavorite] = useState({ userid:'',shopId:'',productId:'',url:'',name: '', description: '',price:'',qty_available:'',category:''})
  var favorite={ userid:'',shopId:'',productId:'',url:'',name: '', description: '',price:'',qty_available:'',category:''};
  const user=useSelector(state=>state.user)
    const {
        authenticatedUser,
        authenticated,
        userLogindetails,
        authenticatedUserDetails
      } = user;
      var data={userid:'',productId:''}; var flag_for_fav=false;
      data={
          userid:authenticatedUserDetails._id,
          productId:product._id
      }
      axios
        .get(`http://localhost:7000/favorites/checkfav`, data)
        .then((response) => {
            console.log("Status Code : ", response.status);
            if (response.status === 200) {
              flag_for_fav=true;
            }
        })
        .catch((e) => {
            console.error(e);
            // Not present in fav
        });
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
    }
  };

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
                            {product.price}
                          </Grid>
                        </div>
                    </Link>
                    <Grid container item xs={12}>
                        <Button
                          className={classes.button}
                          component={Link}
                          to="/buy"
                        >
                          Buy Now
                        </Button>
                       {!flag_for_fav && (<Button
                          size="large"
                          startIcon={<FavoriteBorderIcon></FavoriteBorderIcon>}
                          className={classes.button}
                          // component={Link}
                          // to="/fav"
                          onClick={insertFav}
                        ></Button>)}
                        {flag_for_fav && (<Button
                          size="large"
                          startIcon={<FavoriteIcon></FavoriteIcon>}
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

  }
}


export default connect(mapDispatchToProps)(Product);
