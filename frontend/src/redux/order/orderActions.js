import {CREATE_ORDER,GET_ORDER_BY_ID,GET_ALL_ORDERS_FOR_USERID} from './orderTypes'
import axios from 'axios'

export const getOrderById = (orderid) => (dispatch) =>{
    console.log(`Inside getOrderById :`,(orderid) );

    return axios.get(`${window.BACKEND_API_URL}/orders/getall/${orderid}`)
        .then(res => {
            console.log("GET_ORDER_BY_ID RESPONSE: ",res.data);
            dispatch({
            type: GET_ORDER_BY_ID,
            payload:  res.data,
            })
        })
        .catch((err) => {
            console.log(err);
        });
    }

export const createOrder = (userid) => (dispatch) =>{
    console.log(`Inside createOrder :`,(userid) );

    return axios.post(`${window.BACKEND_API_URL}/orders/createorder/${userid}`)
        .then(res => {
            console.log("CREATE_ORDER RESPONSE: ",res.data);
            dispatch({
            type: CREATE_ORDER,
            payload:  res.data,
            })
        })
        .catch((err) => {
            console.log(err);
        });
    }

export const getOrdersByUserId = (userid,limit,offset)=>(dispatch) =>{
    console.log(`Inside createOrder :`,(userid) );

    return axios.get(`${window.BACKEND_API_URL}/orders/getall/user/${userid}`,{ params: {limit, offset}})
        .then(res => {
            console.log("GET_ALL_ORDERS_FOR_USERID RESPONSE: ",res.data);
            dispatch({
            type: GET_ALL_ORDERS_FOR_USERID,
            payload:  res.data,
            })
        })
        .catch((err) => {
            console.log(err);
        });
}