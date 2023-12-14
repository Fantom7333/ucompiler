// {
// 	"login": "testUser",
// 	"email": "testEmail@xuz.ru",
// 	"password": "322322"
// }

import axiosApp from "../../axios/axiosApp"
import { REGISTER_ERROR, BLOCK_REGISTER_BUTTON, LOG_REGISTER_MASSAGE } from "./actionTypes"
import { authDataPost } from "./AuthAction"


export const postRegisterData = ( data, props ) => {
    return async dispatch => {
        await axiosApp.post("authorization/sign_up", data )
            .then( res => {
                if ( res.data.error ) {
                    // dispatch( registerError(true) )
                    dispatch( logRegisterMassage("Такой пользователь или email уже есть в системе") )
                } else {
                    const authData = { login: data.login, password: data.password }
                    dispatch( logRegisterMassage(null) )
                    dispatch( authDataPost(authData, props) )
                    props.history.push("/")
                }
            })
    }
}

export const registerError = errorType => {
    return {
        type: REGISTER_ERROR,
        errorType
    }
}


export const logRegisterMassage = massage => {
    return {
        type: LOG_REGISTER_MASSAGE,
        massage
    }
}

export const blockRegBnt = mode => {
    return {
        type: BLOCK_REGISTER_BUTTON,
        mode
    }
}

// const emailError = () => {
//     return {
//         type: EMAIL_ERROR
//     }
// }

// const nameError = () => {
//     return {
//         type: NAME_ERROR
//     }
// }