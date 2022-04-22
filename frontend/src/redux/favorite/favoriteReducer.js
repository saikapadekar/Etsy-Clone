import {INSERT_FAVORITE,GET_FAVORITE_BY_USER_ID,DELETE_FAVORITE} from './favoriteTypes'

const initialState = {
    favs:{},
    userfavs:{}
}

const favoriteReducer = (state = initialState, action) =>{
    switch(action.type) {
        case INSERT_FAVORITE:
            return{
                ...state,
                favs:action.payload
            }
        case GET_FAVORITE_BY_USER_ID:
            return{
                ...state,
                userfavs:action.payload
            }
        case DELETE_FAVORITE:
            return{
                ...state
            }
        default : 
              return {
                  ...state
              }

    }
}

export default favoriteReducer