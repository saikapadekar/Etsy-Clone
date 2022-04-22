import { LOGIN_USER, SIGNUP_USER,ADD_LOGIN_DETAILS,AUTHENTICATED_USER } from "./userTypes"


const initialState = {
    authenticatedUser : {}, //for token
    authenticated : false, //to check if user is logged in or not
    userLogindetails:{}, //to store email and pwd
    authenticatedUserDetails:{}//to store userid
}

const userReducer = (state = initialState, action) =>{
    switch(action.type) {
        case SIGNUP_USER : 
            return {
                ...state,
                message : action.payload
            }

        case LOGIN_USER :
            return {
                ...state,
                authenticatedUser: action.payload,
                authenticated:true
              };
        case ADD_LOGIN_DETAILS :
            return {
                ...state,
                userLogindetails:action.payload
              };
        case AUTHENTICATED_USER :
            return {
                ...state,
                authenticatedUserDetails:action.payload
                };
        default : 
              return {
                  ...state
              }

    }
}

export default userReducer