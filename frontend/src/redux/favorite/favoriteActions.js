import {INSERT_FAVORITE,GET_FAVORITE_BY_USER_ID,DELETE_FAVORITE} from './favoriteTypes'
import axios from 'axios'

export const insertfavorite = (data) => (dispatch) =>{
    console.log(`Inside insertfavorite :`,JSON.stringify(data) );

    axios.post(`http://localhost:7000/favorites/insert`,data)
        .then(res => {
            console.log("INSERT_FAVORITE RESPONSE: ",res.data);
            dispatch({
            type: INSERT_FAVORITE,
            payload:  res.data,
            })
        })
        .catch((err) => {
            console.log(err);
        });
    }

export const getfavoriteByUserid = (userid) => (dispatch) =>{
    console.log(`Inside getfavoriteByUserid :`,(userid) );

    axios.get(`http://localhost:7000/favorites/getall/${userid}`)
        .then(res => {
            console.log("GET_FAVORITE_BY_USER_ID RESPONSE: ",res.userid);
            dispatch({
            type: GET_FAVORITE_BY_USER_ID,
            payload:  res.data,
            })
        })
        .catch((err) => {
            console.log(err);
        });
    }

export const deletefavorite = (data) => (dispatch) =>{
    console.log(`Inside insertfavorite :`,JSON.stringify(data) );

    axios.post(`http://localhost:7000/favorites/delete`,data)
        .then(res => {
            console.log("DELETE_FAVORITE RESPONSE: ",res.data);
            dispatch({
            type: DELETE_FAVORITE,
            payload:  res.data,
            })
        })
        .catch((err) => {
            console.log(err);
        });
    }