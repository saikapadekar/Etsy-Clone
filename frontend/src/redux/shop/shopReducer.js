import { CREATE_SHOP, GET_AUTHENTICATED_SHOP } from "./shopTypes"


const initialState = {
    shopdetails:{}
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
        default : 
              return {
                  ...state
              }

    }
}

export default shopReducer