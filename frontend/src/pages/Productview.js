/**Things to do
 * 1. Get product id from URL params -- done
 * 2. call useEffect to get data for that id --done
 * 3. Display shopname and add hyperlink --remaining
 * 4. Display Currency symbol --remaining
 * 5. Select qty while add to cart --remaining
 */


 import React, { useEffect } from 'react';
 import { connect,useDispatch } from 'react-redux';
 import { useParams } from 'react-router-dom';
 import { Button } from '@material-ui/core'
 import { Link } from 'react-router-dom'
 import {useSelector} from 'react-redux'
 import {getProductbyId} from '../redux'
 import { makeStyles } from '@material-ui/core/styles';
 import Grid from '@material-ui/core/Grid'
import FavoriteIcon from '@mui/icons-material/Favorite';


 const useStyles = makeStyles({
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
        fontFamily:'"Guardian-EgypTT",Charter,"Charter Bitstream",Cambria,"Noto Serif Light","Droid ',
        fontWeight:'600px',
        borderStyle:'ridge',
        fontSize : '22px',

    },
    header:{
        margin:'100px'
    },
    button:{
        borderStyle:'solid',
        width:'300px',
        backgroundColor:'rgb(240, 92, 38)',
        color:'white'
    },
    tile : {
        width:'380px',
        height:'410px'
    },
    image :{
        margin:'50px'
    }
});


 const Productview = () => {

    const classes = useStyles();
    const { product_id } = useParams();
    const dispatch=useDispatch();
    console.log(`Received product_id from URL params`,product_id)

    //Get product details according to product_id
    useEffect(() => {
        dispatch(getProductbyId(product_id))
    }, [product_id])

    const store_products=useSelector(state=>state.product)
    console.log(store_products)
    const {product}=store_products;
    // console.log(`To check url`,JSON.stringify(product.url))

     return (
         <div><br/>
             <Grid direction="row" container className={classes.main}>
                 
                 <Grid container item xs={6}>
                 <div className={classes.image}>
                    <img src={product.url} 
                    alt={product.name} 
                    className={classes.tile} />
                    
                    <Button variant="contained" className={classes.button}  
                    startIcon={<FavoriteIcon />} component = {Link} to="/favorite"> Add to Collection
                        </Button>
                        </div>
                 </Grid>
                 
                 <Grid container item xs={6} >
                    <div>
                    <Grid container item xs={1}>
                    <div>
                    <div>
                        <br/>
                        <br/>
                    <h3>Product Name:</h3>
                    <div className={classes.details}>
                    {product.name}
                    </div>
                    </div>
                    <br/>
                    <div>
                    <h3>Price:</h3>
                    <div className={classes.details}>
                    $ {product.price}
                    </div>
                    </div>

                    <br/>
                    <div>
                    <h3>Category:</h3>
                    <div className={classes.details}>
                    {product.category}
                    </div>
                    </div>

                    <br/>
                    <div>
                    <h3>Description:</h3>
                    <div className={classes.details}>
                    {product.description}
                    </div>
                    </div>
                    
                    <br/>
                    <div>
                    <h3>Quantity:</h3>
                    <div className={classes.details}> 
                    {product.qty_available}
                    </div>
                    </div>
                    <br/>
                    <Button variant="contained" className={classes.button}  component = {Link} to="/cart"  >Add to Cart </Button>
                    <br/><br/>
                    <Button variant="contained" className={classes.button}  component = {Link} to="/buy"  >Buy it Now </Button>
                    <br/><br/>
                 
                    </div>
                    </Grid>
                    </div>
                 </Grid>
             </Grid>
             
         </div>
     );
 };


 const mapDispatchToProps = dispatch => {
    return {
        
        getProductbyId: (product_id) => dispatch(getProductbyId(product_id))

    }
  }

 
 export default connect(mapDispatchToProps)(Productview);