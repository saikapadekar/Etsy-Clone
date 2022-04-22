import {INSERT_FAVORITE,GET_FAVORITE_BY_USER_ID} from './favoriteTypes'

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
        default : 
              return {
                  ...state
              }

    }
}

export default favoriteReducer