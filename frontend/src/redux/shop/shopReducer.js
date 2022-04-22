import { CREATE_SHOP, GET_AUTHENTICATED_SHOP,GET_SHOP_BY_NAME,GET_SHOP_BY_NAME_TWO,GET_SHOP_BY_USER_ID } from "./shopTypes"


const initialState = {
    shopdetails:{},
    shopbyname:{},
    shopbyuserid:{}
}

const shopReducer = (state = initialState, action) =>{
    switch(action.type) {
        case CREATE_SHOP:
            return{
                ...state,
                shopdetails:action.payload
            }

        case GET_AUTHENTICATED_SHOP:
            return{
                ...state,
                shopdetails:action.payload
            }
        case GET_SHOP_BY_NAME:
            return{
                ...state,
                shopbyname:action.payload
            }
        case GET_SHOP_BY_NAME_TWO:
            return{
                ...state,
                shopbyname:action.payload
            }
        case GET_SHOP_BY_USER_ID:
            return{
                ...state,
                shopbyuserid:action.payload
            }
        default : 
              return {
                  ...state
              }

    }
}

export default shopReducer