import {INSERT_TO_CART,GET_CART_BY_USER_ID,DELETE_FROM_CART,UPDATE_PRODUCT_FROM_CART} from './cartTypes'
import axios from 'axios'

export const insertoCart = (data) => (dispatch) =>{
    console.log(`Inside insertoCart :`,JSON.stringify(data) );

    return axios.post(`${window.BACKEND_API_URL}/cart/insert`,data)
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

    return axios.get(`${window.BACKEND_API_URL}/cart/getall/${userid}`)
        .then(res => {
            console.log("GET_CART_BY_USER_ID RESPONSE: ",res.data);
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

    return axios.post(`${window.BACKEND_API_URL}/cart/delete`,data)
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

export const updateCartProduct=(data)=>(dispatch)=>{
    console.log(`Inside updateCartProducts :`,JSON.stringify(data) );

    return axios.put(`${window.BACKEND_API_URL}/cart/edit`,data)
        .then(res => {
            console.log("UPDATE_PRODUCT_FROM_CART RESPONSE: ",res.data);
            dispatch({
            type: UPDATE_PRODUCT_FROM_CART,
            payload:  res.data,
            })
        })
        .catch((err) => {
            console.log(err);
        });
}