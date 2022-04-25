import {CREATE_ORDER,GET_ORDER_BY_ID,GET_ALL_ORDERS_FOR_USERID} from './orderTypes'


const initialState = {
    order:{},
    allorders:{},
    orderbyid:{}
}

const orderReducer = (state = initialState, action) =>{
    switch(action.type) {
        case CREATE_ORDER:
            return{
                ...state,
                order:action.payload
            }
        case GET_ORDER_BY_ID:
            return{
                ...state,
                orderbyid:action.payload
            }
        case GET_ALL_ORDERS_FOR_USERID:
            return{
                ...state,
                allorders:action.payload
            }
        default : 
              return {
                  ...state
              }

    }
}

export default orderReducer