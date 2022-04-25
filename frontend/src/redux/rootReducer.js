import { combineReducers } from 'redux'
// import userReducer from './reducers/userReducer'
import userReducer from './user/userReducer'
import customerReducer from './customer/customerReducer'
import shopReducer from './shop/shopReducer'
import productReducer from './product/productReducer'
import favoriteReducer from './favorite/favoriteReducer'
import cartReducer from './cart/cartReducer'
import orderReducer from './order/orderReducer'


const rootReducer = combineReducers({
    user : userReducer,
    customer:customerReducer,
    shop:shopReducer,
    product:productReducer,
    favorite:favoriteReducer,
    cart:cartReducer,
    order:orderReducer
})

export default rootReducer


