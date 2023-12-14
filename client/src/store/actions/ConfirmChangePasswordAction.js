import axios from "../../axios/axiosApp"
import { loginUser } from '../actions/AuthAction'
import { unmoundRecoverEmail } from "../actions/RecoverPasswordAction"
import { SET_ERROR_MASSAGE } from "./actionTypes"

export const getConfirmData = ( confirmData, props ) => {
    debugger
    return async dispatch => {
        console.log( confirmData )
        await axios.post("authorization/confirm_new_password", confirmData)
            .then( res => {
                if ( !res.data.error ) {
                    dispatch( loginUser() )
                    dispatch( unmoundRecoverEmail() )
                    props.history.push("/")
                } else if ( res.data.error === "Код подтверждения неверный") {
                    dispatch( setErrorMassage( res.data.error ))
                } else if ( res.data.error === "Пароли совпадают" ) {
                    dispatch( setErrorMassage(res.data.error) )
                } else if ( res.data.error === true ) {
                    debugger
                    dispatch( setErrorMassage("неизвестная ошибка") )
                }
            })
    }
}

const setErrorMassage = massage => {
    return {
        type: SET_ERROR_MASSAGE,
        massage
    }
}