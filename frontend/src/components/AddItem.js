import React, { Component } from 'react';
import {insertShopProduct,getAllShopProducts} from '../redux/actions/userActions'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import jwt_decode from "jwt-decode";
import {connect} from 'react-redux'
class AddItem extends Component {
constructor(props) {
    super(props);
    this.state={
                url:'',
                name:'',
                category:'',
                description:'',
                price:'',
                qty_available:'',
                shopId:'',
                sold:'0'
                };
}
handleChange = (event) => {
    this.setState({
        [event.target.name] : event.target.value
    })
}

    handleSubmit = (event) => {
        console.log("inside handleSubmit AddItem.js");
        event.preventDefault()

        var productData = {
            url:this.state.url,
            name:this.state.name,
            category:this.state.category,
            description:this.state.description,
            price:this.state.price,
            qty_available:this.state.qty_available,
            shopId:this.state.shopId,
            sold:'0'            
        }
        console.log(productData)

        this.props.insertShopProduct(productData,this.props.history)
        // this.props.getAllShopProducts()

        this.props.history.push('/productview')
//todo handle image
        event.preventDefault()
    }
    render() {
        const {classes} = this.props
        const {authenticated, authenticatedUser,selectedUser} = this.props.user

        console.log(`inside AddItem.js Is user authenticated? `,authenticated)
        
        var decoded = jwt_decode(authenticatedUser.token);
 
        console.log(`decoded`,decoded.id);
        // this.state.id=decoded.id;
        this.state.shopId=decoded.id
        return (
            <div>
            <form noValidate >
               
               <header>
                  <h2>Add Product</h2>
               </header>
               <br/>
               <div className='input'></div>
               <TextField id="url" name="url" className ="textField" placeholder="Image"
                            value={this.state.url} 
                            onChange={this.handleChange} variant="outlined"></TextField>
               <TextField 
                            id ="name" 
                            name="name" 
                            placeholder="Product Name" 
                            type="name"
                            className="textField"
                            variant="outlined"
                            value={this.state.name} 
                            onChange= {this.handleChange}
                        />
                        <TextField 
                            id ="description" 
                            name="description" 
                            placeholder="Description" 
                            type="description"
                            className="textField"
                            variant="outlined"
                            value={this.state.description} 
                            onChange= {this.handleChange}
                        />
                        <TextField 
                            id ="price" 
                            name="price" 
                            placeholder="Price" 
                            type="price"
                            className="textField"
                            variant="outlined"
                            value={this.state.price} 
                            onChange= {this.handleChange}
                        />
                        <TextField 
                            id ="qty_available" 
                            name="qty_available" 
                            placeholder="Quantity"
                            className="textField"
                            variant="outlined"
                            value={this.state.qty_available} 
                            onChange= {this.handleChange}
                        />
                        <TextField 
                            id ="category" 
                            name="category" 
                            placeholder="Category" 
                            type="category"
                            className="textField"
                            variant="outlined"
                            value={this.state.category} 
                            onChange= {this.handleChange}
                        />
                        <br/> <br/>
                        <Button type="submit" variant="contained"  className="submit" onClick ={this.handleSubmit }>
                            Add Product
                        </Button>
               </form>
               </div>
        );
    }
}

// export default AddItem;

const mapStateToProps = (state) => ({
    user : state.user
    
})

export default connect(mapStateToProps, {insertShopProduct,getAllShopProducts} )((AddItem));
