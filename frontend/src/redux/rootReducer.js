import { combineReducers } from 'redux'
// import userReducer from './reducers/userReducer'
import userReducer from './user/userReducer'
import customerReducer from './customer/customerReducer'
import shopReducer from './shop/shopReducer'
import productReducer from './product/productReducer'


const rootReducer = combineReducers({
    user : userReducer,
    customer:customerReducer,
    shop:shopReducer,
    product:productReducer
})

export default rootReducer


