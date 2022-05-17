import { CREATE_SHOP,GET_AUTHENTICATED_SHOP,GET_SHOP_BY_NAME,GET_SHOP_BY_NAME_TWO,GET_SHOP_BY_USER_ID } from './shopTypes'
import axios from 'axios'


export const createShop = (data,history) => (dispatch) =>{
    console.log("Inside createShop userAction"+JSON.stringify(data));

    return axios.post(`${window.BACKEND_API_URL}/shops/createshop`,data)
        .then(res => {
            dispatch({
            type: CREATE_SHOP,
            payload:  res.data,
            })
            // notify({ type: 'info', description: 'Created Shop' });
            history.push('/shop')
        })
        .catch((err) => {
            console.log(err)
        });
    }


export const getAuthenticatedShopData = (id) => (dispatch) =>{
    console.log("Inside getAuthenticatedShopData userAction id: "+JSON.stringify(id));

    return axios.get(`${window.BACKEND_API_URL}/shops/${id}`,id)
        .then(res => {
            dispatch({
            type: GET_AUTHENTICATED_SHOP,
            payload:  res.data,
            })
            // notify({ type: 'info', description: 'Created Shop' });
            // history.push('/shop')
        })
        .catch((err) => {
            console.log(err)
        });
    }


export const getShopDataByName = (name) => (dispatch) =>{
    console.log("Inside getShopDataByName name: "+JSON.stringify(name));

    return axios.get(`${window.BACKEND_API_URL}/shops/name/${name}`,name)
        .then(res => {
            dispatch({
            type: GET_SHOP_BY_NAME,
            payload:  res.data,
            })
            // notify({ type: 'info', description: 'Created Shop' });
            // history.push('/shop')
        })
        .catch((err) => {
            console.log(err)
        });
    }

export const getShopDataByNameTwo = (name) => (dispatch) =>{
    console.log("Inside getShopDataByNameTwo name: "+JSON.stringify(name));

    axios.get(`${window.BACKEND_API_URL}/shops/nametwo/${name}`,name)
        .then(res => {
            dispatch({
            type: GET_SHOP_BY_NAME_TWO,
            payload:  res.data,
            })
        })
        .catch((err) => {
            console.log(err)
        });
    }


export const getShopDataByUserId = (userid) => (dispatch) =>{
    console.log("Inside getShopDataByUserId name: "+JSON.stringify(userid));

    axios.get(`${window.BACKEND_API_URL}/shops/user/${userid}`,userid)
        .then(res => {
            dispatch({
            type: GET_SHOP_BY_USER_ID,
            payload:  res.data,
            })
        })
        .catch((err) => {
            console.log(err)
        });
    }