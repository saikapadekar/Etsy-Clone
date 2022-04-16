import { CREATE_SHOP,GET_AUTHENTICATED_SHOP } from './shopTypes'
import axios from 'axios'


export const createShop = (data,history) => (dispatch) =>{
    console.log("Inside createShop userAction"+JSON.stringify(data));

    axios.post(`http://localhost:7000/shops/createshop`,data)
        .then(res => {
            dispatch({
            type: CREATE_SHOP,
            payload:  res.data,
            })
            notify({ type: 'info', description: 'Created Shop' });
            history.push('/shop')
        })
        .catch((err) => {
            notify({ type: 'error', description: JSON.stringify(err.response.data.message) });
        });
    }


export const getAuthenticatedShopData = (id) => (dispatch) =>{
    console.log("Inside getAuthenticatedShopData userAction id: "+JSON.stringify(id));

    axios.get(`http://localhost:7000/shops/${id}`,id)
        .then(res => {
            dispatch({
            type: GET_AUTHENTICATED_SHOP,
            payload:  res.data,
            })
            // notify({ type: 'info', description: 'Created Shop' });
            // history.push('/shop')
        })
        .catch((err) => {
            notify({ type: 'error', description: JSON.stringify(err.response.data.message) });
        });
    }
