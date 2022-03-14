import { SIGNUP_USER, LOGIN_USER, GET_AUTHENTICATED_USER} from '../types'

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

        
        default : 
            return {
                ...state
            }
    }
}