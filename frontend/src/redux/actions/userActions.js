import axios from 'axios';
import { getCookie } from 'react-use-cookie';
import notify from '../../utils/notify';
import {LOGIN_USER,SIGNUP_USER,GET_SELECTED_USER,EDIT_PROFILE,CREATE_CUSTOMER} from '../types'

// export const loginUser = (data) => {
//     return (dispatch) => {
//       const token = getCookie('auth');
//       console.log("inside userActions");
//       return axios
//         .post('login', data, { headers: { Authorization: token } })
//         .then((res) => {
//           dispatch({
//             type: LOGIN_USER,
//             payload: res.data,
//           });
//           notify({ type: 'info', description: 'Created Customer' });
//         })
//         .catch((err) => {
//           notify({ type: 'error', description: JSON.stringify(err.response.data.message) });
//         });
//     };
//   };
  export const loginUser = (newUser, history) => (dispatch) => {
    const token = getCookie('auth');
    console.log("inside userActions loginUser");
    axios.post('http://localhost:7000/auth/login', newUser, { headers: { Authorization: token } })
        .then(res => {
            dispatch({
                type: LOGIN_USER,
                payload: res.data,//goes in authenticatedUser
              });
              let token = res.data
                localStorage.setItem('userToken' , token )
                axios.defaults.headers.common['Authorization'] = token

                // dispatch(getAuthenticatedUserData())
             // console.log(history)
              history.push('/')
            console.log("login successful")
              
        })
        .catch(err => {
            console.log(err)
        })
}

export const signupUser = (newUser, history) => (dispatch) => {

    const token = getCookie('auth');
    console.log("inside userActions signupUser");

    console.log(JSON.stringify(newUser));
    console.log(JSON.stringify(history));


    axios.post('http://localhost:7000/auth/signup', newUser, { headers: { Authorization: token } })
        .then(res => {
            dispatch({
                type : SIGNUP_USER,
                payload : res.data
            })
            history.push('/login')
            console.log("signup successful")
        })
        .catch(err => {
            console.log(err)
        })
}

export const getSelectedUser = (userid) => (dispatch) => {
    console.log("inside userActions getSelectedUser"+JSON.stringify(userid));
    axios.get(`http://localhost:7000/customers/${userid}`)
        .then(res => {
            dispatch({
                type : GET_SELECTED_USER,
                payload : res.data[0]
            })
        })
        .catch(err => console.log(err) )
    }

export const editProfile = (userid,userDetails) => (dispatch) => {
    console.log("Inside editProfile userAction"+JSON.stringify(userDetails));

    axios.post(`http://localhost:7000/customers/edit/${userid}`, userDetails)
        .then(res => {
            dispatch({
                type : EDIT_PROFILE,
                payload : userDetails
            })
            console.log("user profile edit successful")
        })
        .catch(err => {
            console.log(err)
        })
}

export const createCustomer = (data) => (dispatch) =>{
    console.log("Inside createCustomer userAction"+JSON.stringify(data));

    axios.post(`http://localhost:7000/customers/createcustomer`,data)
        .then(res => {
          dispatch({
            type: CREATE_CUSTOMER,
            payload:  res.data,
          })
          notify({ type: 'info', description: 'Created Customer' });
        })
        .catch((err) => {
          notify({ type: 'error', description: JSON.stringify(err.response.data.message) });
        });
    }

    