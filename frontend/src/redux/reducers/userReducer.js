// import { SIGNUP_USER, LOGIN_USER, EDIT_PROFILE, GET_AUTHENTICATED_USER, 
//     CREATE_ORDER, GET_SELECTED_USER, LOGOUT_USER,CREATE_CUSTOMER,CREATE_SHOP,GET_AUTHENTICATED_SHOP,GET_ALL_PRODUCTS,ADD_PRODUCT,GET_SHOP_PRODUCTS,GET_PRODUCT} from '../types'

// const initialState = {
//     authenticatedUser : {},
//     selectedUser : {},
//     authenticated : false,
//     shopdetails:{},
//     products:{},
//     product:{},
//     shop_products:{}
// }
// // eslint-disable-next-line import/no-anonymous-default-export
// export default function(state = initialState , action){
//     switch(action.type){
//         case SIGNUP_USER : 
//             return {
//                 ...state,
//                 message : action.payload
//             }

//         case LOGIN_USER :
//             return {
//                 ...state,
//                 authenticatedUser: action.payload,
//                 authenticated:true
//                 // medium: action.payload.medium,
//               };
        
//         case GET_SELECTED_USER:
//         return {
//             ...state,
//             selectedUser : action.payload
//         }
//         case CREATE_CUSTOMER:
//         return {
//             ...state,
//             selectedUser : action.payload
//         }
//         case CREATE_SHOP:
//             return{
//                 ...state,
//                 shopdetails:action.payload
//             }

//         case GET_AUTHENTICATED_SHOP:
//             return{
//                 ...state,
//                 shopdetails:action.payload
//             }

//         case GET_ALL_PRODUCTS:
//             return{
//                 ...state,
//                 products:action.payload
//             }
//         case ADD_PRODUCT:
//             return{
//                 ...state,
//                 product:action.payload
//             }
//         case GET_SHOP_PRODUCTS:
//             return{
//                 ...state,
//                 shop_products:action.payload
//             }
//         case GET_PRODUCT:
//             return{
//                 ...state,
//                 product:action.payload
//             }
//         default : 
//         return {
//             ...state
//         }
//     }
// }