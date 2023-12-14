import { LOGOUT_USER, LOGIN_USER, LOG_ERROR_MASSAGE, TOGGLE_BLOCK_AUTH_BUTTON, AUTO_AUTH_SUCCESS, SET_ADMIN_MOD } from "../actions/actionTypes"


let initialState = {
    isAuth: false,
    userAvatar: null,
    errorAuthMassage: null,
    blockButton: false,
    token: null,
    isAdmin: false,
}


const AuthReducer = ( state = initialState, action ) => {
    switch( action.type ) {

        case AUTO_AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                isAuth: true
            }
        case LOGIN_USER:
            return {
                ...state,
                isAuth: true,
                userAvatar: action.userAvatar
            }
        case LOGOUT_USER:
            return {
                ...state,
                isAuth: false,
                token: null
            }    
        case LOG_ERROR_MASSAGE:
            return {
                ...state,
                errorAuthMassage: action.massage
            }
        case TOGGLE_BLOCK_AUTH_BUTTON:
            return {
                ...state,
                blockButton: action.mode
            }    
        case SET_ADMIN_MOD:
            return {
                ...state,
                isAdmin: action.isAdmin
            }

        default:
            return state
    }
}

export default AuthReducer