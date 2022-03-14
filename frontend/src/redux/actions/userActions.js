import { LOGIN_USER, SET_LOGIN_ERROR, CLEAR_LOGIN_ERROR} from '../types'
import axios from 'axios'


export const loginUser = (newUser, history) => (dispatch) => {
    axios.post('http://localhost:7000/auth/login', newUser)
        .then(res => {
            console.log("LOGIN_USER"+ JSON.stringify(res.data))

            if(res.data.loginError){
                dispatch({
                    type : SET_LOGIN_ERROR,
                    payload : res.data.loginError
                })
            }
            else {
                dispatch({
                    type : LOGIN_USER,
                    payload : res.data[0]
                })
                console.log("LOGIN_USER"+ JSON.stringify(res.data[0]))
    
                dispatch({
                    type : CLEAR_LOGIN_ERROR
                })

                history.push('/')
                console.log("login successful")
            }
        })
        .catch(err => {
            console.log(err)
        })
}
