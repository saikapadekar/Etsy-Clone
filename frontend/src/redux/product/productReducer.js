import {GET_PRODUCTS_FOR_SHOP,ADD_PRODUCT,GET_PRODUCTS_ALL,GET_PRODUCT,GET_PRODUCT_BY_NAME} from './productTypes'

const initialState = {
    products:{},
    product:{},
    shop_products:{},
    productByName:{}
}

const productReducer = (state = initialState, action) =>{
    switch(action.type) {
        case GET_PRODUCTS_ALL:
            return{
                ...state,
                products:action.payload
            }
        case ADD_PRODUCT:
            return{
                ...state,
                product:action.payload
            }
        case GET_PRODUCTS_FOR_SHOP:
            return{
                ...state,
                shop_products:action.payload
            }
        case GET_PRODUCT:
            return{
                ...state,
                product:action.payload
            }
        case GET_PRODUCT_BY_NAME:
            return{
                ...state,
                productByName:action.payload
            }
        default : 
              return {
                  ...state
              }

    }
}

export default productReducer