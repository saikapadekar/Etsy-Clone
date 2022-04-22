import { GET_SELECTED_USER,    EDIT_PROFILE,    CREATE_CUSTOMER, GET_CUSTOMER } from './customerTypes'

const initialState = {
    createdCustomer:{},
    selectedCustomer : {} //for entire profile
}

const customerReducer = (state = initialState, action) =>{
    switch(action.type) {

        case CREATE_CUSTOMER:
        return {
            ...state,
            createdCustomer : action.payload
        }

        case GET_SELECTED_USER:
        return {
            ...state,
            selectedCustomer : action.payload
        }

        case GET_CUSTOMER:
        return {
            ...state,
            selectedCustomer : action.payload
        }

        default : 
              return {
                  ...state
              }

    }
}

export default customerReducer