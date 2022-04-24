import {INSERT_TO_CART,GET_CART_BY_USER_ID,DELETE_FROM_CART,UPDATE_PRODUCT_FROM_CART} from './cartTypes'

const initialState = {
    cart:{},
    userCart:{},
    cartProduct:{}
}

const cartReducer = (state = initialState, action) =>{
    switch(action.type) {
        case INSERT_TO_CART:
            return{
                ...state,
                cart:action.payload
            }
        case GET_CART_BY_USER_ID:
            return{
                ...state,
                userCart:action.payload
            }
        case DELETE_FROM_CART:
            return{
                ...state,
                cartProduct:action.payload
            }
        case UPDATE_PRODUCT_FROM_CART:
            return{
                ...state
            }
        default : 
              return {
                  ...state
              }

    }
}

export default cartReducer