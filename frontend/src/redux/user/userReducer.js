import { LOGIN_USER, SIGNUP_USER } from "./userTypes"


const initialState = {
    authenticatedUser : {}, //for token
    selectedUser : {}, //for entire profile
    authenticated : false //to check if user is logged in or not
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
                // medium: action.payload.medium,
              };
        default : 
              return {
                  ...state
              }

    }
}

export default userReducer