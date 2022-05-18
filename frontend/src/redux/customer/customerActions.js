import { GET_SELECTED_USER,    EDIT_PROFILE,    CREATE_CUSTOMER, GET_CUSTOMER } from './customerTypes'
import axios from 'axios'
import { setCookie } from 'react-use-cookie';
import { createCustomer as createCustomerQ } from '../../mutations/mutations';
import query from '../../utils/graphql/query';

export const createCustomer = (data) => {
    console.log("Inside createCustomer userAction"+JSON.stringify(data));

    return async (dispatch) => {
        try {
            const response = await axios
                .post(`${window.BACKEND_API_URL}/customers/createcustomer`,data);
            dispatch({
                type: CREATE_CUSTOMER,
                payload: response.data,
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}

// export const createCustomer = (data) => {
//     console.log("Inside createCustomer customerAction"+JSON.stringify(data));

//     return async (dispatch) => {
//         return query(createCustomerQ, { customer: data })
//         .then((response)=>{
//             dispatch({
//                 type: CREATE_CUSTOMER,
//                 payload: response.data,
//             });

//         })
//         .catch((err) => {
//             console.log(err)
//           });
//     }
// }

export const editProfile = (userid,userDetails) => (dispatch) => {
    console.log("Inside editProfile userAction"+JSON.stringify(userDetails));

    return axios.post(`${window.BACKEND_API_URL}/customers/edit/${userid}`, userDetails)
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


export const getSelectedUser = (userid) => (dispatch) => {
    console.log("inside userActions getSelectedUser"+JSON.stringify(userid));
    return axios.get(`${window.BACKEND_API_URL}/customers/${userid}`)
        .then(res => {
            dispatch({
                type : GET_SELECTED_USER,
                payload : res.data[0]
            })
        })
        .catch(err => console.log(err) )
    }

export const getCustomerByEmail = (email) => (dispatch) => {
    console.log("inside userActions getCustomerByEmail"+JSON.stringify(email));
    return axios.post(`${window.BACKEND_API_URL}/customers/customerbyemail`,{email})
        .then(res => {
            dispatch({
                type : GET_CUSTOMER,
                payload : res.data
            })
            console.log(`Writing payload getcustomerbyEmail`,res.data)
        })
        .catch(err => console.log(err) )
    }