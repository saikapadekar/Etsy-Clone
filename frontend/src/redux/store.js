import {createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import logger from 'redux-logger'
import { composeWithDevTools } from '@redux-devtools/extension';



const reducers = combineReducers({
    user : userReducer
})
const middleware = [thunk]
const store = createStore( reducers,compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store