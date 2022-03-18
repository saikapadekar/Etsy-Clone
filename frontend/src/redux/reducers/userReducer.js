import { SIGNUP_USER, LOGIN_USER, EDIT_PROFILE, GET_AUTHENTICATED_USER, 
    CREATE_ORDER, GET_SELECTED_USER, LOGOUT_USER} from '../types'

const initialState = {
    authenticatedUser : {},
    selectedUser : {},
    authenticated : false,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState , action){
    switch(action.type){
        case SIGNUP_USER : 
            return {
                ...state,
                message : action.payload
            }

        case LOGIN_USER :
            return {
                ...state,
                authenticatedUser : action.payload,
                authenticated : true
            } 

        case GET_AUTHENTICATED_USER :
            return {
                ...state,
                authenticatedUser : action.payload,
                authenticated : true
            } 

        case GET_SELECTED_USER:
            return {
                ...state,
                selectedUser : action.payload
            } 

        case EDIT_PROFILE :
            return {
                ...state, 
                authenticatedUser : {
                    ...action.payload
                }
            }
          
        case CREATE_ORDER: 
            return {
                ...state,
            }
        case LOGOUT_USER :
            return {
                ...state, 
                authenticated : false,
                authenticatedUser : {}
            }   

        default : 
            return {
                ...state
            }
    }
}