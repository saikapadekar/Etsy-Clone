import {INSERT_TO_CART,GET_CART_BY_USER_ID,DELETE_FROM_CART,UPDATE_PRODUCT_FROM_CART} from './cartTypes'
import axios from 'axios'

export const insertoCart = (data) => (dispatch) =>{
    console.log(`Inside insertoCart :`,JSON.stringify(data) );

    axios.post(`http://localhost:7000/cart/insert`,data)
        .then(res => {
            console.log("INSERT_TO_CART RESPONSE: ",res.data);
            dispatch({
            type: INSERT_TO_CART,
            payload:  res.data,
            })
        })
        .catch((err) => {
            console.log(err);
        });
    }

export const getCartByUserid = (userid) => (dispatch) =>{
    console.log(`Inside getCartByUserid :`,(userid) );

    axios.get(`http://localhost:7000/cart/getall/${userid}`)
        .then(res => {
            console.log("GET_CART_BY_USER_ID RESPONSE: ",res.userid);
            dispatch({
            type: GET_CART_BY_USER_ID,
            payload:  res.data,
            })
        })
        .catch((err) => {
            console.log(err);
        });
    }

export const deleteFromCart = (data) => (dispatch) =>{
    console.log(`Inside deleteFromCart :`,JSON.stringify(data) );

    axios.post(`http://localhost:7000/cart/delete`,data)
        .then(res => {
            console.log("DELETE_FROM_CART RESPONSE: ",res.data);
            dispatch({
            type: DELETE_FROM_CART,
            payload:  res.data,
            })
        })
        .catch((err) => {
            console.log(err);
        });
    }