import {GET_PRODUCTS_FOR_SHOP,ADD_PRODUCT,GET_PRODUCTS_ALL,GET_PRODUCT,GET_PRODUCT_BY_NAME} from './productTypes'
import axios from 'axios'


export const getAllShopProducts = () => (dispatch) =>{
        console.log("Inside getAllShopProducts ");
    
        axios.get(`http://localhost:7000/products/getallitem`)
            .then(res => {
                dispatch({
                type: GET_PRODUCTS_ALL,
                payload:  res.data,
                })
                // notify({ type: 'info', description: 'Created Shop' });
                // history.push('/shop')
            })
            .catch((err) => {
                // notify({ type: 'error', description: JSON.stringify(err) });
            });
        }

export const insertShopProduct = (data) => (dispatch) =>{
    console.log(`Inside insertShopProduct :`,JSON.stringify(data) );

    axios.post(`http://localhost:7000/products/insert`,data)
        .then(res => {
            console.log("ADDPRODUCT RESPONSE: ",res.data);
            dispatch({
            type: ADD_PRODUCT,
            payload:  res.data,
            })
            // notify({ type: 'info', description: 'Inserted Product' });
            // history.push('/productview')
        })
        .catch((err) => {
            // notify({ type: 'error', description: JSON.stringify(err) });
        });
    }


export const getShopProducts = (id) => (dispatch) =>{
    console.log(`Inside getShopProducts by Shop id: `,id);

    axios.get(`http://localhost:7000/products/getall/${id}`,id)
        .then(res => {
            dispatch({
            type: GET_PRODUCTS_FOR_SHOP,
            payload:  res.data,
            })
        })
        .catch((err) => {
            // notify({ type: 'error', description: JSON.stringify(err) });
        });
    }

export const getProductbyId = (id) => (dispatch) =>{
    console.log(`Inside getProductbyId-new, Shop id: `,id);

    axios.get(`http://localhost:7000/products/product/${id}`,id)
        .then(res => {
            dispatch({
            type: GET_PRODUCT,
            payload:  res.data,
            })
        console.log(`printing response of getProductbyId`,res.data)

        })
        .catch((err) => {
            // notify({ type: 'error', description: JSON.stringify(err) });
        });
    }

export const getProductbyName = (name) => (dispatch) =>{
    console.log(`Inside getProductbyName, name: `,name);

    return axios.get(`http://localhost:7000/products/prodbyname`,{params: {name}})
        .then(res => {
            dispatch({
            type: GET_PRODUCT_BY_NAME,
            payload:  res.data,
            })
        console.log(`printing response of getProductbyName`,res.data)

        })
        .catch((err) => {
            console.log(err)
        });
    }