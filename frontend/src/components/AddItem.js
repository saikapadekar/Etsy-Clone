/**Things to handle:
 * 1. Navigation to -1 page(ie shop page) --done
 * 2. Adding category dynamically
 * 3. Handle that page is accessible only if owner is logged in
 * 4. Sending shopid to insert product  --done
 */
import React, { useEffect, useState } from 'react';
import { connect,useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import '../../src/login.css'
import {insertShopProduct,getShopDataByNameTwo} from '../redux'
import {  useParams } from "react-router-dom";
import {useSelector} from 'react-redux'
import jwt_decode from "jwt-decode";


const AddItem = (props) => {

    const [item, setItem] = useState({ shopId:'',url:'',name: '', description: '',price:'',qty_available:'',category:''})
    const { shopname } = useParams();
    console.log(`Received shopname from URL params`,shopname)

    const user=useSelector(state=>state.user)
    console.log(`Printing user value from store`,JSON.stringify(user))
    const {
        authenticatedUser,
        authenticated,
        userLogindetails
      } = user;

      const store_shop=useSelector(state=>state.shop)

    const {shopdetails, shopbyname}=store_shop;


    


    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getShopDataByNameTwo(shopname))
    }, [shopname])



    const handleChange=(event)=>{
        setItem(
            {
                ...item,
                [event.target.name] : event.target.value
            }
        )
    };
    let flag=false;
    if(typeof(authenticatedUser.token)!='undefined' && typeof(shopbyname.id)!='undefined')
    {
        var decoded = jwt_decode(authenticatedUser.token);
        if(decoded.id==shopbyname.id)
            {
                flag=true;
                console.log('Logged in user is owner of shop')
            }
    }

    item.shopId=shopbyname.id; //To set shop_id(Product is inserted for specific shop)

const handleSubmit =(event) => {
    event.preventDefault()
    console.log('Inside HandleSubmit AddItem.js')
    dispatch(insertShopProduct(item))
    navigate(-1)
};


console.log(`Printing from props`,JSON.stringify(props))

    return (
        
        <div>
            <form noValidate >
               
  <header>
      <h2>Add Product</h2>
  </header>
<br/>
 <div className='input'>
 <TextField id="url" name="url" className ="textField" placeholder="Image"
                            value={item.url} 
                            onChange={handleChange} variant="outlined"></TextField>
               <TextField 
                            id ="name" 
                            name="name" 
                            placeholder="Product Name" 
                            type="name"
                            className="textField"
                            variant="outlined"
                            value={item.name} 
                            onChange= {handleChange}
                        />
                        <TextField 
                            id ="description" 
                            name="description" 
                            placeholder="Description" 
                            type="description"
                            className="textField"
                            variant="outlined"
                            value={item.description} 
                            onChange= {handleChange}
                        />
                        <TextField 
                            id ="price" 
                            name="price" 
                            placeholder="Price" 
                            type="price"
                            className="textField"
                            variant="outlined"
                            value={item.price} 
                            onChange= {handleChange}
                        />
                        <TextField 
                            id ="qty_available" 
                            name="qty_available" 
                            placeholder="Quantity"
                            className="textField"
                            variant="outlined"
                            value={item.qty_available} 
                            onChange= {handleChange}
                        />
                        <TextField 
                            id ="category" 
                            name="category" 
                            placeholder="Category" 
                            type="category"
                            className="textField"
                            variant="outlined"
                            value={item.category} 
                            onChange= {handleChange}
                        />
                        </div>
                        <br/>
                        <div className='buttons'>
                        <Button type="submit" variant="contained"  className="submit" onClick ={handleSubmit }>
                            Add Product
                        </Button>
                        </div>
            </form>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
      userData: state.user,
      authenticated: state.authentication,
      
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        insertShopProduct: (item) => dispatch(insertShopProduct(item)),
        getShopDataByNameTwo: (shopname) => dispatch(getShopDataByNameTwo(shopname)),

    }
  }
  

export default connect(mapStateToProps
    ,mapDispatchToProps
    )(AddItem);