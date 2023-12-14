import { LOGIN_USER, LOGOUT_USER, LOG_ERROR_MASSAGE, TOGGLE_BLOCK_AUTH_BUTTON, AUTO_AUTH_SUCCESS, SET_ADMIN_MOD } from "./actionTypes"
import axiosApp from "../../axios/axiosApp"

////////////    2 ajax requests post & get   name:   password: 

export const authDataPost = ( data, ownProps ) => {
    return async (dispatch, getState )=> {

        await axiosApp.post("authorization/log_in", data )
            .then( res => {
                if( res.data.error ) {
                    dispatch( logErrorMassage("неверный пароль или имя") )
                } else if ( !res.data.error ) {
                    console.log("auth data", res.data)
                    dispatch( logErrorMassage(null) )
                    dispatch( loginUser(res.data.avatar) )
                    
                    
                    ownProps.history.push("/")
                    // dispatch(push("/"))

                    const expirationDate = new Date( new Date().getTime() + 3600000 )

                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("expirationDate", expirationDate)

                    localStorage.setItem("userName", data.login )

                    localStorage.setItem("userAvatar", res.data.avatar )
                    // dispatch( setAdminMod( res.data.admin ) )

                    
                    // const expirationDate = new Date( new Date().getTime() + data.expiresIn * 1000 )
                    // localStorage.setItem("expirationDate", expirationDate)
                }
            })
            .catch(function (error) {
                console.log(error);
              });
    }
}


export function autoLogin( props ) {
    return dispatch => {
        const token = localStorage.getItem("token")
        if (!token) {
            dispatch( logoutUser() )
            props.history.push("/")
        } else {
            const expirationDate = new Date( localStorage.getItem("expirationDate") )
            if ( expirationDate <= new Date() ) {
                dispatch( logoutUser() )
                props.history.push("/")
            } else {
                dispatch( authSuccess(token) )
                // dispatch( logoutUser( (expirationDate.getTime() - new Date().getTime()) / 1000 ))                
            }
        }
    }
}



export function checkUserAdmin()  {

    return async dispatch => {
        try {
            const request = await axiosApp.get(`check/admin?token=${ localStorage.getItem("token") }`)
            const response = request.data
            if ( !response.error ) {
                dispatch( setAdminMod( true ) )
            } else {
                dispatch( setAdminMod( false ) )
            }
        } catch (error) {
            console.error( "Check user admin error toggle menu ( AuthAction )", error )
        }
        
    }
}

export function authSuccess( token ) {
    return {
        type: AUTO_AUTH_SUCCESS,
        token
    }
}


const logErrorMassage = massage => { 
    return {
        type: LOG_ERROR_MASSAGE,
        massage
    }
}

export const loginUser = userAvatar => {
    return {
        type: LOGIN_USER,
        userAvatar
    }
}

export const logoutUser = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("expirationDate")
    localStorage.removeItem("userAvatar")
    localStorage.removeItem("userName")
    return {
        type: LOGOUT_USER
    }
}

export const toggleBlockSendButton = mode => {
    return {
        type: TOGGLE_BLOCK_AUTH_BUTTON,
        mode
    }
}

const setAdminMod = ( isAdmin ) => {
    return {
        type: SET_ADMIN_MOD,
        isAdmin
    }
}