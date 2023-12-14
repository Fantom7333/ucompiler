import axios from "../../axios/axiosApp"
import { SET_RECOVER_EMAIL, UNMOUNT_RECOVER_EMAIL } from "./actionTypes"


export const checkValidEmail = (email, props ) => {
    debugger
    return async dispatch => {
        dispatch( setRecoverEmail(email) )
        await axios.post("authorization/forgot", { email } )
            .then( res => {
                if( res.data.error ) {
                    console.log( "error")
                } else if ( !res.data.error ) {
                    props.history.push("/authorization/confirm_new_password")
                }
            })
    }
}

export const setRecoverEmail = email => {
    return {
        type: SET_RECOVER_EMAIL,
        email
    }
}

export const unmoundRecoverEmail = () => {
    return {
        type: UNMOUNT_RECOVER_EMAIL
    }
}