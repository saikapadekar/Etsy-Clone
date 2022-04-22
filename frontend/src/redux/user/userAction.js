import { LOGIN_USER, SIGNUP_USER ,ADD_LOGIN_DETAILS,AUTHENTICATED_USER} from './userTypes'
import axios from 'axios'
import { setCookie } from 'react-use-cookie';


export const loginUser = (newUser) => {
    console.log(`Printing userAction loginUser newUser: `,(newUser));

    return async (dispatch) => {
        try {
            const response = await axios
                .post('http://localhost:7000/auth/login', newUser);
            dispatch({
                type: LOGIN_USER,
                payload: response.data,
            });
            //   notify({ type: 'info', description: 'Created Customer' });
            const token = response.data;
            setCookie('auth', token, { path: '/' });
            localStorage.setItem('auth' , token )
            console.log("loginUser successful");
            // navigate('/')
        } catch (error) {
            console.log(error);
        }
    }
}


export const signupUser = (newUser) => {
    console.log("inside userActions signupUser");

    console.log(JSON.stringify(newUser));
    // console.log(JSON.stringify(history));

    return async (dispatch) => {
        console.log();
        try {
            const response = await axios
                .post('http://localhost:7000/auth/signup', newUser);
            dispatch({
                type: SIGNUP_USER,
                payload: response.data,
            });
            //   notify({ type: 'info', description: 'Created Customer' });
            const token = response.data;
            console.log("signupUser successful");
        } catch (error) {
            console.log(error);
        }
    }
}

export const addLoginDetails = (user) => {
    return {
      type: ADD_LOGIN_DETAILS,
      payload: user
    }
  }


export const getAuthenticatedUser = (email) => {
    console.log("inside userActions getAuthenticatedUser for email: " +email);

    return async (dispatch) => {
        try {
            const response = await axios
                .post('http://localhost:7000/auth/authenticatedUser', {email});
            dispatch({
                type: AUTHENTICATED_USER,
                payload: response.data,
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}