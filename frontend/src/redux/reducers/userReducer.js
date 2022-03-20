import { SIGNUP_USER, LOGIN_USER, EDIT_PROFILE, GET_AUTHENTICATED_USER, 
    CREATE_ORDER, GET_SELECTED_USER, LOGOUT_USER,CREATE_CUSTOMER,CREATE_SHOP} from '../types'

const initialState = {
    authenticatedUser : {},
    selectedUser : {},
    authenticated : false,
    shopdetails:{}
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
                authenticatedUser: action.payload,
                authenticated:true
                // medium: action.payload.medium,
              };
        
        case GET_SELECTED_USER:
        return {
            ...state,
            selectedUser : action.payload
        }
        case CREATE_CUSTOMER:
        return {
            ...state,
            selectedUser : action.payload
        }
        case CREATE_SHOP:
            return{
                ...state,
                shopdetails:action.payload
            }

        default : 
        return {
            ...state
        }
    }
}